# AGENTS.md - [Project Name]

> **Instructions for AI agents working on this project**
> 
> This file defines _how_ to build. For _what_ to build, see feature requirements.

---

##  Project Stack

<!-- CUSTOMIZE THIS SECTION -->

- **Framework:** [e.g., React, Vue, Next.js, NestJS, Express]
- **Language:** [e.g., TypeScript, JavaScript, Python, Go]
- **State Management:** [e.g., Redux, Pinia, Zustand, None]
- **Routing:** [e.g., React Router, Vue Router, Next Router]
- **HTTP Client:** [e.g., Axios, Fetch, SWR]
- **Build Tool:** [e.g., Vite, Webpack, esbuild]
- **Testing:** [e.g., Jest, Vitest, Mocha]
- **Styling:** [e.g., Tailwind, CSS Modules, Styled Components]

---

##  Core Documentation (CRITICAL)

Before making architectural or styling decisions, **review** these documents:

| Document | Purpose | Location |
|----------|---------|----------|
| API Standards | API response structure, error handling | `docs/api-standards.md` |
| UI Standards | Styling rules, component patterns | `docs/ui-standards.md` |
| Code Style | Linting, formatting rules | `.eslintrc.js`, `.prettierrc` |
| Architecture | System design, data flow | `docs/architecture.md` |
| Database | Schema, relationships | `docs/database.md` |

---

##  Code Conventions

### File Naming

<!-- CUSTOMIZE THESE PATTERNS -->

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

<!-- CUSTOMIZE THESE RULES -->

- **Indentation:** [2 spaces / 4 spaces / tabs]
- **Quotes:** [single / double]
- **Semicolons:** [required / none]
- **Line Width:** [80 / 100 / 120]
- **Trailing Commas:** [always / none / es5]

### TypeScript/JavaScript

```typescript
// ✅ GOOD: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return api.get(`/users/${id}`);
}

// ❌ BAD: Any type
function getUser(id: any): any {
  return api.get(`/users/${id}`);
}
```

### Error Handling

```typescript
// ✅ GOOD: Unknown error with proper casting
try {
  await saveUser(user);
} catch (err: unknown) {
  const e = err as { response?: { data?: { message?: string } } };
  error.value = e.response?.data?.message ?? 'Operation failed';
}

// ❌ BAD: Any error
try {
  await saveUser(user);
} catch (err: any) {
  error.value = err.message;
}
```

---

##  Project-Specific Rules

<!-- ADD YOUR CUSTOM RULES HERE -->

### Rule 1: [Rule Name]

Description of the rule and why it exists.

```typescript
// ✅ GOOD: Example
// ❌ BAD: Anti-example
```

### Rule 2: [Rule Name]

Description...

---

##  Architecture Patterns

### State Management

<!-- CUSTOMIZE FOR YOUR STATE SOLUTION -->

```typescript
// ✅ Store pattern example
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!user.value);

  // Actions
  async function login(credentials: LoginDto): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      user.value = await authApi.login(credentials);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      error.value = e.response?.data?.message ?? 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { user, loading, error, isAuthenticated, login };
});
```

### API Layer

```typescript
// ✅ API calls separated from components
// src/api/user.api.ts
import api from './axios';

export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: CreateUserDto) => api.post<User>('/users', data),
  update: (id: string, data: UpdateUserDto) => api.put<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};
```

### Component Structure

```typescript
// ✅ Component with clear structure
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '@/types';

// Props
interface Props {
  user: User;
  readonly?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  readonly: false,
});

// Emits
interface Emits {
  (e: 'update', user: User): void;
  (e: 'delete', id: string): void;
}
const emit = defineEmits<Emits>();

// State
const isEditing = ref(false);

// Computed
const displayName = computed(() => 
  props.user.name || 'Anonymous'
);

// Methods
function handleUpdate() {
  emit('update', props.user);
  isEditing.value = false;
}
</script>

<template>
  <div class="user-card">
    <!-- Template here -->
  </div>
</template>

<style scoped>
/* Styles here */
</style>
```

---

##  Testing Standards

### Unit Tests

```typescript
// ✅ Test structure
describe('useAuthStore', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should login successfully', async () => {
    // Arrange
    const credentials = { email: 'test@example.com', password: 'password' };
    
    // Act
    await authStore.login(credentials);
    
    // Assert
    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.user).toBeDefined();
  });

  it('should handle login error', async () => {
    // Test error case
  });
});
```

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
