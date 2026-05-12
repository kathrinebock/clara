# Clara — OK's Design System

This file contains OK's design tokens, typography, fonts, spacing and component documentation.
Use it as context when building UI, pages, forms or prototypes for OK.
Never use hardcoded colors, fonts or spacing — always use the tokens defined here.

---

## Fonts

Always load these fonts before using any Clara component or styling:

```css
@font-face {
  font-family: 'OK family';
  src: url('https://cdn.ok.dk/wok/fonts/ok-family/okfamily-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'OK family';
  src: url('https://cdn.ok.dk/wok/fonts/ok-family/okfamily-semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fellix';
  src: url('https://cdn.ok.dk/wok/fonts/fellix/Fellix-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fellix';
  src: url('https://cdn.ok.dk/wok/fonts/fellix/Fellix-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Fellix';
  src: url('https://cdn.ok.dk/wok/fonts/fellix/Fellix-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

### Font rules — never break these
- H1, H2: Always use "OK family" — never substitute
- H3, H4, body, links, labels, buttons: Always use "Fellix" — never substitute
- Never use any other font

---

## Tokens

Always define these CSS custom properties in `:root` before using any component.
Primitive tokens define the base values. Semantic tokens reference primitives — never use primitives directly in components.

```css
:root {

  /* ─── PRIMITIVE TOKENS ─────────────────────────────────────────────────── */
  /* These are the base values. Never use these directly in components.       */
  /* Always use semantic tokens instead.                                      */

  /* Red */
  --color-red-100: #fff2f2;
  --color-red-200: #ffe6e6;
  --color-red-300: #ffbebe;
  --color-red-400: #ff8c8c;
  --color-red-500: #ff5f5f;
  --color-red-600: #ff3c3c;
  --color-red-700: #8c0000;
  --color-red-800: #460019;
  --color-red-900: #23000d;

  /* Grey */
  --color-grey-000: #ffffff;
  --color-grey-100: #fffaf7;
  --color-grey-200: #f7efeb;
  --color-grey-300: #f2e7e1;
  --color-grey-400: #e6d9d2;
  --color-grey-500: #bfb1aa;
  --color-grey-600: #998c85;
  --color-grey-700: #736761;
  --color-grey-800: #4c433e;
  --color-grey-900: #26211f;
  --color-grey-1000: #000000;

  /* Green */
  --color-green-100: #eafae8;
  --color-green-200: #d2facd;
  --color-green-300: #87eb9b;
  --color-green-400: #37d27d;
  --color-green-500: #30b66e;
  --color-green-600: #289b5f;
  --color-green-700: #055523;
  --color-green-800: #00280f;
  --color-green-900: #001809;

  /* Yellow */
  --color-yellow-100: #fffae5;
  --color-yellow-200: #fff2c2;
  --color-yellow-300: #ffe696;
  --color-yellow-400: #ffc85a;
  --color-yellow-500: #fdad44;
  --color-yellow-600: #fa912d;
  --color-yellow-700: #bb4410;
  --color-yellow-800: #550a00;
  --color-yellow-900: #1c0300;

  /* Pink */
  --color-pink-100: #fff2ff;
  --color-pink-200: #ffe6ff;
  --color-pink-300: #ffcdff;
  --color-pink-400: #ffaaff;
  --color-pink-500: #ff80ff;
  --color-pink-600: #ff55ff;
  --color-pink-700: #bc2cbc;
  --color-pink-800: #460f46;
  --color-pink-900: #1c021c;

  /* Blue */
  --color-blue-100: #f2f9ff;
  --color-blue-200: #e5f2ff;
  --color-blue-300: #cdebff;
  --color-blue-400: #aadcff;
  --color-blue-500: #7ac8ff;
  --color-blue-600: #4bb4ff;
  --color-blue-700: #0071c2;
  --color-blue-800: #002d4b;
  --color-blue-900: #000f19;

  /* Spacing primitives */
  --size-tiny: 4px;
  --size-xxs: 6px;
  --size-xs: 8px;
  --size-sm: 10px;
  --size-md: 12px;
  --size-lg: 14px;
  --size-xl: 16px;
  --size-2xl: 20px;
  --size-3xl: 24px;
  --size-4xl: 32px;
  --size-5xl: 40px;
  --size-6xl: 48px;
  --size-7xl: 56px;
  --size-huge: 64px;

  --space-tiny: 4px;
  --space-xxs: 8px;
  --space-xs: 12px;
  --space-sm: 16px;
  --space-md: 20px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 40px;
  --space-3xl: 48px;
  --space-4xl: 64px;


  /* ─── SEMANTIC TOKENS ───────────────────────────────────────────────────── */
  /* Use these in all components. They reference primitive tokens above.       */

  /* Content */
  --color-content-default: var(--color-red-900);
  --color-content-inverted: var(--color-grey-000);
  --color-content-subtle: var(--color-grey-800);
  --color-content-display: var(--color-red-800);
  --color-content-display-variant: var(--color-red-600);

  /* Backgrounds */
  --color-backgrounds-default: var(--color-grey-000);
  --color-backgrounds-elevated: var(--color-grey-100);
  --color-backgrounds-subdued: var(--color-grey-200);

  /* Borders */
  --color-border-bold: var(--color-red-800);
  --color-border-subtle: var(--color-grey-400);
  --color-border-focus: var(--color-pink-600);

  /* Actions — Button */
  --color-actions-button-primary-background: var(--color-red-800);
  --color-actions-button-primary-text: var(--color-grey-000);
  --color-actions-button-secondary-background: var(--color-grey-100);
  --color-actions-button-secondary-text: var(--color-red-800);

  /* Actions — Link */
  --color-actions-link-default: var(--color-red-800);
  --color-actions-link-focus: var(--color-pink-700);

  /* Overlays — used for interactive states */
  --color-overlay-white-10: rgba(255, 255, 255, 0.1);
  --color-overlay-white-50: rgba(255, 255, 255, 0.5);
  --color-overlay-black-10: rgba(26, 22, 20, 0.1);
  --color-overlay-black-50: rgba(26, 22, 20, 0.5);

  /* Forms */
  --color-forms-input-border-default: var(--color-grey-500);
  --color-forms-input-border-focus: var(--color-grey-800);
  --color-forms-input-border-hover: var(--color-grey-700);
  --color-forms-input-background-default: var(--color-grey-000);
  --color-forms-checkbox-border: var(--color-red-800);
  --color-forms-radio-button-border: var(--color-red-800);
  --color-forms-switch-on: var(--color-red-800);
  --color-forms-switch-off: var(--color-grey-500);
  --color-forms-switch-handle: var(--color-grey-000);
  --color-forms-option-tile-background-default: var(--color-grey-000);
  --color-forms-option-tile-background-selected: var(--color-grey-200);
  --color-forms-option-tile-border-default: var(--color-grey-500);
  --color-forms-option-tile-border-selected: var(--color-red-800);

  /* Feedback */
  --color-feedback-success-bold: var(--color-green-600);
  --color-feedback-success-subtle: var(--color-green-100);
  --color-feedback-error-bold: var(--color-red-700);
  --color-feedback-error-subtle: var(--color-red-100);
  --color-feedback-warning-bold: var(--color-yellow-500);
  --color-feedback-warning-subtle: var(--color-yellow-100);
  --color-feedback-info-bold: var(--color-grey-900);
  --color-feedback-info-subtle: var(--color-grey-300);

  /* Elevation */
  --elevation-sm: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  --elevation-md: 0 0 8px 0 rgba(0, 0, 0, 0.20);

  /* Spacing */
  --spacing-tiny: var(--space-tiny);
  --spacing-xxs: var(--space-xxs);
  --spacing-xs: var(--space-xs);
  --spacing-sm: var(--space-sm);
  --spacing-md: var(--space-md);
  --spacing-lg: var(--space-lg);
  --spacing-xl: var(--space-xl);
  --spacing-2xl: var(--space-2xl);
  --spacing-3xl: var(--space-3xl);
  --spacing-4xl: var(--space-4xl);

  /* Corner radius */
  --corner-radius-button: var(--size-xs);
  --corner-radius-input-field: var(--size-xs);
  --corner-radius-checkbox: var(--size-tiny);
  --corner-radius-switch: var(--size-huge);
  --corner-radius-option-tile: var(--size-sm);
  --corner-radius-card: var(--size-3xl);

  /* Padding — buttons */
  --padding-buttons-small-vertical: var(--space-xxs);
  --padding-buttons-small-horizontal: var(--space-sm);
  --padding-buttons-small-gap: var(--space-tiny);
  --padding-buttons-large-vertical: var(--space-xs);
  --padding-buttons-large-horizontal: var(--space-md);
  --padding-buttons-large-gap: var(--space-tiny);

  /* Padding — input */
  --padding-input-field-vertical: var(--space-xs);
  --padding-input-field-horizontal: var(--space-sm);
  --padding-input-container-gap: var(--space-tiny);

  /* Padding — option tile */
  --padding-option-tile-vertical: var(--space-sm);
  --padding-option-tile-horizontal: var(--space-sm);
  --padding-option-tile-gap: var(--space-xxs);
}
```

---

## Typography

Headings are responsive — they scale up on desktop (768px and above).
Body, label and UI text stays the same across all breakpoints.

### Headings

| Element | Family | Weight | Smartphone | Desktop |
|---|---|---|---|---|
| H1 | OK family | Bold (700) | 40px / 48px lh | 56px / 64px lh |
| H2 | OK family | SemiBold (600) | 32px / 40px lh | 40px / 48px lh |
| H3 | Fellix | SemiBold (600) | 24px / 32px lh | 32px / 40px lh |
| H4 | Fellix | SemiBold (600) | 20px / 24px lh | 24px / 32px lh |

### Body & UI text

| Element | Family | Weight | Size | Line height |
|---|---|---|---|---|
| Body default | Fellix | Regular (400) | 16px | 20px |
| Body small | Fellix | Regular (400) | 14px | 16px |
| Caption | Fellix | Medium (500) | 14px | 16px |
| Button small | Fellix | Medium (500) | 16px | 24px |
| Button large | Fellix | Medium (500) | 20px | 24px |
| Input label | Fellix | Medium (500) | 14px | 16px |
| Input content | Fellix | Medium (500) | 14px | 16px |
| Input helper | Fellix | Regular (400) | 12px | 12px |

---

## Components

All components use plain CSS classes with the `clara-` prefix.
Always load the fonts and define the tokens above before using any component.
Never use hardcoded color, font or spacing values — always use CSS custom properties.

---

### Button — `.clara-button`

```html
<!-- Primary -->
<button class="clara-button clara-button--primary clara-button--small">Label</button>
<button class="clara-button clara-button--primary clara-button--large">Label</button>

