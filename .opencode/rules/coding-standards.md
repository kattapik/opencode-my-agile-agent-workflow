# Global Coding Standards

These rules apply to all code regardless of language or framework.

## Core Principles

### 1. Readability First

Code is read more than written. Optimize for the reader.

```typescript
// ❌ Clever but unclear
const result = arr.filter(Boolean).map(x => +x * 2);

// ✅ Clear and readable
const result = arr
  .filter(item => item !== null && item !== undefined)
  .map(item => Number(item) * 2);
```

### 2. Single Responsibility

Each function/component should do one thing well.

```typescript
// ❌ Does too much
function processOrder(order) {
  validateOrder(order);
  calculateTotal(order);
  chargePayment(order);
  sendEmail(order);
}

// ✅ Single responsibility
function processOrder(order: Order): ProcessResult {
  // Orchestration only
  return pipe(validate, calculate, charge, notify)(order);
}
```

### 3. Explicit Over Implicit

Be clear about what code does.

```typescript
// ❌ Implicit behavior
function save(data) {
  localStorage.setItem('data', JSON.stringify(data));
}

// ✅ Explicit behavior
function saveToLocalStorage(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data));
}
```

### 4. Fail Fast and Loud

Errors should be obvious, not silent.

```typescript
// ❌ Silent failure
function getConfig(key) {
  return config[key];
}

// ✅ Fail loud
function getConfig(key: keyof Config): ConfigValue {
  const value = config[key];
  if (value === undefined) {
    throw new Error(`Missing config: ${key}`);
  }
  return value;
}
```

### 5. Consistency

Follow the same patterns throughout the codebase.

```typescript
// Pick a style and stick with it
// ✅ Consistent naming
const userCount = users.length;
const itemCount = items.length;
const orderCount = orders.length;

// ❌ Inconsistent naming
const userCount = users.length;
const numItems = items.length;
const ordersLength = orders.length;
```

## Naming Conventions

### Variables

- Use descriptive names: `userCount` not `n`
- Boolean names should read naturally: `isActive`, `hasPermission`
- Avoid negatives: `isDisabled` not `isNotEnabled`

### Functions

- Functions should describe actions: `getUser()`, `calculateTotal()`
- Boolean functions should be questions: `isValid()`, `canEdit()`
- Event handlers describe what happens: `handleSubmit()`, `handleClick()`

### Classes/Types

- Use PascalCase: `UserService`, `OrderStatus`
- Nouns, not verbs: `User` not `CreateUser`

### Constants

- SCREAMING_SNAKE_CASE for true constants: `MAX_RETRIES`, `API_BASE_URL`
- camelCase for configuration objects: `defaultConfig`, `themeSettings`

## File Organization

### Import Order

```typescript
// 1. External dependencies
import { useState } from 'react';
import { z } from 'zod';

// 2. Internal modules (using aliases)
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';

// 3. Relative imports
import { helper } from './utils';

// 4. Types
import type { User } from '@/types';
```

### Export Order

```typescript
// 1. Types
export type { User, UserCreateInput };

// 2. Constants
export const MAX_USERS = 100;

// 3. Functions/Classes
export function createUser() {}
export class UserService {}
```

## Error Handling

### Use Specific Errors

```typescript
// ❌ Generic
throw new Error('Something went wrong');

// ✅ Specific
throw new ValidationError('Email is invalid', { field: 'email' });
```

### Handle at Boundaries

```typescript
// ❌ Silent catch
try {
  doSomething();
} catch (e) {}

// ✅ Proper handling
try {
  doSomething();
} catch (error) {
  logger.error('Operation failed', { error });
  throw new ServiceError('Operation failed', { cause: error });
}
```

## Comments

### When to Comment

- Explain WHY, not WHAT
- Document complex algorithms
- Add TODOs with context and issue links
- Document public APIs

### When NOT to Comment

- Don't explain obvious code
- Don't leave commented-out code
- Don't write comments that can become outdated

## Testing Standards

### Test Names

```typescript
// ❌ Vague
test('user', () => {});

// ✅ Descriptive
test('should create user with valid email', () => {});
```

### Test Structure

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {
      // Arrange
      const input = { email: 'test@example.com' };
      
      // Act
      const result = userService.createUser(input);
      
      // Assert
      expect(result.email).toBe(input.email);
    });
  });
});
```

## Git Conventions

### Commit Messages

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Branch Names

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code improvements
- `docs/description` - Documentation

---

**These standards ensure code quality and maintainability.**
