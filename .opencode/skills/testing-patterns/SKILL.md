---
name: testing-patterns
description: Testing strategies, patterns, and best practices for unit, integration, and E2E tests.
version: 1.0.0
---

# Testing Patterns

Comprehensive testing strategies and best practices.

## Testing Pyramid

```
        /\
       /E2E\      Few, slow, critical paths
      /------\    
     /  API   \   Some, integration tests
    /----------\
   /   Unit     \  Many, fast, isolated
  /--------------\
```

## Unit Testing

### AAA Pattern

```typescript
describe('calculateTotal', () => {
  it('should sum item prices', () => {
    // Arrange
    const items = [{ price: 10 }, { price: 20 }];
    
    // Act
    const result = calculateTotal(items);
    
    // Assert
    expect(result).toBe(30);
  });
});
```

### Test Edge Cases

```typescript
describe('calculateTotal', () => {
  it('should handle empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
  
  it('should handle null', () => {
    expect(calculateTotal(null)).toBe(0);
  });
  
  it('should handle negative prices', () => {
    expect(calculateTotal([{ price: -5 }])).toBe(-5);
  });
});
```

### Mocking

```typescript
// Mock external dependency
jest.mock('./api');
api.fetchUser.mockResolvedValue({ id: 1, name: 'Test' });

// Mock function
const mockCallback = jest.fn();
mockCallback.mockReturnValue(true);
mockCallback.mockImplementation(x => x * 2);
```

## Integration Testing

### API Testing

```typescript
describe('POST /api/users', () => {
  it('should create user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'test@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe('Test');
  });
  
  it('should reject invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test', email: 'invalid' });
    
    expect(response.status).toBe(400);
  });
});
```

### Database Testing

```typescript
describe('UserService', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });
  
  afterAll(async () => {
    await teardownTestDatabase();
  });
  
  beforeEach(async () => {
    await clearDatabase();
  });
  
  it('should create user', async () => {
    const user = await UserService.create({ name: 'Test' });
    expect(user.id).toBeDefined();
  });
});
```

## E2E Testing

### Page Object Model

```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/login');
  }
  
  async login(email: string, password: string) {
    await this.page.fill('[data-testid="email"]', email);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="login-btn"]');
  }
}

// tests/auth.spec.ts
test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  
  await expect(page).toHaveURL('/dashboard');
});
```

### Test Selectors

```typescript
// ❌ Brittle
await page.locator('.card > .title').click();

// ✅ Resilient
await page.locator('[data-testid="product-title"]').click();
```

## Test Organization

```
tests/
├── unit/
│   ├── utils/
│   │   └── calculate.test.ts
│   └── components/
│       └── Button.test.tsx
├── integration/
│   ├── api/
│   │   └── users.test.ts
│   └── services/
│       └── auth.test.ts
└── e2e/
    ├── auth.spec.ts
    └── checkout.spec.ts
```

## Coverage Guidelines

| Type | Target |
|------|--------|
| Statements | 80% |
| Branches | 75% |
| Functions | 85% |
| Lines | 80% |

## Best Practices

### Descriptive Names

```typescript
// ❌ Vague
test('user', () => {});

// ✅ Descriptive
test('should create user with valid email', () => {});
```

### One Concept Per Test

```typescript
// ❌ Multiple concepts
test('user operations', () => {
  // Test create
  // Test update
  // Test delete
});

// ✅ One concept
test('should create user', () => {});
test('should update user', () => {});
test('should delete user', () => {});
```

### Test Behavior, Not Implementation

```typescript
// ❌ Tests implementation
expect(component.state.count).toBe(1);

// ✅ Tests behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

## Anti-Patterns

### Testing Implementation

```
❌ Test that function calls internal helper
✅ Test the output/behavior
```

### Shared State

```
❌ Tests that depend on each other
✅ Each test is independent
```

### Overspecifying

```
❌ Assert every property
✅ Assert essential behavior
```

---

**Good tests enable confident refactoring.**