<!-- Secondary -->
<button class="clara-button clara-button--secondary clara-button--small">Label</button>
<button class="clara-button clara-button--secondary clara-button--large">Label</button>

<!-- Disabled -->
<button class="clara-button clara-button--primary clara-button--small" disabled>Label</button>
```

```css
.clara-button {
  font-family: 'Fellix', sans-serif;
  font-weight: 500;
  border-radius: var(--corner-radius-button);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  transition: opacity 160ms ease;
}

.clara-button--small {
  font-size: 16px;
  line-height: 24px;
  padding: var(--padding-buttons-small-vertical) var(--padding-buttons-small-horizontal);
  gap: var(--padding-buttons-small-gap);
}

.clara-button--large {
  font-size: 20px;
  line-height: 24px;
  padding: var(--padding-buttons-large-vertical) var(--padding-buttons-large-horizontal);
  gap: var(--padding-buttons-large-gap);
}

.clara-button--primary {
  background: var(--color-actions-button-primary-background);
  color: var(--color-actions-button-primary-text);
}

.clara-button--secondary {
  background: var(--color-actions-button-secondary-background);
  color: var(--color-actions-button-secondary-text);
  border: 2px solid var(--color-border-bold);
}

.clara-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.clara-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: transparent;
  transition: background 160ms ease;
  pointer-events: none;
  border-radius: inherit;
}

