# Clara
Clara — OK's internal design system. Design tokens and Web Components built from Figma.

## Figma
The source of truth for Clara lives in Figma:
- **Figma file:** https://www.figma.com/design/fDsr4AP1RiVYLC2WlUflaL/Clara?node-id=25-1736&m=dev

## Setup
1. Clone the repository:
```bash
   git clone https://github.com/laerkelange/clara.git
   cd clara
```
2. Install dependencies:
```bash
   npm install
```
3. Build CSS variables from design tokens:
```bash
   npx style-dictionary build --config sd.config.json
```
   This generates `tokens/dist/tokens.css` from the JSON source files in `tokens/src/`.

## Structure
- `tokens/src/` — design token JSON files exported from Figma (source of truth)
- `tokens/dist/` — generated CSS variables (do not edit manually)
- `components/` — Web Components
- `sd.config.json` — Style Dictionary config for building tokens

## Token usage
Import the generated CSS file and use variables in your components:
```css
@import 'tokens/dist/tokens.css';

.my-element {
  color: var(--color-content-default);
  background: var(--color-backgrounds-default);
  padding: var(--padding-buttons-large-vertical) var(--padding-buttons-large-horizontal);
}
```