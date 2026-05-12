---
version: "1.0.0"
purpose: "Design principles and visual refinement guidelines for Clara"
---

# Clara Design Principles

These principles ensure that Clara prototypes are not just structurally correct, but visually polished, with proper hierarchy, depth, and visual language.

---

## Elevation & Depth

Clara uses shadows and backgrounds to create visual hierarchy and depth.

### When to use `--elevation-sm`

| Component | When | Example |
|---|---|---|
| Cards | Always — cards are elevated surfaces | Product cards, content cards, image cards |
| Option tiles | Always — tiles need to be clickable surfaces | Plan selection, option grids |
| Modals/Dialogs | Always — modals float above the page | Confirmation dialogs, forms in modals |
| Dropdowns | Always — dropdowns hover over content | Select menus, option lists |
| Badges | Never — badges are flat | Status badges, labels, tags |
| Buttons | Never — buttons stay flat | All buttons (primary, secondary) |
| Inputs | Never — inputs are flat | Text fields, textareas, selects |

### When to use `--elevation-md`

| Component | When | Example |
|---|---|---|
| Notifications | For important alerts | Error messages, success confirmations |
| Tooltips | When needed for emphasis | Help text, attribute explanations |
| Sticky components | When they overlap content | Sticky headers, floating action bars |

### Shadow pattern

```css
/* Subtle shadow — most cards and tiles */
box-shadow: var(--elevation-sm);

/* Medium shadow — emphasis or layering */
box-shadow: var(--elevation-md);

/* No shadow — flat surfaces */
/* (borders instead) */
border: 1px solid var(--color-border-subtle);
```

---

## Spacing & Visual Rhythm

Spacing creates visual rhythm and guides the eye. Don't be afraid to use generous spacing.

### Spacing hierarchy

| Use case | Token | When |
|---|---|---|
| **Tight** | `var(--spacing-xxs)` (8px) | Between related items in a group (checkbox + label, radio + label) |
| **Small** | `var(--spacing-xs)` (12px) | Padding inside small components (buttons, small inputs) |
| **Medium** | `var(--spacing-sm)` (16px) | Default padding, gaps between form fields |
| **Large** | `var(--spacing-lg)` (24px) | Padding in cards, section gaps |
| **Extra large** | `var(--spacing-xl)` (32px) | Page section gaps, major visual breaks |
| **Huge** | `var(--spacing-2xl)`, `var(--spacing-3xl)`, `var(--spacing-4xl)` | Between page sections, dramatic visual breaks |

### Spacing patterns

**Inside a component (padding):**
```css
/* Button padding */
padding: var(--padding-buttons-small-vertical) var(--padding-buttons-small-horizontal);
/* Input padding */
padding: var(--padding-input-field-vertical) var(--padding-input-field-horizontal);
/* Card padding */
padding: var(--spacing-lg);
```

**Between elements (margin/gap):**
```css
/* Between form fields */
gap: var(--spacing-sm);

/* Between cards */
gap: var(--spacing-lg);

/* Between page sections */
margin-bottom: var(--spacing-2xl);
```

### Visual rhythm example

```
┌─────────────────────────────────────┐
│  ▲ var(--spacing-xl) — page top     │
│  ┌──────────────────────────────┐   │
│  │  Section Title       ← Bold  │   │
│  │  ▲ var(--spacing-sm)         │   │
│  │  Body text about section     │   │
│  │  ▲ var(--spacing-md)         │   │
│  │  ┌────────────────────────┐  │   │
│  │  │ Card 1                 │  │   │
│  │  └────────────────────────┘  │   │
│  │  ▲ var(--spacing-sm)         │   │
│  │  ┌────────────────────────┐  │   │
│  │  │ Card 2                 │  │   │
│  │  └────────────────────────┘  │   │
│  └──────────────────────────────┘   │
│  ▲ var(--spacing-2xl) — section gap │
│  ┌──────────────────────────────┐   │
│  │  Next Section                │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Color & Visual Hierarchy

Colors communicate status, action, and hierarchy. Use semantic tokens strategically.

### Color patterns

| Purpose | Tokens | When |
|---|---|---|
| **Primary action** | `var(--color-actions-button-primary-background)` (dark red) | Call-to-action buttons, main actions |
| **Secondary action** | `var(--color-actions-button-secondary-background)` (light) | Supporting buttons, alternative actions |
| **Links** | `var(--color-actions-link-default)` (dark red) | All clickable text links |
| **Success** | `var(--color-feedback-success-bold)` (green) | Success states, confirmations, checkmarks |
| **Error** | `var(--color-feedback-error-bold)` (red) | Validation errors, error states, alerts |
| **Warning** | `var(--color-feedback-warning-bold)` (yellow/orange) | Warnings, cautions, non-critical issues |
| **Body text** | `var(--color-content-default)` (dark) | All body copy, labels, form text |
| **Subtle text** | `var(--color-content-subtle)` (grey) | Helper text, captions, secondary info |
| **Borders** | `var(--color-border-subtle)` or `var(--color-border-bold)` | Dividers, input borders, card borders |

### Color usage example

```html
<!-- Primary action — use bold color -->
<button class="clara-button clara-button--primary">
  Pay now
</button>

<!-- Supporting action — use lighter background -->
<button class="clara-button clara-button--secondary">
  Cancel
</button>

<!-- Success feedback — use green -->
<div style="color: var(--color-feedback-success-bold);">
  ✓ Payment successful
</div>

<!-- Error feedback — use red -->
<div style="color: var(--color-feedback-error-bold);">
  ✗ Invalid email address
</div>

<!-- Helper text — use subtle grey -->
<span style="color: var(--color-content-subtle);">
  We'll send a confirmation to your email
