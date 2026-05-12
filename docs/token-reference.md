---
version: "1.0.0"
purpose: "Quick reference for Clara semantic tokens"
---

# Clara Token Reference

Quick lookup table for semantic tokens. Use these in your CSS — never use primitive tokens.

---

## Colors

### Content

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Body text | `var(--color-content-default)` | #23000D | Paragraphs, labels, regular text |
| Inverted text | `var(--color-content-inverted)` | #FFFFFF | Text on dark backgrounds |
| Subtle text | `var(--color-content-subtle)` | #4C433E | Helper text, captions, hints |
| Display text | `var(--color-content-display)` | #460019 | Emphasis, highlight |
| Display variant | `var(--color-content-display-variant)` | #FF3C3C | Alternative emphasis |

### Backgrounds

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Default | `var(--color-backgrounds-default)` | #FFFFFF | Page background |
| Elevated | `var(--color-backgrounds-elevated)` | #FFFAF7 | Cards, sections |
| Subdued | `var(--color-backgrounds-subdued)` | #F7EFEB | Background fills, light sections |

### Borders

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Bold | `var(--color-border-bold)` | #460019 | Input borders, form controls |
| Subtle | `var(--color-border-subtle)` | #E6D9D2 | Dividers, light borders |
| Focus | `var(--color-border-focus)` | #FF55FF | Focus rings on inputs |

### Actions — Buttons

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Primary bg | `var(--color-actions-button-primary-background)` | #460019 | Primary button background |
| Primary text | `var(--color-actions-button-primary-text)` | #FFFFFF | Primary button text |
| Secondary bg | `var(--color-actions-button-secondary-background)` | #FFFAF7 | Secondary button background |
| Secondary text | `var(--color-actions-button-secondary-text)` | #460019 | Secondary button text |

### Actions — Links

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Default | `var(--color-actions-link-default)` | #460019 | Link text |
| Focus | `var(--color-actions-link-focus)` | #BC2CBC | Link on focus/hover |

### Forms

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Input border (default) | `var(--color-forms-input-border-default)` | #BFB1AA | Input field border |
| Input border (focus) | `var(--color-forms-input-border-focus)` | #4C433E | Input field on focus |
| Input border (hover) | `var(--color-forms-input-border-hover)` | #736761 | Input field on hover |
| Input background | `var(--color-forms-input-background-default)` | #FFFFFF | Input field background |
| Checkbox/Radio border | `var(--color-forms-checkbox-border)` | #460019 | Checkbox/radio border |
| Switch (on) | `var(--color-forms-switch-on)` | #460019 | Switch when active |
| Switch (off) | `var(--color-forms-switch-off)` | #BFB1AA | Switch when inactive |
| Switch handle | `var(--color-forms-switch-handle)` | #FFFFFF | Switch toggle handle |
| Option tile bg (default) | `var(--color-forms-option-tile-background-default)` | #FFFFFF | Option tile background |
| Option tile bg (selected) | `var(--color-forms-option-tile-background-selected)` | #F7EFEB | Option tile when selected |
| Option tile border (default) | `var(--color-forms-option-tile-border-default)` | #BFB1AA | Option tile border |
| Option tile border (selected) | `var(--color-forms-option-tile-border-selected)` | #460019 | Option tile border when selected |

### Feedback

| Use case | Token | Hex | Usage |
|---|---|---|---|
| Success (bold) | `var(--color-feedback-success-bold)` | #289B5F | Success messages, check marks |
| Success (subtle) | `var(--color-feedback-success-subtle)` | #EAFAE8 | Success background |
| Error (bold) | `var(--color-feedback-error-bold)` | #8C0000 | Error messages |
| Error (subtle) | `var(--color-feedback-error-subtle)` | #FFF2F2 | Error background |
| Warning (bold) | `var(--color-feedback-warning-bold)` | #FDAD44 | Warning messages |
| Warning (subtle) | `var(--color-feedback-warning-subtle)` | #FFFAE5 | Warning background |
| Info (bold) | `var(--color-feedback-info-bold)` | #26211F | Info messages |
| Info (subtle) | `var(--color-feedback-info-subtle)` | #F2E7E1 | Info background |

### Overlays

