const express = require("express");
const fs = require("fs");
const path = require("path");
const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const {
  StreamableHTTPServerTransport,
} = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const { z } = require("zod");

const PORT = process.env.PORT || 3000;
const TOKENS_DIR = path.join(__dirname, "tokens", "src");
const TOKENS_CSS = path.join(__dirname, "tokens", "dist", "tokens.css");

// --- Helpers: læs design tokens fra repoets tokens/src/*.json ---
function loadAllTokens() {
  if (!fs.existsSync(TOKENS_DIR)) return {};
  const files = fs.readdirSync(TOKENS_DIR).filter((f) => f.endsWith(".json"));
  const all = {};
  for (const file of files) {
    try {
      const content = JSON.parse(
        fs.readFileSync(path.join(TOKENS_DIR, file), "utf8")
      );
      all[file.replace(/\.json$/, "")] = content;
    } catch (err) {
      console.error(`Kunne ikke parse ${file}:`, err.message);
    }
  }
  return all;
}

function flattenTokens(obj, prefix = "") {
  const out = {};
  for (const [key, val] of Object.entries(obj || {})) {
    const name = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && "value" in val) {
      out[name] = val.value;
    } else if (val && typeof val === "object") {
      Object.assign(out, flattenTokens(val, name));
    }
  }
  return out;
}

// --- MCP-server med tools ---
function buildMcpServer() {
  const server = new McpServer({
    name: "clara-design-system",
    version: "1.0.0",
  });

  server.tool(
    "list_tokens",
    "Returnerer en liste over alle design tokens i Clara (flade nøgler).",
    {},
    async () => {
      const all = loadAllTokens();
      const flat = {};
      for (const [group, data] of Object.entries(all)) {
        Object.assign(flat, flattenTokens(data, group));
      }
      return {
        content: [{ type: "text", text: JSON.stringify(flat, null, 2) }],
      };
    }
  );

  server.tool(
    "get_token",
    "Henter værdien af én specifik design token via dens fulde navn (fx 'colors.content.default').",
    { name: z.string().describe("Det fulde token-navn, fx 'colors.brand.primary'") },
    async ({ name }) => {
      const all = loadAllTokens();
      const flat = {};
      for (const [group, data] of Object.entries(all)) {
        Object.assign(flat, flattenTokens(data, group));
      }
      const value = flat[name];
      if (value === undefined) {
        return {
          content: [
            { type: "text", text: `Token '${name}' blev ikke fundet.` },
          ],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: String(value) }] };
    }
  );

  server.tool(
    "get_css",
    "Returnerer den genererede tokens.css (alle CSS custom properties).",
    {},
    async () => {
      if (!fs.existsSync(TOKENS_CSS)) {
        return {
          content: [
            {
              type: "text",
              text: "tokens.css er ikke bygget endnu. Kør 'npm run build:tokens'.",
            },
          ],
          isError: true,
        };
      }
      const css = fs.readFileSync(TOKENS_CSS, "utf8");
      return { content: [{ type: "text", text: css }] };
    }
  );

  return server;
}

// --- Express app ---
const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "clara-mcp", port: PORT });
});

app.get("/", (_req, res) => {
  res.type("text/plain").send(
    "Clara MCP server kører. MCP-endpoint: POST /mcp\nHealth: GET /health\n"
  );
});

// MCP over Streamable HTTP — Claude kalder POST /mcp
app.post("/mcp", async (req, res) => {
  try {
    const mcp = buildMcpServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless – ny pr. request
    });
    res.on("close", () => {
      transport.close();
      mcp.close();
    });
    await mcp.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error("MCP fejl:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "internal_error" });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Clara MCP server lytter på port ${PORT}`);
});
