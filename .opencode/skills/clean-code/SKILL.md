---
name: clean-code
description: Global coding standards and best practices. All agents should follow these principles.
version: 1.0.0
---

# Clean Code - Global Standards

Universal coding principles that apply across all domains and languages.

## The 5 Laws of Elegant Code

### 1. Guard Clauses First

Handle unhappy paths at the beginning of functions. Return early.

```typescript
// ❌ Nested conditionals
function process(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        return doSomething(user);
      }
    }
  }
  return null;
}

// ✅ Guard clauses
function process(user) {
  if (!user) return null;
  if (!user.isActive) return null;
  if (!user.hasPermission) return null;
  
  return doSomething(user);
}
```

### 2. Parsed State at Boundaries

Validate and transform input at the edge. Trust inside.

```typescript
// ❌ Checking everywhere
function updateEmail(email) {
  if (!isValidEmail(email)) throw new Error('Invalid');
  // ... logic
}

function saveUser(user) {
  if (!isValidEmail(user.email)) throw new Error('Invalid');
  // ... logic
}

// ✅ Parse once, trust everywhere
type Email = string & { readonly __brand: unique symbol };

function parseEmail(input: string): Email | Error {
  if (!emailRegex.test(input)) {
    return new Error('Invalid email');
  }
  return input as Email;
}

// Now Email is guaranteed valid
function updateEmail(email: Email) {
  // No validation needed - Email type guarantees validity
}
```

### 3. Pure Functions

Functions should be predictable. Same input → same output. No side effects.

```typescript
// ❌ Impure - depends on external state
let total = 0;
function addToTotal(amount) {
  total += amount;
  return total;
}

// ✅ Pure - predictable
function addToTotal(currentTotal: number, amount: number): number {
  return currentTotal + amount;
}
```

### 4. Fail Loud

Invalid states should throw errors, not silently continue.

```typescript
// ❌ Silent failure
function getConfig(key) {
  return config[key] || null; // Hides the problem
}

// ✅ Fail loud
function getConfig(key: keyof Config): ConfigValue {
  const value = config[key];
  if (value === undefined) {
    throw new Error(`Missing required config: ${key}`);
  }
  return value;
}
```

### 5. Readability First

Code reads like a sentence. Names are documentation.

```typescript
// ❌ Unclear
const d = new Date();
const x = users.filter(u => u.a).map(u => u.n);

// ✅ Readable
const now = new Date();
const activeUserNames = users
  .filter(user => user.isActive)
  .map(user => user.name);
```

## Naming Conventions

### Variables

```typescript
// Use descriptive names
const users = [...]; // Good
const userList = [...]; // Redundant
const data = [...]; // Too vague

// Boolean names should read naturally
const isActive = true;
const hasPermission = false;
const canEdit = true;

// Avoid negatives in names
const isNotActive = false; // Confusing: !isNotActive
const isDisabled = false; // Better: !isDisabled
```

### Functions

```typescript
// Functions should describe actions
function getUser() { } // Good
function userData() { } // Is it a getter or setter?

// Boolean functions should be questions
function isValid() { } // Good
function validate() { } // Sounds like it throws

// Event handlers should describe what happens
function handleSubmit() { } // Good
function onClick() { } // Too generic
```

### Classes

```typescript
// Classes should be nouns
class User { } // Good
class UserManager { } // Good
class CreateUser { } // Sounds like a function
```

## Function Guidelines

### Single Responsibility

```typescript
// ❌ Does too many things
function processOrder(order) {
  validateOrder(order);
  calculateTotal(order);
  chargePayment(order);
  sendConfirmation(order);
  updateInventory(order);
}

// ✅ One thing, well
function processOrder(order: Order): ProcessResult {
  return pipe(
    validateOrder,
    calculateTotal,
    chargePayment,
    sendConfirmation,
    updateInventory
  )(order);
}
```

### Small Functions

```typescript
// ❌ 100+ line function
function doEverything() {
  // 100 lines of code
}

// ✅ Small, focused functions
function validateInput(input: Input): ValidationResult {
  // 5-10 lines
}

function processData(data: Data): ProcessedData {
  // 5-10 lines
}
```

### Avoid Side Effects

```typescript
// ❌ Modifies input
function addItem(cart, item) {
  cart.items.push(item);
  return cart;
}

// ✅ Returns new value
function addItem(cart: Cart, item: Item): Cart {
  return {
    ...cart,
    items: [...cart.items, item]
  };
}
```

## Code Organization

### File Structure

```
src/
├── components/     # UI components
├── hooks/          # Custom hooks
├── services/       # Business logic
├── utils/          # Pure utilities
├── types/          # TypeScript types
└── constants/      # Constants
```

### Import Order

```typescript
// 1. External dependencies
import { useState, useEffect } from 'react';
import { z } from 'zod';

// 2. Internal modules
import { UserService } from '@/services/user';
import { Button } from '@/components/ui';

// 3. Types
import type { User } from '@/types';

// 4. Constants
import { MAX_RETRIES } from './constants';
```

## Comments

### When to Comment

```typescript
// ✅ Explain WHY, not WHAT
// Using exponential backoff to avoid overwhelming the server
const delay = Math.pow(2, retryCount) * 1000;

// ✅ Document complex algorithms
// Using Fisher-Yates shuffle for unbiased randomization
function shuffle(array) { ... }

// ✅ Add TODOs with context
// TODO(#123): Remove after migrating to new API
```

### When NOT to Comment

```typescript
// ❌ Explains the obvious
// Loop through users
for (const user of users) { }

// ❌ Outdated comment
// This function does X (but it actually does Y now)

// ❌ Commented-out code
// function oldFunction() { ... }
```

## Error Handling

### Use Specific Errors

```typescript
// ❌ Generic error
throw new Error('Something went wrong');

// ✅ Specific error
throw new ValidationError('Email is invalid', { field: 'email' });
```

### Handle Errors at Boundaries

```typescript
// ❌ Silent catch
try {
  doSomething();
} catch (e) {
  // Do nothing
}

// ✅ Log and handle
try {
  doSomething();
} catch (error) {
  logger.error('Failed to do something', { error });
  throw new ServiceError('Operation failed', { cause: error });
}
```

## Testing Principles

### Test Behavior, Not Implementation

```typescript
// ❌ Tests implementation
expect(component.state.count).toBe(1);

// ✅ Tests behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### Use Descriptive Test Names

```typescript
// ❌ Vague
test('user', () => { ... });

// ✅ Descriptive
test('should create user with valid email', () => { ... });
```

---

**These principles apply to all code, regardless of language or domain.**
