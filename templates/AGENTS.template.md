# AGENTS.md - [Project Name]

> Instructions for AI agents working on this project.
>
> How to build lives here; what to build comes from feature specs.

---

## Project Stack

<!-- CUSTOMIZE THIS SECTION -->

- Framework: [e.g. React, Vue, Next.js, NestJS, Express]
- Language: [e.g. TypeScript, JavaScript, Python, Go]
- State Management: [e.g. Redux, Pinia, Zustand, None]
- Routing: [e.g. React Router, Vue Router, Next Router]
- HTTP Client: [e.g. Axios, Fetch, SWR]
- Build Tool: [e.g. Vite, Webpack, esbuild]
- Testing: [e.g. Jest, Vitest, Playwright]
- Styling: [e.g. Tailwind, CSS Modules, Styled Components]

---

## Core Documentation

Review these before making architectural or styling decisions:

| Document | Purpose | Location |
|----------|---------|----------|
| OpenCode README | Kit overview and flow | `.opencode/README.md` |
| OpenCode Architecture | Agent lifecycle and gates | `.opencode/ARCHITECTURE.md` |
| Agent prompts | Role-specific behavior | `.opencode/agents/*.md` |
| Commands | Custom slash commands | `.opencode/commands/*.md` |
| Rules | Shared coding standards | `.opencode/rules/*.md` |

---

## OpenCode Delivery Model

- Primary agent: `@feature-lead`
- First call: `@context-gatherer` maps the current project state before planning or proof.
- Other agents are subagents and are called with `@` awareness.
- Security-sensitive work: `@security-auditor` first, then `@penetration-tester` for redteam validation when needed.
- Compact context bundle:
  - `proposal.md`: why, value, scope
  - `goal.md`: target outcome, constraints, default choice
  - `spec.md`: contract, data flow, edge cases, risks
  - `task.md`: ordered checklist, dependencies, owners
  - `important.md`: facts, blockers, links, decisions
- Archive completed bundles in `.opencode/archive/<feature-slug>/`.
- Default first: choose a safe default when the downside is small.
- Ask only when scope, security, or architecture changes materially.
- Keep handoffs compact and explicit.

## Skill Design

- Keep each skill small, philosophy-first, and single-purpose.
- Put the trigger in the description field so agents can load it by intent.
- Prefer the smallest skill that answers the next decision.

---

## Code Conventions

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Components | `PascalCase.tsx` | `UserCard.tsx` |
| Pages | `PascalCasePage.tsx` | `LoginPage.tsx` |
| Stores | `camelCase.store.ts` | `auth.store.ts` |
| Hooks/Composables | `useCamelCase.ts` | `useAuth.ts` |
| Types | `camelCase.types.ts` | `user.types.ts` |
| Utils | `camelCase.utils.ts` | `date.utils.ts` |
| API | `camelCase.api.ts` | `auth.api.ts` |
| Tests | `*.test.ts` or `*.spec.ts` | `auth.test.ts` |

### Code Style

- Indentation: [2 spaces / 4 spaces / tabs]
- Quotes: [single / double]
- Semicolons: [required / none]
- Line Width: [80 / 100 / 120]
- Trailing Commas: [always / none / es5]

---

## Project-Specific Rules

<!-- ADD YOUR CUSTOM RULES HERE -->

- [Add the defaults, tradeoffs, and exceptions for this project]
- [Call out anything the agents should never do]

---

## Architecture Patterns

### State Management

<!-- CUSTOMIZE FOR YOUR STATE SOLUTION -->

- [Describe your store pattern]
- [Describe where state lives]
- [Describe how async work is handled]

### API Layer

- [Describe request and response patterns]
- [Describe how errors are normalized]
- [Describe versioning or contract rules]

### Component Structure

- [Describe component conventions]
- [Describe where logic belongs]
- [Describe how loading and error states appear]

---

## Testing Standards

- Unit tests: [what to test]
- Integration tests: [what to test]
- E2E tests: [critical flows]
- Quality gate: [coverage or manual verification target]

---

## Quick Reference

- Validate templates: `node bin/validate-templates.js`
- Sync templates: `node bin/sync-templates.js`
- Entry point: `@feature-lead`

### Test Coverage

- **Minimum:** 70% coverage
- **Target:** 80% coverage
- **Critical paths:** 100% coverage (auth, payments, etc.)

---

##  Git Workflow

### Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactor
- `docs`: Documentation
- `test`: Tests
- `chore`: Maintenance

**Example:**
```
feat(auth): add JWT refresh token support

- Implement refresh token rotation
- Add automatic token refresh on 401
- Store tokens in httpOnly cookies

Closes #123
```

### Branch Naming

```
<type>/<ticket>-<short-description>

Examples:
- feature/AUTH-123-jwt-refresh
- fix/PAY-456-payment-timeout
- refactor/CORE-789-state-management
```

---

##  Performance Guidelines

### Do's 

- Lazy load components and routes
- Memoize expensive computations
- Paginate large lists
- Use virtual scrolling for long lists
- Optimize images and assets
- Cache API responses when appropriate

### Don'ts 

- Render all items in large lists
- Call expensive functions in render
- Watch large objects unnecessarily
- Block the main thread
- Make unnecessary API calls
- Ignore bundle size warnings

---

##  Security Guidelines

### Authentication & Authorization

- Never store sensitive data in localStorage
- Use httpOnly cookies for tokens
- Implement CSRF protection
- Validate all user input
- Sanitize data before rendering
- Use parameterized queries

### Data Validation

```typescript
// ✅ Validate at boundaries
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  age: z.number().min(0).max(150).optional(),
});

function createUser(data: unknown): User {
  return UserSchema.parse(data); // Throws on invalid
}
```

---

##  Accessibility (a11y)

- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios
- Use ARIA labels when needed
- Test with screen readers

---

##  Key Reminders

<!-- ADD PROJECT-SPECIFIC REMINDERS -->

1. **[Reminder 1]** - Description
2. **[Reminder 2]** - Description
3. **[Reminder 3]** - Description

---

##  Quick Reference

### Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Lint check
npm run format       # Format code
npm run type-check   # TypeScript check
```

### Important Files

```
src/
├── components/      # Reusable components
├── pages/          # Page components
├── stores/         # State management
├── api/            # API calls
├── types/          # TypeScript types
├── utils/          # Utility functions
└── hooks/          # Custom hooks/composables
```

---

##  Questions?

When in doubt:
1. Check existing code for patterns
2. Read the relevant docs
3. Ask the team lead
4. Follow the principle of least surprise

---

**Keep this file updated as the project evolves.**
