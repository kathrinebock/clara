# Clara Design Tokens — MCP / REST Server

A Model Context Protocol (MCP) server that exposes Clara's design tokens to Claude and other AI assistants. Also serves a REST API for the same tokens.

Use it to:

- Generate prototypes that respect OK's design guidelines
- Share design tokens with your team automatically
- Query colors, typography, spacing, and effects programmatically
- Generate CSS variables from the design system

## Features

- Complete design token access (colors, typography, spacing, sizing, fonts, effects)
- REST API endpoints for easy integration
- CSS variable generation
- Color lookup by path
- Deployed on Railway for easy team sharing
- No database required — tokens are stored in [`tokens.js`](../tokens.js)

## Local development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm start
```

The server runs on http://localhost:3000

### Test it

```bash
# Health check
curl http://localhost:3000/health

# Get all tokens
curl http://localhost:3000/tokens/all

# Get primitive colors
curl http://localhost:3000/tokens/colors/primitives

# Get semantic colors
curl http://localhost:3000/tokens/colors/semantic

# Get a specific color
curl http://localhost:3000/tokens/colors/primitives.red.600

# Get text styles
curl http://localhost:3000/tokens/text-styles

# Get spacing scale
curl http://localhost:3000/tokens/spacing

# Generate CSS variables
curl http://localhost:3000/tokens/css
```

## REST endpoints

| Endpoint | Method | Description |
| --- | --- | --- |
| `/health` | GET | Health check |
| `/tokens/all` | GET | All design tokens |
| `/tokens/colors/primitives` | GET | Primitive color palettes |
| `/tokens/colors/semantic` | GET | Semantic color tokens |
| `/tokens/colors/semantic?category=content` | GET | Semantic colors by category |
| `/tokens/colors/{path}` | GET | Get color by dot-path (e.g. `primitives.red.600`) |
| `/tokens/text-styles` | GET | All typography styles |
| `/tokens/text-styles?category=headings` | GET | Text styles by category |
| `/tokens/text-styles?category=headings&style=h1` | GET | Specific text style |
| `/tokens/spacing` | GET | Spacing scale |
| `/tokens/sizing` | GET | Sizing scale |
| `/tokens/fonts` | GET | Font families |
| `/tokens/effects` | GET | Effects and shadows |
| `/tokens/css` | GET | Generate CSS variables |
| `/mcp` | POST | MCP protocol endpoint (Streamable HTTP) |

## MCP endpoint

The server exposes a Model Context Protocol endpoint at `POST /mcp` using StreamableHTTPServerTransport. Three tools are registered:

- `list_tokens` — returns the entire token system.
- `get_token` — fetches a specific branch. Parameters: `kind` (primitive_colors | semantic_colors | text_styles | spacing | sizing | fonts | effects | color_by_path), plus optional `category`, `style`, `path`.
- `get_css` — returns all tokens as CSS custom properties.

## Use with Claude

### Option 1: Direct HTTP

Call the REST endpoints directly from Claude.

### Option 2: Custom instructions

Add to your Claude custom instructions:

```
When building prototypes or generating code, use these design tokens:
- Server: https://your-railway-url.railway.app
- Colors: GET /tokens/colors/semantic
- Typography: GET /tokens/text-styles
- Spacing: GET /tokens/spacing
Always reference these tokens to ensure brand compliance.
```

### Option 3: As an MCP server in Claude Desktop

In your Claude Desktop config (`~/.claude/config.json`):

```json
{
  "mcpServers": {
    "clara-tokens": {
      "command": "node",
      "args": ["/path/to/server/server.js"],
      "env": { "PORT": "3001" }
    }
  }
}
```

## Deploy to Railway

1. Initialize the repo and push to GitHub.
2. On [railway.app](https://railway.app) create a project from the GitHub repo.
3. Railway auto-detects Node.js, runs `npm install` and `npm start`, and assigns a public URL.
4. Get the URL from the Deployments tab and test `/health`.

## Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | 3000 | Server port (Railway sets this automatically) |
| `FIGMA_FILE_ID` | (optional) | Enables Figma auto-sync |
| `FIGMA_ACCESS_TOKEN` | (optional) | Required when FIGMA_FILE_ID is set |
| `API_KEY` | (optional) | If set, requires Bearer token in Authorization header |

## Updating tokens

Edit [`tokens.js`](../tokens.js) and restart the server. On Railway, commit and push — the deployment will rebuild automatically.

## Troubleshooting

**Port already in use**

```bash
lsof -ti:3000 | xargs kill -9
```

**Cannot find module**

```bash
npm install
npm start
```

## Next steps

- Add authentication for team security
- Connect to the Figma API to auto-sync tokens
- Add analytics to track token usage
- Build a CLI tool to fetch tokens locally
- Build a web UI to browse tokens