.clara-button--primary:hover:not(:disabled)::before {
  background: var(--color-overlay-white-10);
}

.clara-button--secondary:hover:not(:disabled)::before {
  background: var(--color-overlay-black-10);
}

.clara-button:active:not(:disabled)::before {
  background: var(--color-overlay-black-50);
}

.clara-button:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

**Usage guidelines**
- Use primary for the most important action on a page
- Use secondary for supporting actions alongside a primary button
- Disabled is a state — apply it with the `disabled` attribute, not a separate class
- Hover and pressed states use overlay tokens — never hardcoded colors

---

### Input — `.clara-input`

```html
<!-- Default -->
<div class="clara-input">
  <label class="clara-input__label">Label</label>
  <input class="clara-input__field" type="text">
  <span class="clara-input__helper">Helper text</span>
</div>

<!-- Error -->
<div class="clara-input clara-input--error">
  <label class="clara-input__label">Label</label>
  <input class="clara-input__field" type="text">
  <span class="clara-input__helper">Fejlbesked</span>
</div>

<!-- Disabled -->
<div class="clara-input clara-input--disabled">
  <label class="clara-input__label">Label</label>
  <input class="clara-input__field" type="text" disabled>
  <span class="clara-input__helper">Helper text</span>
</div>
```

```css
.clara-input {
  display: flex;
  flex-direction: column;
  gap: var(--padding-input-container-gap);
}

.clara-input__label {
  font-family: 'Fellix', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: var(--color-content-default);
}

.clara-input__field {
  font-family: 'Fellix', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: var(--color-content-default);
  background: var(--color-forms-input-background-default);
  border: 2px solid var(--color-forms-input-border-default);
  border-radius: var(--corner-radius-input-field);
  padding: var(--padding-input-field-vertical) var(--padding-input-field-horizontal);
  height: 48px;
  outline: none;
  transition: border-color 160ms ease;
  width: 100%;
  box-sizing: border-box;
}

.clara-input__field:hover {
  border-color: var(--color-forms-input-border-hover);
}

.clara-input__field:focus {
  border-color: var(--color-forms-input-border-focus);
}

.clara-input__helper {
  font-family: 'Fellix', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  color: var(--color-content-subtle);
}

.clara-input--error .clara-input__field {
  border-color: var(--color-feedback-error-bold);
}

.clara-input--error .clara-input__label,
.clara-input--error .clara-input__helper {
  color: var(--color-feedback-error-bold);
}

.clara-input--disabled .clara-input__field,
.clara-input--disabled .clara-input__label,
.clara-input--disabled .clara-input__helper {
  opacity: 0.5;
}

.clara-input--disabled .clara-input__field {
  cursor: not-allowed;
}
```

