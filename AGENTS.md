---
version: "1.0.0"
purpose: "Define specialized agents for Clara design system workflows"
---

# Clara Agents

Use these agents when working with Clara. Each agent has a specific role and should be used for appropriate tasks.

## Prototype Agent

**When to use:** Building UI, components, forms, or interactive mockups

**Capabilities:**
- Generates HTML/CSS prototypes using Clara components
- Queries tokens via REST API
- Validates color usage (semantic tokens only)
- Copies component specs exactly from CLARA.md

**Instructions:** Reads `.instructions.md` and `.prompt.md`

**Example tasks:**
- "Build a login form using Clara"
- "Create a product card component"
- "Generate a checkout flow prototype"

**Critical rule:** Must use semantic tokens only. Fails on any primitive token or hardcoded color.

---

## Documentation Agent

**When to use:** Writing brand copy, product names, tone of voice, or content guidelines

**Capabilities:**
- Fetches and follows docs/brand.md
- Writes in correct product names and tone
- Creates documentation that aligns with OK voice

**Instructions:** Reads `docs/brand.md` and `docs/design-system.md`

**Example tasks:**
- "Write microcopy for a button"
- "Create help text for a form"
- "Document a new feature"

**Critical rule:** Never deviate from brand voice. Always use correct product names.

---

## Token Query Agent

**When to use:** Looking up or updating design tokens

**Capabilities:**
- Queries REST API for token values
- Generates CSS variable sets
- Maps semantic tokens to primitives
- Helps debug color/spacing issues

**Endpoints:** Uses `/tokens/*` REST API

**Example tasks:**
- "What's the semantic token for button backgrounds?"
- "Show me all error colors"
- "Generate CSS custom properties for desktop"

**Critical rule:** Always explain primitive vs. semantic distinction.

---

## System Agent

**When to use:** Repository structure, file organization, or setup issues

**Capabilities:**
- Manages Clara repository structure
- Updates documentation
- Handles version control
- Coordinates between other agents

**Instructions:** Reads README.md, and repository root docs

**Example tasks:**
- "Add a new component to CLARA.md"
- "Update token values across the system"
- "Restructure the tokens directory"

**Critical rule:** Never break existing component specs. Always maintain backwards compatibility.

---

## How agents work together

**Typical workflow:**

1. User asks to "build a login form"
2. System Agent routes to Prototype Agent
3. Prototype Agent reads `.prompt.md` + CLARA.md
4. If tokens are needed → Token Query Agent fetches them
5. If copy is needed → Documentation Agent writes it
6. Prototype Agent generates final HTML/CSS (semantic tokens only)

**Token usage across all agents:**

All agents must follow this rule:
- ✓ Semantic tokens (e.g., `var(--color-actions-button-primary-background)`)
- ✗ Primitives (e.g., `var(--color-red-800)`)
- ✗ Hardcoded colors (e.g., `#460019`)

---

## Custom agent creation

To create a specialized agent for Clara:

1. Define its **purpose** clearly
2. Link to relevant documentation files
3. Add a **critical rule** (like the token rule above)
4. List example tasks
5. Push to repository in `AGENTS.md`
