# Clara — OK's Design System

Clara is OK's design system. It contains the design tokens, fonts, typography, spacing and component documentation used to build UI for OK.

This repository is the canonical source for both humans and AI assistants (Claude, Cursor, MCP clients).

## What's here

| Path | Purpose |
| --- | --- |
| [`CLARA.md`](./CLARA.md) | Complete design system context — fonts, tokens, typography, components, usage rules. **Primary AI context file.** |
| [`docs/brand.md`](./docs/brand.md) | OK brand voice, tone of voice, and the canonical product-name dictionary. |
| [`docs/design-system.md`](./docs/design-system.md) | Master rules for AI assistants — what to always do, what never to do. |
| [`docs/mcp-server.md`](./docs/mcp-server.md) | MCP / REST server documentation, endpoints, deployment. |
| [`tokens.js`](./tokens.js) | All design tokens as a CommonJS module (used by the server). |
| [`tokens/primitives/`](./tokens/primitives) | Primitive tokens (Style Dictionary source). |
| [`tokens/semantic/`](./tokens/semantic) | Semantic tokens for desktop and smartphone. |
| [`server/`](./server) | The MCP / REST server that exposes tokens. |
| [`fonts/`](./fonts) | OK family and Fellix web fonts. |
| [`llms.txt`](./llms.txt) | AI-discovery manifest pointing to primary context files. |

## Quick start for AI assistants

Before generating any UI or copy for OK, fetch and follow these files:

- [`CLARA.md`](https://raw.githubusercontent.com/kathrinebock/clara/main/CLARA.md) — design tokens, components, rules.
- [`docs/brand.md`](https://raw.githubusercontent.com/kathrinebock/clara/main/docs/brand.md) — tone of voice and product names.
- [`docs/design-system.md`](https://raw.githubusercontent.com/kathrinebock/clara/main/docs/design-system.md) — strict implementation rules.

## Hard rules

- Never use primitive tokens directly in components — always use semantic tokens.
- Never use hardcoded color, font or spacing values — always use the CSS custom properties from `CLARA.md`.
- Always use OK family for H1/H2 and Fellix for H3, H4, body, labels, buttons.
- Never write in ALL CAPS.
- Always use correct product names from `docs/brand.md`.

## MCP server

A live MCP / REST server exposes the tokens. See [`docs/mcp-server.md`](./docs/mcp-server.md) for endpoints, local development, deployment and Claude Desktop configuration.

## Updating design tokens

Edit [`tokens.js`](./tokens.js) to update the design system. The server uses the latest values on restart.

---

Made for the OK design system.
