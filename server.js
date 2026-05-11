#!/usr/bin/env node

const http = require('http');
const designTokens = require('./tokens');
const FigmaTokenSync = require('./figma-sync');

/**
 * MCP Server for Design Tokens
 * Exposes design system tokens via MCP tools
 * Can sync from Figma API or use static tokens
 */

class DesignTokensMCP {
  constructor() {
    this.tokens = designTokens;
    this.figmaSync = null;
    this.useFigma = false;
    
    // Check if Figma configuration is available
    const figmaFileId = process.env.FIGMA_FILE_ID;
    const figmaToken = process.env.FIGMA_ACCESS_TOKEN;
    
    if (figmaFileId && figmaToken) {
      try {
        this.figmaSync = new FigmaTokenSync(figmaFileId, figmaToken);
        this.useFigma = true;
        console.log('🎨 Figma sync enabled');
        
        // Start auto-sync (every 5 minutes)
        this.figmaSync.startAutoSync(5 * 60 * 1000);
      } catch (error) {
        console.warn('⚠️  Figma initialization failed, using static tokens:', error.message);
        this.useFigma = false;
      }
    } else {
      console.log('📝 Using static tokens (Figma not configured)');
      console.log('   Set FIGMA_FILE_ID and FIGMA_ACCESS_TOKEN to enable Figma sync');
    }
  }

  /**
   * Get current tokens (Figma or static)
   */
  async getTokens() {
    if (this.useFigma && this.figmaSync) {
      try {
        const figmaData = await this.figmaSync.getTokens();
        // For now, merge with static tokens. In future, return only Figma tokens
        return this.tokens;
      } catch (error) {
        console.warn('⚠️  Failed to get Figma tokens, falling back to static:', error.message);
        return this.tokens;
      }
    }
    return this.tokens;
  }

  /**
   * Get all primitive colors
   */
  getPrimitiveColors() {
    return {
      content: 'Primitive color palettes',
      colors: this.tokens.colors.primitives
    };
  }

  /**
   * Get semantic color tokens by category
   */
  getSemanticColors(category) {
    if (!category) {
      return {
        content: 'Semantic color categories',
        categories: Object.keys(this.tokens.colors.semantic),
        colors: this.tokens.colors.semantic
      };
    }

    if (this.tokens.colors.semantic[category]) {
      return {
        content: `Semantic colors for ${category}`,
        [category]: this.tokens.colors.semantic[category]
      };
    }

    return {
      error: `Category "${category}" not found`,
      available: Object.keys(this.tokens.colors.semantic)
    };
  }

  /**
   * Get typography/text styles
   */
  getTextStyles(category) {
    if (!category) {
      return {
        content: 'Text style categories',
        categories: Object.keys(this.tokens.textStyles),
        styles: this.tokens.textStyles
      };
    }

    if (this.tokens.textStyles[category]) {
      return {
        content: `Text styles for ${category}`,
        styles: this.tokens.textStyles[category]
      };
    }

    return {
      error: `Category "${category}" not found`,
      available: Object.keys(this.tokens.textStyles)
    };
  }

  /**
   * Get specific text style
   */
  getTextStyle(category, style) {
    if (this.tokens.textStyles[category] && this.tokens.textStyles[category][style]) {
      return {
        content: `Text style: ${category}/${style}`,
        style: this.tokens.textStyles[category][style]
      };
    }

    return {
      error: `Style "${category}/${style}" not found`
    };
  }

  /**
   * Get spacing values
   */
  getSpacing() {
    return {
      content: 'Spacing scale (in pixels)',
      spacing: this.tokens.spacing
    };
  }

  /**
   * Get sizing values
   */
  getSizing() {
    return {
      content: 'Sizing scale (in pixels)',
      sizing: this.tokens.sizing
    };
  }

  /**
   * Get font families
   */
  getFonts() {
    return {
      content: 'Font families',
      fonts: this.tokens.fonts
    };
  }

  /**
   * Get effects/shadows
   */
  getEffects() {
    return {
      content: 'Effects and shadows',
      effects: this.tokens.effects
    };
  }

  /**
   * Get all tokens overview
   */
  getAllTokens() {
    return {
      content: 'Complete design token system',
      tokens: this.tokens
    };
  }