**Usage guidelines**
- Always include a label
- Only use a placeholder when it helps the user understand the expected format — e.g. phone number or member code. Never use a placeholder as a substitute for a label
- Helper text is for guidance or validation only — only show it when needed
- Icons are for secondary actions, status or visual context only — never decorative

---

### Checkbox — `.clara-checkbox`

```html
<!-- Unchecked -->
<label class="clara-checkbox">
  <input type="checkbox" class="clara-checkbox__input">
  <span class="clara-checkbox__label">Checkbox</span>
</label>

<!-- Checked -->
<label class="clara-checkbox">
  <input type="checkbox" class="clara-checkbox__input" checked>
  <span class="clara-checkbox__label">Checkbox</span>
</label>

<!-- Disabled -->
<label class="clara-checkbox clara-checkbox--disabled">
  <input type="checkbox" class="clara-checkbox__input" disabled>
  <span class="clara-checkbox__label">Checkbox</span>
</label>
```

```css
.clara-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xxs);
  padding: var(--spacing-xs);
  cursor: pointer;
}

.clara-checkbox__input {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--color-forms-checkbox-border);
  border-radius: var(--corner-radius-checkbox);
  appearance: none;
  cursor: pointer;
}

.clara-checkbox__input:checked {
  background-color: var(--color-forms-checkbox-border);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 8l4 4 6-6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px;
}

.clara-checkbox__label {
  font-family: 'Fellix', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-content-default);
}

.clara-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clara-checkbox--disabled .clara-checkbox__input {
  cursor: not-allowed;
}
```

**Usage guidelines**
- Always include a label
- Touch target is 12px padding around the entire checkbox and label — never reduce the clickable area

---

### Radio button — `.clara-radio`

