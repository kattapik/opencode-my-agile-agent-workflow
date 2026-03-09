---
name: code-philosophy
description: Internal logic and data flow philosophy (The 5 Laws of Elegant Defense). Understand deeply to ensure code guides data naturally and prevents errors. Use when writing, reviewing, or refactoring code.
---

# Code Philosophy: The 5 Laws of Elegant Defense

Internal logic and data flow philosophy that ensures code guides data naturally and prevents errors before they happen.

## Philosophy Overview

> **Code is written once but read many times.**
> 
> Every line must justify its existence in terms of **clarity**, **correctness**, and **performance**.

These 5 laws form the foundation of defensive programming that produces maintainable, robust, and readable code.

---

## Law 1: Guard Clauses — Handle Unhappy Path First

### The Problem

Traditional nested conditionals bury the happy path deep inside multiple levels of indentation, making code hard to read and maintain.

### The Solution

Reject invalid states at the **top** of every function with early returns. The happy path should be the last thing you see, not buried in an `else` branch.

### Examples

```typescript
// ❌ BAD — deeply nested, hard to follow
function process(data: Data | null) {
  if (data) {
    if (data.items.length > 0) {
      if (data.isValid) {
        // ... actual logic deep inside
        return transform(data);
      }
    }
  }
  return null;
}

// ✅ GOOD — guard at the top, logic flows clearly
function process(data: Data | null) {
  if (!data) return null;
  if (data.items.length === 0) return null;
  if (!data.isValid) return null;
  
  // ... actual logic at the top level
  return transform(data);
}
```

### Benefits

- **Readability**: Main logic at top level, not nested
- **Early Exit**: Fail fast, no deep nesting
- **Clear Intent**: Each guard shows what we're checking

### Checklist

- [ ] Are all edge cases (null, empty, unauthorized) handled at the top?
- [ ] Is the happy path visible without scrolling?
- [ ] Can I understand the function's purpose from the guards?

---

## Law 2: Parsed State — Trust Your Types at the Boundary

### The Problem

Untrusted data (API responses, route params, user input) used directly throughout the codebase leads to scattered defensive checks and type uncertainty.

### The Solution

Validate and parse untrusted data **at the entry point**. Once inside the system, types should be trusted — no defensive `typeof` checks scattered throughout.

### Examples

```typescript
// ❌ BAD — raw API data used directly everywhere
const id = route.params.id; // string | string[]
const user = await api.get(`/users/${id}`); // any
// ... later in the code
if (typeof user.name === 'string') { // defensive check
  displayName.value = user.name;
}

// ✅ GOOD — parse at the boundary, use confidently
const id = String(route.params.id); // parsed to string

interface User {
  id: string;
  name: string;
  email: string;
}

const user = await api.get<User>(`/users/${id}`); // typed
// ... later in the code
displayName.value = user.name; // confident, no check needed
```

### With Validation Libraries

```typescript
import { z } from 'zod';

// Define schema at the boundary
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(150).optional(),
});

// Parse and validate at entry point
function handleApiResponse(data: unknown): User {
  return UserSchema.parse(data); // throws on invalid
}

// Now use confidently everywhere
const user = handleApiResponse(rawData);
console.log(user.name); // type-safe, no checks needed
```

### Benefits

- **Trust**: Once parsed, types are reliable
- **Clarity**: No scattered `typeof` checks
- **Safety**: Validation happens once, at the boundary

### Checklist

- [ ] Is all external data (API, router, events) parsed before use?
- [ ] Are there defensive type checks that could be removed?
- [ ] Do types accurately represent what the code expects?

---

## Law 3: Purity — Functions Should Be Predictable

### The Problem

Functions that mutate external state or have hidden side effects are hard to test, debug, and reuse. You can't predict the output from the input alone.

### The Solution

A function that **only computes from its inputs and returns a result** — with no hidden mutations — is easy to test, debug, and reuse.

### Examples

```typescript
// ❌ BAD — mutates external state as a side effect
function applyDiscount(cart: Cart) {
  cart.total = cart.total * 0.9; // hidden mutation
  cart.items.forEach(item => {
    item.discounted = true; // another mutation
  });
}

// Usage
applyDiscount(myCart);
// What happened? We don't know from the call.
// Cart is mutated somewhere else.

// ✅ GOOD — returns a new value, no side effects
function applyDiscount(total: number): number {
  return total * 0.9;
}

function applyDiscountToCart(cart: Cart): Cart {
  return {
    ...cart,
    total: applyDiscount(cart.total),
    items: cart.items.map(item => ({ ...item, discounted: true })),
  };
}

// Usage
const discountedCart = applyDiscountToCart(myCart);
// Clear: we get a new cart, original unchanged
```

### When Mutations Are OK

Mutations are acceptable in **controlled, explicit** contexts:

```typescript
// ✅ OK — mutation inside Pinia action (controlled)
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  
  function addItem(item: CartItem) {
    items.value.push(item); // mutation in action
  }
  
  return { items, addItem };
});

// ✅ OK — mutation in local state (contained)
function setup() {
  const count = ref(0);
  
  function increment() {
    count.value++; // local mutation
  }
  
  return { count, increment };
}
```

### Benefits

- **Testability**: Pure functions are trivial to test
- **Predictability**: Same input → same output, always
- **Reusability**: No hidden dependencies

### Checklist

- [ ] Do functions avoid mutating props, external refs, or store state?
- [ ] Can I predict the output from the input alone?
- [ ] Are side effects explicit and controlled?

---

## Law 4: Fail Loud — Invalid States Must Scream

### The Problem

Silent failures cause mysterious bugs. When an invalid state is reached, the code continues with undefined or null values, leading to crashes later with useless stack traces.

### The Solution