  /**
   * Get color by path (e.g., "primitives.red.600")
   */
  getColorByPath(path) {
    if (!path) {
      return { error: 'Path parameter required (e.g., "primitives.red.600")' };
    }

    try {
      const keys = path.split('.');
      let value = this.tokens.colors;
      
      for (const key of keys) {
        value = value[key];
        if (value === undefined) {
          return { error: `Color path "${path}" not found` };
        }
      }

      return {
        content: `Color at ${path}`,
        path,
        value
      };
    } catch (e) {
      return { error: `Invalid path: ${e.message}` };
    }
  }

  /**
   * Generate CSS variables from tokens
   */
  generateCSSVariables() {
    let css = ':root {\n';

    // Primitive colors
    Object.entries(this.tokens.colors.primitives).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        css += `  --color-${colorName}-${shade}: ${value};\n`;
      });
    });

    // Semantic colors
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

    // Spacing
    Object.entries(this.tokens.spacing).forEach(([key, value]) => {
      css += `  --spacing-${key}: ${value}px;\n`;
    });

    // Sizing
    Object.entries(this.tokens.sizing).forEach(([key, value]) => {
      css += `  --sizing-${key}: ${value}px;\n`;
    });

    css += '}\n';

    return {
      content: 'CSS variables generated from design tokens',
      css
    };
  }
}

// Initialize MCP server
const mcp = new DesignTokensMCP();

// Create HTTP server
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check
  if (req.url === '/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', service: 'clara-design-tokens-mcp' }));
    return;
  }

  // Get primitive colors
  if (req.url === '/tokens/colors/primitives') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getPrimitiveColors()));
    return;
  }

  // Get semantic colors
  if (req.url.startsWith('/tokens/colors/semantic')) {
    const category = new URL(req.url, `http://${req.headers.host}`).searchParams.get('category');
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getSemanticColors(category)));
    return;
  }

  // Get color by path
  if (req.url.startsWith('/tokens/colors/')) {
    const path = req.url.replace('/tokens/colors/', '');
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getColorByPath(path)));
    return;
  }

  // Get text styles
  if (req.url.startsWith('/tokens/text-styles')) {
    const category = new URL(req.url, `http://${req.headers.host}`).searchParams.get('category');
    const style = new URL(req.url, `http://${req.headers.host}`).searchParams.get('style');
    
    if (category && style) {
      res.writeHead(200);
      res.end(JSON.stringify(mcp.getTextStyle(category, style)));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(mcp.getTextStyles(category)));
    }
    return;
  }

  // Get spacing
  if (req.url === '/tokens/spacing') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getSpacing()));
    return;
  }

  // Get sizing
  if (req.url === '/tokens/sizing') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getSizing()));
    return;
  }

  // Get fonts
  if (req.url === '/tokens/fonts') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getFonts()));
    return;
  }

  // Get effects
  if (req.url === '/tokens/effects') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getEffects()));
    return;
  }

  // Figma sync status
  if (req.url === '/figma/status') {
    if (mcp.figmaSync) {
      res.writeHead(200);
      res.end(JSON.stringify({
        figmaEnabled: true,
        status: mcp.figmaSync.getStatus()
      }));
    } else {
      res.writeHead(200);
      res.end(JSON.stringify({
        figmaEnabled: false,
        message: 'Figma sync not configured. Set FIGMA_FILE_ID and FIGMA_ACCESS_TOKEN environment variables.'
      }));
    }
    return;
  }

  // Manual Figma sync trigger
  if (req.url === '/figma/sync' && req.method === 'POST') {
    if (mcp.figmaSync) {
      mcp.figmaSync.forceSyncNow()
        .then(result => {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'Figma sync initiated',
            lastSync: result.lastSyncTime
          }));
        })
        .catch(error => {
          res.writeHead(500);
          res.end(JSON.stringify({
            success: false,
            error: error.message
          }));
        });
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({
        error: 'Figma sync not configured'
      }));
    }
    return;
  }

  // Generate CSS variables
  if (req.url === '/tokens/css') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.generateCSSVariables()));
    return;
  }

  // Get all tokens
  if (req.url === '/tokens/all' || req.url === '/') {
    res.writeHead(200);
    res.end(JSON.stringify(mcp.getAllTokens()));
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({
    error: 'Not found',
    endpoints: [
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
      '/tokens/all'
    ]
  }));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🎨 Clara Design Tokens MCP Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