```html
<!-- Unselected -->
<label class="clara-radio">
  <input type="radio" class="clara-radio__input" name="group">
  <span class="clara-radio__label">Radio button</span>
</label>

<!-- Selected -->
<label class="clara-radio">
  <input type="radio" class="clara-radio__input" name="group" checked>
  <span class="clara-radio__label">Radio button</span>
</label>

<!-- Disabled -->
<label class="clara-radio clara-radio--disabled">
  <input type="radio" class="clara-radio__input" name="group" disabled>
  <span class="clara-radio__label">Radio button</span>
</label>
```

```css
.clara-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xxs);
  padding: var(--spacing-xs);
  cursor: pointer;
}

.clara-radio__input {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid var(--color-forms-radio-button-border);
  border-radius: 50%;
  appearance: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clara-radio__input:checked::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-forms-radio-button-border);
}

.clara-radio__label {
  font-family: 'Fellix', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-content-default);
}

.clara-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clara-radio--disabled .clara-radio__input {
  cursor: not-allowed;
}
```

**Usage guidelines**
- Always use radio buttons in a group — never a single radio button alone
- Always include a label
- Touch target is 12px padding around the entire radio and label — never reduce the clickable area
- Users can only select one option at a time

---

### Card — `.clara-card`

Cards are containers for content. They always have a border, elevated background and a shadow.
Three variants exist: image card, product card and content card.

```html
<!-- Image card -->
<div class="clara-card">
  <div class="clara-card__image">
    <img src="image.jpg" alt="Description">
  </div>
  <div class="clara-card__body">
    <h3 class="clara-card__title">Card title</h3>
    <p class="clara-card__text">Body text describing the content of this card.</p>
    <a class="clara-card__link" href="#">Læs mere ›</a>
  </div>
</div>

<!-- Content card (no image) -->
<div class="clara-card clara-card--content">
  <div class="clara-card__body">
    <div class="clara-card__icon"><!-- icon goes here --></div>
    <h3 class="clara-card__title">Card title</h3>
    <p class="clara-card__text">Body text describing the content of this card.</p>
    <a class="clara-card__link" href="#">Se tilbud ›</a>
  </div>
</div>

<!-- Product card -->
<div class="clara-card clara-card--product">
  <div class="clara-card__badge">Ingen binding eller abonnement</div>
  <div class="clara-card__image">
    <img src="image.jpg" alt="Description">
  </div>
  <div class="clara-card__body">
    <h3 class="clara-card__title">Product title</h3>
    <p class="clara-card__text">Product description text.</p>
    <ul class="clara-card__list">
      <li>Feature one</li>
      <li>Feature two</li>
    </ul>
    <p class="clara-card__price">Køb fra 6.995 kr.</p>
    <button class="clara-button clara-button--primary clara-button--large">Bestil</button>
    <a class="clara-card__link" href="#">Se flere detaljer</a>
  </div>
</div>
```

```css
.clara-card {
  background: var(--color-backgrounds-elevated);
  border: 3px solid var(--color-border-subtle);
  border-radius: var(--corner-radius-card);
  box-shadow: var(--elevation-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.clara-card__image img {
  width: 100%;
  height: auto;
  display: block;
}

.clara-card__body {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}

.clara-card__title {
  font-family: 'Fellix', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: var(--color-content-default);
  margin: 0;
}

.clara-card__text {
  font-family: 'Fellix', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-content-subtle);
  margin: 0;
}

.clara-card__link {
  font-family: 'Fellix', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-actions-link-default);
  text-decoration: none;
}

.clara-card__link:focus-visible {
  color: var(--color-actions-link-focus);
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.clara-card__price {
  font-family: 'Fellix', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-content-default);
  margin: 0;
}

.clara-card__list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  font-family: 'Fellix', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--color-content-default);
}

.clara-card__badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-tiny) var(--spacing-xs);
  background: var(--color-border-focus);
  color: var(--color-content-default);
  font-family: 'Fellix', sans-serif;
  font-size: 12px;
  font-weight: 500;
  border-radius: var(--corner-radius-switch);
  width: fit-content;
  margin: var(--spacing-sm) 0 0 var(--spacing-sm);
}
```

**Usage guidelines**
- Cards always have a border, elevated background and elevation/sm shadow
- Corner radius is always var(--corner-radius-card) — 24px
- Use image card when a visual is the primary draw
- Use content card when an icon or text is the primary draw
- Use product card when showing a purchasable item with price and CTA
- The badge is optional — only use it for a key selling point

