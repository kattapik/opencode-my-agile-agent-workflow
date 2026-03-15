---
description: Run and generate tests for the codebase. Use when adding test coverage or running test suites.
---

# /test Workflow

Generate, run, and manage tests for your codebase.

## When to Use

- Running test suites
- Adding test coverage
- Fixing failing tests
- Setting up testing infrastructure

## Workflow Steps

### Step 1: Identify Test Scope

```
What to test:
- Specific files or functions?
- Full test suite?
- Integration tests?
- E2E tests?
```

### Step 2: Run Tests

```bash
# Unit tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# E2E tests
npm run test:e2e
```

### Step 3: Analyze Results

```
Review results:
- Which tests passed?
- Which tests failed?
- What's the coverage?
- Are there flaky tests?
```

### Step 4: Fix or Add Tests

```
For failing tests:
1. Identify the cause
2. Fix the code or test
3. Verify fix

For missing coverage:
1. Identify uncovered code
2. Write appropriate tests
3. Verify coverage improvement
```

## Test Types

### Unit Tests

```typescript
describe('calculateTotal', () => {
  it('should sum item prices', () => {
    const items = [{ price: 10 }, { price: 20 }];
    expect(calculateTotal(items)).toBe(30);
  });

  it('should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### Integration Tests

```typescript
describe('POST /api/users', () => {
  it('should create user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'test@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test');
  });
});
```

## Example

```
User: /test checkout flow

Agent: I'll help you test the checkout flow.

**Test Scope:**
- Unit tests for calculation functions
- Integration tests for API endpoints
- E2E test for full checkout flow

**Running Tests:**

[Unit Tests] calculateTotal
  ✅ should sum item prices
  ✅ should apply discounts
  ✅ should handle empty cart

[Unit Tests] validatePayment
  ✅ should validate card number
  ✅ should reject invalid cards

[Integration Tests] POST /api/checkout
  ✅ should process payment
  ❌ should send confirmation email

**Failed Test:**
- should send confirmation email
- Error: Email service not mocked
- Fix: Add mock for email service

**Coverage:**
- Statements: 82%
- Branches: 78%
- Functions: 85%
- Lines: 81%

**Next Steps:**
1. Fix failing email test
2. Add E2E test for full flow
3. Improve branch coverage
```

---

**Tests enable confident refactoring.**
