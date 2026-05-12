#!/usr/bin/env node

const http = require('http');
const designTokens = require('../tokens');
const FigmaTokenSync = require('./figma-sync');

const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js');
const { StreamableHTTPServerTransport } = require('@modelcontextprotocol/sdk/server/streamableHttp.js');
const { z } = require('zod');

/**
 * Clara Design Tokens — REST + MCP server
 */
class DesignTokensMCP {
  constructor() {
    this.tokens = designTokens;
    this.figmaSync = null;
    this.useFigma = false;

    const figmaFileId = process.env.FIGMA_FILE_ID;
    const figmaToken = process.env.FIGMA_ACCESS_TOKEN;

    if (figmaFileId && figmaToken) {
      try {
        this.figmaSync = new FigmaTokenSync(figmaFileId, figmaToken);
        this.useFigma = true;
        console.log('Figma sync enabled');
        this.figmaSync.startAutoSync(5 * 60 * 1000);
      } catch (error) {
        console.warn('Figma initialization failed, using static tokens:', error.message);
        this.useFigma = false;
      }
    } else {
      console.log('Using static tokens (Figma not configured)');
    }
  }

  async getTokens() {
    if (this.useFigma && this.figmaSync) {
      try {
        await this.figmaSync.getTokens();
        return this.tokens;
      } catch (error) {
        console.warn('Falling back to static tokens:', error.message);
        return this.tokens;
      }
    }
    return this.tokens;
  }

  getPrimitiveColors() {
    return { content: 'Primitive color palettes', colors: this.tokens.colors.primitives };
  }

  getSemanticColors(category) {
    if (!category) {
      return {
        content: 'Semantic color categories',
        categories: Object.keys(this.tokens.colors.semantic),
        colors: this.tokens.colors.semantic,
      };
    }
    if (this.tokens.colors.semantic[category]) {
      return { content: `Semantic colors for ${category}`, [category]: this.tokens.colors.semantic[category] };
    }
    return { error: `Category "${category}" not found`, available: Object.keys(this.tokens.colors.semantic) };
  }

  getTextStyles(category) {
    if (!category) {
      return {
        content: 'Text style categories',
        categories: Object.keys(this.tokens.textStyles),
        styles: this.tokens.textStyles,
      };
    }
    if (this.tokens.textStyles[category]) {
      return { content: `Text styles for ${category}`, styles: this.tokens.textStyles[category] };
    }
    return { error: `Category "${category}" not found`, available: Object.keys(this.tokens.textStyles) };
  }

  getTextStyle(category, style) {
    if (this.tokens.textStyles[category] && this.tokens.textStyles[category][style]) {
      return { content: `Text style: ${category}/${style}`, style: this.tokens.textStyles[category][style] };
    }
    return { error: `Style "${category}/${style}" not found` };
  }

  getSpacing() { return { content: 'Spacing scale (in pixels)', spacing: this.tokens.spacing }; }
  getSizing()  { return { content: 'Sizing scale (in pixels)',  sizing:  this.tokens.sizing  }; }
  getFonts()   { return { content: 'Font families',             fonts:   this.tokens.fonts   }; }
  getEffects() { return { content: 'Effects and shadows',       effects: this.tokens.effects }; }
  getAllTokens() { return { content: 'Complete design token system', tokens: this.tokens }; }

  getColorByPath(path) {
    if (!path) return { error: 'Path parameter required (e.g., "primitives.red.600")' };
    try {
      const keys = path.split('.');
      let value = this.tokens.colors;
      for (const key of keys) {
        value = value[key];
        if (value === undefined) return { error: `Color path "${path}" not found` };
      }
      return { content: `Color at ${path}`, path, value };
    } catch (e) {
      return { error: `Invalid path: ${e.message}` };
    }
  }

  generateCSSVariables() {
    let css = ':root {\n';
    Object.entries(this.tokens.colors.primitives).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        css += `  --color-${colorName}-${shade}: ${value};\n`;
      });
    });
    Object.entries(this.tokens.colors.semantic).forEach(([category, values]) => {
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === 'string') {
          css += `  --color-semantic-${category}-${key}: ${value};\n`;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subkey, subvalue]) => {
            css += `  --color-semantic-${category}-${key}-${subkey}: ${subvalue};\n`;
          });
        }
      });
    });
    Object.entries(this.tokens.spacing).forEach(([key, value]) => { css += `  --spacing-${key}: ${value}px;\n`; });
    Object.entries(this.tokens.sizing).forEach(([key, value])  => { css += `  --sizing-${key}: ${value}px;\n`;  });
    css += '}\n';
    return { content: 'CSS variables generated from design tokens', css };
  }
}

const mcp = new DesignTokensMCP();