---

### Option tile — `.clara-option-tile`

Option tiles are used for selecting one option from a list.
They can be collapsed (title only) or expanded (title + descriptions).

```html
<!-- Collapsed, unselected -->
<div class="clara-option-tile" tabindex="0">
  <span class="clara-option-tile__title">Title</span>
  <span class="clara-option-tile__subtitle">Another title</span>
</div>

<!-- Collapsed, selected -->
<div class="clara-option-tile clara-option-tile--selected" tabindex="0">
  <span class="clara-option-tile__title">Title</span>
  <span class="clara-option-tile__subtitle">Another title</span>
</div>

<!-- Expanded, unselected -->
<div class="clara-option-tile clara-option-tile--expanded" tabindex="0">
  <div class="clara-option-tile__header">
    <span class="clara-option-tile__title">Title</span>
    <span class="clara-option-tile__subtitle">Another title</span>
  </div>
  <div class="clara-option-tile__descriptions">
    <div class="clara-option-tile__row">
      <span class="clara-option-tile__description">Description 1</span>
      <span class="clara-option-tile__description">Another description 1</span>
    </div>
    <div class="clara-option-tile__row">
      <span class="clara-option-tile__description">Description 2</span>
      <span class="clara-option-tile__description">Another description 2</span>
    </div>
  </div>
</div>

<!-- Expanded, selected -->
<div class="clara-option-tile clara-option-tile--expanded clara-option-tile--selected" tabindex="0">
  <div class="clara-option-tile__header">
    <span class="clara-option-tile__title">Title</span>
    <span class="clara-option-tile__subtitle">Another title</span>
  </div>
  <div class="clara-option-tile__descriptions">
    <div class="clara-option-tile__row">
      <span class="clara-option-tile__description">Description 1</span>
      <span class="clara-option-tile__description">Another description 1</span>
    </div>
  </div>
</div>
```

```css
.clara-option-tile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--padding-option-tile-gap);
  padding: var(--padding-option-tile-vertical) var(--padding-option-tile-horizontal);
  background: var(--color-forms-option-tile-background-default);
  border: 1px solid var(--color-forms-option-tile-border-default);
  border-radius: var(--corner-radius-option-tile);
  cursor: pointer;
  box-shadow: var(--elevation-sm);
  transition: border-color 160ms ease, background 160ms ease;
  position: relative;
  overflow: hidden;
}

.clara-option-tile--expanded {
  flex-direction: column;
  align-items: stretch;
}

.clara-option-tile::before {
  content: '';
  position: absolute;
  inset: 0;
  background: transparent;
  transition: background 160ms ease;
  pointer-events: none;
}

.clara-option-tile:hover::before {
  background: var(--color-overlay-black-10);
}

.clara-option-tile:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

.clara-option-tile--selected {
  background: var(--color-forms-option-tile-background-selected);
  border-color: var(--color-forms-option-tile-border-selected);
}

.clara-option-tile__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clara-option-tile__title {
  font-family: 'Fellix', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: var(--color-content-default);
}

.clara-option-tile__subtitle {
  font-family: 'Fellix', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-content-default);
}

.clara-option-tile__descriptions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
}

.clara-option-tile__row {
  display: flex;
  justify-content: space-between;
}

.clara-option-tile__description {
  font-family: 'Fellix', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-content-subtle);
}
```

**Usage guidelines**
- Users can only select one option tile at a time
- The tile itself is not a button — always include a separate CTA to confirm the selection
- One option should typically be preselected by default
- Never center text — always align left for titles and right for subtitles/values
- Always stack option tiles vertically
- Use collapsed when the title and value are enough — use expanded when descriptions help the user choose

---

## Rules — never break these

1. Never use primitive tokens directly in components — always use semantic tokens
2. Never use hardcoded color, font or spacing values — always use CSS custom properties
3. Always use Fellix for body, H3, H4, labels and buttons
4. Always use OK family for H1 and H2
5. Never use any other font
6. Never write in ALL CAPS
7. Interactive states use overlay tokens — never hardcoded hover colors
8. Always refer to OK-BRAND.md for correct product name spelling and tone of voice