| Use case | Token | RGBA | Usage |
|---|---|---|---|
| White (10%) | `var(--color-overlay-white-10)` | rgba(255, 255, 255, 0.1) | Hover overlay on primary |
| White (50%) | `var(--color-overlay-white-50)` | rgba(255, 255, 255, 0.5) | Half-transparent white |
| Black (10%) | `var(--color-overlay-black-10)` | rgba(26, 22, 20, 0.1) | Hover overlay on secondary |
| Black (50%) | `var(--color-overlay-black-50)` | rgba(26, 22, 20, 0.5) | Active/pressed overlay |

---

## Spacing

Use these for margins, padding, gaps:

| Size | Token | Pixels | Usage |
|---|---|---|---|
| Tiny | `var(--spacing-tiny)` | 4px | Extra tight spacing |
| Extra small | `var(--spacing-xxs)` | 8px | Gaps between items |
| Small | `var(--spacing-xs)` | 12px | Input padding, small gaps |
| Small | `var(--spacing-sm)` | 16px | Button padding, form gaps |
| Medium | `var(--spacing-md)` | 20px | General padding |
| Large | `var(--spacing-lg)` | 24px | Section padding |
| Extra large | `var(--spacing-xl)` | 32px | Large sections |
| 2x large | `var(--spacing-2xl)` | 40px | Extra large sections |
| 3x large | `var(--spacing-3xl)` | 48px | Page sections |
| 4x large | `var(--spacing-4xl)` | 64px | Large page sections |

---

## Border Radius

| Use case | Token | Value | Usage |
|---|---|---|---|
| Buttons | `var(--corner-radius-button)` | 8px | Button corners |
| Inputs | `var(--corner-radius-input-field)` | 8px | Input field corners |
| Checkbox | `var(--corner-radius-checkbox)` | 4px | Checkbox corners |
| Switch | `var(--corner-radius-switch)` | 64px | Switch pill shape |
| Option tile | `var(--corner-radius-option-tile)` | 10px | Option tile corners |
| Card | `var(--corner-radius-card)` | 24px | Large cards |

---

## Shadows

| Use case | Token | Value | Usage |
|---|---|---|---|
| Small | `var(--elevation-sm)` | 0 0 5px 0 rgba(0,0,0,0.15) | Subtle shadow |
| Medium | `var(--elevation-md)` | 0 0 8px 0 rgba(0,0,0,0.20) | Standard shadow |

---

## Typography

| Element | Token | Size | Weight | Line height |
|---|---|---|---|---|
| H1 (mobile) | — | 40px | Bold | 48px |
| H1 (desktop) | — | 56px | Bold | 64px |
| H2 (mobile) | — | 32px | SemiBold | 40px |
| H2 (desktop) | — | 40px | SemiBold | 48px |
| H3 (mobile) | — | 24px | SemiBold | 32px |
| H3 (desktop) | — | 32px | SemiBold | 40px |
| H4 (mobile) | — | 20px | SemiBold | 24px |
| H4 (desktop) | — | 24px | SemiBold | 32px |
| Body | — | 16px | Regular | 20px |
| Body small | — | 14px | Regular | 16px |
| Caption | — | 14px | Medium | 16px |
| Button small | — | 16px | Medium | 24px |
| Button large | — | 20px | Medium | 24px |
| Input label | — | 14px | Medium | 16px |

---

## How to use this table

1. **Find your use case** in the "Use case" column
2. **Copy the token** from "Token" column
3. **Use in CSS:**
   ```css
   background: var(--color-actions-button-primary-background);
   padding: var(--spacing-md);
   border: 2px solid var(--color-border-bold);
   ```

---

## Rules

- ✓ Always use the token (e.g., `var(--color-content-default)`)
- ✗ Never use the hex value (e.g., `#23000D`)
- ✗ Never use primitive tokens (e.g., `var(--color-red-800)`)
- ✗ Never hardcode values (e.g., `20px`, `#460019`)

---

## Questions?

- **Full token definitions:** See CLARA.md
- **Components using tokens:** See CLARA.md
- **Token storage:** See tokens.js and tokens/ directory
- **Rest API:** See docs/mcp-server.md

---

**Last updated:** 2026-05-12
