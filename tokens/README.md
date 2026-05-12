# Clara Design Tokens

Design tokens for Clara, OK's design system. These files are the Style Dictionary source used to generate the CSS custom properties documented in [`../CLARA.md`](../CLARA.md).

## Structure

```
tokens/
├── primitives/              Base values — do not use directly in components
│   ├── mode-1.json         Single mode (light theme baseline)
│   └── tokens.js           CommonJS export of primitives
└── semantic/                Use these in components — they reference primitives
    ├── desktop.json         Desktop-specific semantic tokens
    └── smartphone.json      Mobile-specific semantic tokens
```

## Token hierarchy

Clara uses a two-layer token system:

1. **Primitives** — the raw palette: `red.600`, `grey.100`, `size.xl` and so on. Never reference these directly from a component.
2. **Semantic tokens** — named by purpose: `color-content-default`, `color-actions-button-primary-background`, `spacing-md`. These reference primitives and are the only tokens components should use.

## Building CSS

[`../sd.config.json`](../sd.config.json) uses Style Dictionary to build `tokens/dist/tokens.css` from these JSON sources.

## Runtime tokens

The server in [`../server/`](../server) reads tokens from [`../tokens.js`](../tokens.js) at runtime. `tokens.js` is the canonical CommonJS export used by both the MCP and REST endpoints. The JSON files in this directory are kept in sync with `tokens.js` for Style Dictionary consumers.

### tokens.js locations

- **Root-level** [`../tokens.js`](../tokens.js) — main export used by the server
- **Primitives** [`primitives/tokens.js`](primitives/tokens.js) — primitives only

## Token hierarchy

Clara uses a **two-layer token system** to make the design system resilient:

| Layer | Purpose | Usage | Example |
|---|---|---|---|
| **Primitives** | Raw palette values | Never directly in components | `--color-red-600` |
| **Semantic** | Named by purpose | Always use in components | `--color-actions-button-primary-background` |

**Why two layers?** If OK ever changes brand colors, updating one semantic token updates the entire system instantly. Primitives are internal implementation details.

## Using tokens programmatically

### REST API

Query tokens via HTTP:

```bash
# Get all tokens
curl https://clara-tokens.railway.app/tokens/all

# Get semantic colors
curl https://clara-tokens.railway.app/tokens/colors/semantic

# Get CSS variables
curl https://clara-tokens.railway.app/tokens/css
```

### CommonJS (Node.js)

```js
const designTokens = require('../tokens.js');
console.log(designTokens.colors.semantic.content.default);
```

See [`../docs/mcp-server.md`](../docs/mcp-server.md) for full REST API documentation.

## See also

- [`../CLARA.md`](../CLARA.md) — full design system context including the rules for when to use which token.
- [`../docs/design-system.md`](../docs/design-system.md) — strict rules for AI assistants.
- [`../components.json`](../components.json) — documented component specifications.
- [`../.instructions.md`](../.instructions.md) — MCP server instructions for building prototypes.