/* ------------------------------------------------------------------ */
/*  MCP server (Model Context Protocol) — eksponeret på POST /mcp     */
/* ------------------------------------------------------------------ */
function buildMcpServer() {
  const server = new McpServer({
    name: 'clara-design-tokens',
    version: '1.0.0',
  });

  server.tool(
    'list_tokens',
    'Returnerer hele Clara design token-systemet (colors, textStyles, spacing, sizing, fonts, effects).',
    {},
    async () => ({
      content: [{ type: 'text', text: JSON.stringify(mcp.getAllTokens(), null, 2) }],
    })
  );

  server.tool(
    'get_token',
    'Henter en specifik gren af design tokens. Brug "kind" til at vælge kategori.',
    {
      kind: z.enum([
        'primitive_colors',
        'semantic_colors',
        'text_styles',
        'spacing',
        'sizing',
        'fonts',
        'effects',
        'color_by_path',
      ]).describe('Hvilken gren der ønskes'),
      category: z.string().optional().describe('Underkategori for semantic_colors eller text_styles'),
      style: z.string().optional().describe('Specifik style under text_styles (kræver også category)'),
      path: z.string().optional().describe('Dot-path for color_by_path, fx "primitives.red.600"'),
    },
    async ({ kind, category, style, path }) => {
      let result;
      switch (kind) {
        case 'primitive_colors': result = mcp.getPrimitiveColors(); break;
        case 'semantic_colors':  result = mcp.getSemanticColors(category); break;
        case 'text_styles':
          result = (category && style) ? mcp.getTextStyle(category, style) : mcp.getTextStyles(category);
          break;
        case 'spacing': result = mcp.getSpacing(); break;
        case 'sizing':  result = mcp.getSizing();  break;
        case 'fonts':   result = mcp.getFonts();   break;
        case 'effects': result = mcp.getEffects(); break;
        case 'color_by_path': result = mcp.getColorByPath(path); break;
        default: result = { error: `Unknown kind: ${kind}` };
      }
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }
  );

  server.tool(
    'get_css',
    'Returnerer alle design tokens som CSS custom properties (variabler).',
    {},
    async () => {
      const { css } = mcp.generateCSSVariables();
      return { content: [{ type: 'text', text: css }] };
    }
  );

  return server;
}

async function handleMcpRequest(req, res) {
  try {
    // Saml request body
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');
    let body;
    try { body = raw ? JSON.parse(raw) : undefined; }
    catch { res.writeHead(400); res.end(JSON.stringify({ error: 'invalid_json' })); return; }

    const mcpServer = buildMcpServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

    res.on('close', () => { try { transport.close(); mcpServer.close(); } catch (_) {} });

    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, body);
  } catch (err) {
    console.error('MCP error:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'internal_error', message: String(err && err.message || err) }));
    }
  }
}

/* ------------------------------------------------------------------ */
/*  HTTP-server (REST + MCP)                                          */
/* ------------------------------------------------------------------ */
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Mcp-Session-Id');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = req.url || '/';

  // ---- MCP endpoint ----
  if (url === '/mcp' || url.startsWith('/mcp?')) {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'method_not_allowed', allow: 'POST' }));
      return;
    }
    await handleMcpRequest(req, res);
    return;
  }

  // Default Content-Type for REST below (MCP handler sætter sin egen)
  res.setHeader('Content-Type', 'application/json');

  // ---- REST endpoints (uændret) ----
  if (url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', service: 'clara-design-tokens-mcp' }));
    return;
  }

  if (url === '/tokens/colors/primitives') {
    res.writeHead(200); res.end(JSON.stringify(mcp.getPrimitiveColors())); return;
  }

  if (url.startsWith('/tokens/colors/semantic')) {
    const category = new URL(url, `http://${req.headers.host}`).searchParams.get('category');
    res.writeHead(200); res.end(JSON.stringify(mcp.getSemanticColors(category))); return;
  }

  if (url.startsWith('/tokens/colors/')) {
    const path = url.replace('/tokens/colors/', '');
    res.writeHead(200); res.end(JSON.stringify(mcp.getColorByPath(path))); return;
  }

  if (url.startsWith('/tokens/text-styles')) {
    const u = new URL(url, `http://${req.headers.host}`);
    const category = u.searchParams.get('category');
    const style    = u.searchParams.get('style');
    res.writeHead(200);
    res.end(JSON.stringify((category && style) ? mcp.getTextStyle(category, style) : mcp.getTextStyles(category)));
    return;
  }

  if (url === '/tokens/spacing') { res.writeHead(200); res.end(JSON.stringify(mcp.getSpacing())); return; }
  if (url === '/tokens/sizing')  { res.writeHead(200); res.end(JSON.stringify(mcp.getSizing()));  return; }
  if (url === '/tokens/fonts')   { res.writeHead(200); res.end(JSON.stringify(mcp.getFonts()));   return; }
  if (url === '/tokens/effects') { res.writeHead(200); res.end(JSON.stringify(mcp.getEffects())); return; }

  if (url === '/figma/status') {
    if (mcp.figmaSync) {
      res.writeHead(200);
      res.end(JSON.stringify({ figmaEnabled: true, status: mcp.figmaSync.getStatus() }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify({ figmaEnabled: false, message: 'Figma sync not configured.' }));
    }
    return;
  }

  if (url === '/figma/sync' && req.method === 'POST') {
    if (!mcp.figmaSync) { res.writeHead(400); res.end(JSON.stringify({ error: 'Figma sync not configured' })); return; }
    try {
      const result = await mcp.figmaSync.forceSyncNow();
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, message: 'Figma sync initiated', lastSync: result.lastSyncTime }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
    return;
  }

  if (url === '/tokens/css') {
    res.writeHead(200); res.end(JSON.stringify(mcp.generateCSSVariables())); return;
  }

  if (url === '/tokens/all' || url === '/') {
    res.writeHead(200); res.end(JSON.stringify(mcp.getAllTokens())); return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({
    error: 'Not found',
    endpoints: [
      '/mcp (POST — MCP protocol)',
      '/health',
      '/tokens/colors/primitives',
      '/tokens/colors/semantic',
      '/tokens/colors/{path}',
      '/tokens/text-styles',
      '/tokens/spacing',
      '/tokens/sizing',
      '/tokens/fonts',
      '/tokens/effects',
      '/tokens/css',
      '/tokens/all',
    ],
  }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Clara Design Tokens server running on port ${PORT}`);
  console.log(`Health:    http://localhost:${PORT}/health`);
  console.log(`MCP:       POST http://localhost:${PORT}/mcp`);
});