When an invalid state is reached, **throw a clear descriptive error immediately**. Don't let bad data silently propagate.

### Examples

```typescript
// ❌ BAD — silent failure, undefined propagates
const user = store.users.find(u => u.id === id);
doSomethingWith(user); // might crash later with useless stack trace

// ✅ GOOD — fails immediately with context
const user = store.users.find(u => u.id === id);
if (!user) {
  throw new Error(`User with id "${id}" not found in store`);
}
doSomethingWith(user); // safe, user exists
```

### With Error Boundaries

```typescript
// Component level
<template>
  <ErrorBoundary>
    <UserProfile :userId="userId" />
  </ErrorBoundary>
</template>

// Store level
async function fetchUser(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  
  if (!response.data) {
    throw new Error(`User ${id} not found (API returned empty)`);
  }
  
  return response.data;
}

// API level
api.interceptors.response.use(
  response => response,
  error => {
    // Transform API errors to descriptive messages
    const message = error.response?.data?.message 
      || error.message 
      || 'Unknown API error';
    
    throw new Error(`API Error: ${message}`);
  }
);
```

### Benefits

- **Fast Feedback**: Know immediately when something is wrong
- **Clear Context**: Error message explains what failed and why
- **Easy Debugging**: Stack trace points to the real problem

### Checklist

- [ ] Do impossible/unexpected states throw descriptive errors?
- [ ] Are errors silent or do they provide context?
- [ ] Will debugging be easy if this fails in production?

---

## Law 5: Readability — Code Reads Like a Sentence

### The Problem

Cryptic variable names, magic numbers, and complex logic make code hard to understand without extensive comments.

### The Solution

Variable names explain intent. Functions do one thing with one responsibility. A reader should understand what the code does **without comments**.

### Examples

```typescript
// ❌ BAD — what is 'x'? what is 86400000?
const x = Date.now() - ts > 86400000;
if (x) {
  // deactivate user
}

// ✅ GOOD — reads like a sentence
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const lastActivityAt = user.lastActivityAt;
const isExpired = Date.now() - lastActivityAt > ONE_DAY_MS;

if (isExpired) {
  deactivateUser(user);
}
```

### Naming Patterns

```typescript
// ❌ BAD — unclear names
const d = getData();
const p = process(d);
const r = save(p);

// ✅ GOOD — descriptive names
const userData = fetchUserData();
const processedUser = processUserData(userData);
const savedUser = saveUserToDatabase(processedUser);

// ❌ BAD — abbreviated
const usr = getUser();
const addr = usr.addr;

// ✅ GOOD — full words
const user = getUser();
const address = user.address;
```

### Function Naming

```typescript
// ❌ BAD — vague
function process(data) { ... }
function handle(event) { ... }
function doIt() { ... }

// ✅ GOOD — specific
function validateUserCredentials(credentials) { ... }
function handleUserRegistration(event) { ... }
function sendWelcomeEmail() { ... }
```

### Benefits

- **Self-Documenting**: Code explains itself
- **Easy Review**: Reviewers understand quickly
- **Maintainable**: Future developers can modify safely

### Checklist

- [ ] Can a teammate understand each function's purpose from its name?
- [ ] Are variable names self-documenting?
- [ ] Does the code flow logically without needing comments?

---

## Putting It All Together

### Example: User Authentication

```typescript
// ❌ BAD — violates all 5 laws
function login(data) {
  if (data) {
    if (data.email && data.password) {
      const user = users.find(u => u.email === data.email);
      if (user) {
        if (user.password === data.password) {
          currentUser = user;
          return true;
        }
      }
    }
  }
  return false;
}

// ✅ GOOD — follows all 5 laws
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  passwordHash: string;
}

function login(credentials: LoginCredentials): User {
  // Law 1: Guard clauses
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required');
  }
  
  // Law 2: Parsed state (credentials already typed)
  const user = findUserByEmail(credentials.email);
  
  // Law 4: Fail loud
  if (!user) {
    throw new Error(`User not found: ${credentials.email}`);
  }
  
  const isValidPassword = verifyPassword(
    credentials.password,
    user.passwordHash
  );
  
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  
  // Law 3: Purity (returns user, doesn't mutate global)
  return user;
}

// Law 5: Readability (clear names, reads like sentence)
function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
```

---

## Anti-Patterns Summary

| Anti-Pattern | Violates | Solution |
|-------------|----------|----------|
| Deeply nested conditionals | Law 1 | Guard clauses at top |
| Scattered type checks | Law 2 | Parse at boundary |
| Mutating props/state | Law 3 | Return new values |
| Silent failures | Law 4 | Throw descriptive errors |
| Cryptic names/numbers | Law 5 | Self-documenting code |

---

## Review Checklist

When reviewing code, check each law:

```markdown
## Code Philosophy Review

### Law 1: Guard Clauses
- [ ] Edge cases handled at top?
- [ ] Happy path visible?
- [ ] No deep nesting?

### Law 2: Parsed State
- [ ] External data parsed at entry?
- [ ] Types trusted inside?
- [ ] No scattered checks?

### Law 3: Purity
- [ ] No prop mutations?
- [ ] No hidden side effects?
- [ ] Functions predictable?

### Law 4: Fail Loud
- [ ] Invalid states throw?
- [ ] Errors descriptive?
- [ ] Debugging easy?

### Law 5: Readability
- [ ] Names self-documenting?
- [ ] Logic flows clearly?
- [ ] No magic numbers?
```

---

## Remember

**These laws are not rules — they are principles.**

Use them to guide your thinking:
- **When writing**: Follow them to write better code
- **When reviewing**: Use them to identify issues
- **When refactoring**: Apply them to improve existing code

**The goal is code that is clear, correct, and performant.**

These laws help you achieve that goal consistently.
