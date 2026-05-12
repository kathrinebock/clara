# Clara Design Tokens

Design tokens for Clara, OK's design system. These files are the Style Dictionary source used to generate the CSS custom properties documented in [`../CLARA.md`](../CLARA.md).

## Structure

```
tokens/
├── primitives/       Base values — do not use directly in components
│   └── mode1.json   Single mode (light theme baseline)
└── semantic/         Use these in components — they reference primitives
    ├── desktop.json
    └── smartphone.json
```

## Token hierarchy

Clara uses a two-layer token system:

1. **Primitives** — the raw palette: `red.600`, `grey.100`, `size.xl` and so on. Never reference these directly from a component.
2. **Semantic tokens** — named by purpose: `color-content-default`, `color-actions-button-primary-background`, `spacing-md`. These reference primitives and are the only tokens components should use.

## Building CSS

[`../sd.config.json`](../sd.config.json) uses Style Dictionary to build `tokens/dist/tokens.css` from these JSON sources.

## Runtime tokens

The server in [`../server/`](../server) reads tokens from [`../tokens.js`](../tokens.js) at runtime. `tokens.js` is the canonical CommonJS export used by both the MCP and REST endpoints. The JSON files in this directory are kept in sync with `tokens.js` for Style Dictionary consumers.

## See also

- [`../CLARA.md`](../CLARA.md) — full design system context including the rules for when to use which token.
- [`../docs/design-system.md`](../docs/design-system.md) — strict rules for AI assistants.
