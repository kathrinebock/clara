---
version: "1.0.0"
purpose: "VS Code Copilot configuration for Clara design system"
---

# Copilot instructions

These instructions configure GitHub Copilot in VS Code for Clara design system work.

Copy this file to your VS Code settings:
- **Location:** `.vscode/copilot-instructions.md`
- **Or:** Settings → Copilot → Instructions

---

## Core rules — always follow these

### Token usage (CRITICAL)

You are working with Clara, OK's design system.

**EVERY color or spacing value in CSS MUST use a semantic token from the CSS custom properties defined in CLARA.md.**

✓ Correct:
```css
background: var(--color-actions-button-primary-background);
color: var(--color-content-default);
padding: var(--spacing-md);
```

✗ Wrong:
```css
background: var(--color-red-800);      /* Primitive — forbidden */
background: #460019;                   /* Hardcoded — forbidden */
padding: 20px;                         /* Hardcoded — forbidden */
```

If you use a primitive token or hardcoded value, your CSS is invalid.

### Component usage

- Always copy Clara component HTML and CSS exactly from CLARA.md
- Never modify component specs
- Use correct CSS class names: `.clara-button`, `.clara-input`, `.clara-checkbox`
- Never add extra classes or styles not in the spec

### Font usage

- H1, H2: Always "OK family" — never substitute
- H3, H4, body, labels, buttons: Always "Fellix" — never substitute
- Never use any other font family

### Component availability

These components are ready to use (documented in CLARA.md):
- Button (`.clara-button`)
- Input (`.clara-input`)
- Checkbox (`.clara-checkbox`)
- Radio button (`.clara-radio`)
- Option tile (`.clara-option-tile`)
- Switch (`.clara-switch`)

If you need a component not in this list, you may create one following Clara's patterns, but it must:
- Use only semantic tokens
- Use only Fellix or OK family fonts
- Follow Clara's visual language

---

## Before you generate any code

1. **Check what you're building**
   - Are you creating a prototype? → Use `.instructions.md` + `.prompt.md`
   - Are you writing copy? → Use `docs/brand.md`
   - Are you both? → Use all three

2. **Fetch the latest rules**
   - CLARA.md: https://raw.githubusercontent.com/kathrinebock/clara/main/CLARA.md
   - docs/brand.md: https://raw.githubusercontent.com/kathrinebock/clara/main/docs/brand.md
   - Token lookup table: See `docs/token-reference.md` in this repo

3. **Before submitting your code**
   - Scan for hardcoded colors → remove them all
   - Scan for primitive tokens → replace with semantic
   - Scan for wrong fonts → fix to Fellix or OK family
   - Scan for modified Clara components → restore exact copy

---

## Common mistakes (don't do these)

| ✗ Wrong | ✓ Right | Why |
|---|---|---|
| `background: var(--color-red-800);` | `background: var(--color-actions-button-primary-background);` | Use semantic tokens |
| `color: #460019;` | `color: var(--color-content-default);` | Never hardcode |
| `padding: 20px;` | `padding: var(--spacing-md);` | Use token spacing |
| `font-family: Arial;` | `font-family: 'Fellix', sans-serif;` | Use Clara fonts only |
| `<input type="text">` | Use `.clara-input` component | Copy component exactly |
| `.clara-button { padding: 16px; }` | Copy padding from CLARA.md exactly | Don't modify specs |

---

## Workflow in VS Code

1. **Open Clara repository**
2. Copilot loads this file automatically
3. Open a code cell or new file
4. Type a task: "Create a login form using Clara"
5. Copilot generates code following all rules above
6. Copy the result

---

## Testing your code

After Copilot generates code, verify:

```
□ All colors are semantic tokens (var(--color-*))
□ No hardcoded colors (#hex, rgb(), etc.)
□ No primitive tokens (var(--color-red-*), var(--space-*))
□ All fonts are Fellix or OK family
□ Clara components copied exactly from CLARA.md
□ No extra CSS modifications
```

If you fail any check, ask Copilot to fix it.

---

## Questions?

- **Design tokens:** See `docs/token-reference.md`
- **Components:** See CLARA.md
- **Brand voice:** See `docs/brand.md`
- **Setup:** See README.md

---

**Last updated:** 2026-05-12