</span>
```

---

## Icons & Illustrations

Icons add visual interest and clarify meaning. Illustrations tell stories.

### Icon usage rules

| Where | Do use | Don't use |
|---|---|---|
| **Button labels** | ✓ Icon + text together | ✗ Icon alone (unless universal) |
| **Status indicators** | ✓ Check, warning, error, info | ✗ Decorative icons |
| **Form fields** | ✓ Search, location, phone, email | ✗ Non-meaningful icons |
| **Next to links** | ✓ Arrow (›), external link (↗) | ✗ Decorative icons |
| **Empty states** | ✓ Large illustration | ✓ Communicates context |
| **Just for looks** | ✗ Never use decorative-only icons | — |

### Icon patterns

**Button with icon:**
```html
<button class="clara-button clara-button--primary">
  <svg><!-- icon --></svg>
  Continue
</button>
```

**Status indicator:**
```html
<!-- Success -->
<div style="color: var(--color-feedback-success-bold);">
  ✓ Completed
</div>

<!-- Error -->
<div style="color: var(--color-feedback-error-bold);">
  ✗ Failed
</div>

<!-- Info -->
<div style="color: var(--color-content-default);">
  ℹ Please note
</div>
```

**Link with arrow:**
```html
<a href="/more">
  Read more ›
</a>
```

---

## Typography Hierarchy

Typography creates visual hierarchy and guides reading.

### When to use each heading level

| Level | Family | Size | When |
|---|---|---|---|
| **H1** | OK family (Bold) | 56px desktop / 40px mobile | Page title — one per page, top of page |
| **H2** | OK family (SemiBold) | 40px desktop / 32px mobile | Major section — breaks the page into topics |
| **H3** | Fellix (SemiBold) | 32px desktop / 24px mobile | Subsection — within a major section |
| **H4** | Fellix (SemiBold) | 24px desktop / 20px mobile | Sub-subsection — detailed breakdown |
| **Body** | Fellix (Regular) | 16px | All body copy and descriptions |
| **Small** | Fellix (Regular) | 14px | Captions, helper text, secondary info |
| **Label** | Fellix (Medium) | 14px | Form labels, button text |

### Hierarchy example

```
┌─────────────────────────────────────────┐
│  [H1] Welcome to Clara                  │ ← Page title (one per page)
│                                         │
│  [H2] Get Started                       │ ← Major section
│  [Body] Follow these steps to begin     │
│                                         │
│  [H3] Step One: Set up                  │ ← Subsection
│  [Body] This is the body text...        │
│                                         │
│  [H3] Step Two: Configure               │ ← Subsection
│  [Body] This is more body text...       │
│                                         │
│  [H2] Learn More                        │ ← New major section
│  [Small] Additional resources below     │
└─────────────────────────────────────────┘
```

---

## Component Refinement Checklist

Before finishing a prototype component, ask yourself:

### Elevation & Depth
- [ ] Does this component need `--elevation-sm`? (cards, tiles, modals)
- [ ] Is the shadow appropriate for the context?
- [ ] Are layered components clearly distinguished?

### Spacing
- [ ] Is padding appropriate inside the component?
- [ ] Are gaps between elements creating visual rhythm?
- [ ] Is there enough breathing room? (use generous spacing)

### Color
- [ ] Is the primary action using `--color-actions-button-primary-background`?
- [ ] Are secondary actions using lighter backgrounds?
- [ ] Is feedback using semantic tokens (success, error, warning)?
- [ ] Is helper text using `--color-content-subtle`?

### Typography
- [ ] Is the heading level appropriate?
- [ ] Are OK family used for H1/H2 only?
- [ ] Is body text using Fellix?
- [ ] Is hierarchy clear through size and weight?

### Icons & Visual Interest
- [ ] Do icons serve a purpose? (not decorative)
- [ ] Are status indicators using semantic colors?
- [ ] Would an illustration improve the empty state?

### Overall
- [ ] Does the prototype look professional, not like a wireframe?
- [ ] Can you improve it with more generous spacing or subtle colors?
- [ ] Would another element (card border, subtle background) improve it?

---

## Examples of "polished" vs. "flat"

### ❌ Flat (wireframe-like)

```html
<div style="background: white; border: 1px solid #ddd; padding: 20px;">
  <h2>Section Title</h2>
  <p>Body text here.</p>
  <button style="background: #460019; color: white; padding: 10px 20px;">
    Click me
  </button>
</div>
```

Problems:
- No spacing hierarchy
- Border is thin and stark
- Button looks flat
- Minimal visual interest

### ✓ Polished

```html
<div style="background: var(--color-backgrounds-elevated); 
            border: 1px solid var(--color-border-subtle); 
            border-radius: var(--corner-radius-card);
            box-shadow: var(--elevation-sm);
            padding: var(--spacing-lg);">
  <h2 style="color: var(--color-content-display); margin: 0 0 var(--spacing-md) 0;">
    Section Title
  </h2>
  <p style="color: var(--color-content-subtle); 
            line-height: 1.6;
            margin: 0 0 var(--spacing-lg) 0;">
    Body text with generous spacing and proper color hierarchy.
  </p>
  <button class="clara-button clara-button--primary clara-button--large">
    Click me
  </button>
</div>
```

Improvements:
- Generous padding (var(--spacing-lg))
- Elevated background with subtle shadow
- Color hierarchy (display title, subtle body)
- Proper button styling from Clara
- Visual interest from layering

---

## Remember

> **Design is not just how it looks, but how it feels.** Use spacing, color, and depth to create rhythm and visual interest. Your prototypes should look polished, not like wireframes.

---

**Last updated:** 2026-05-12
