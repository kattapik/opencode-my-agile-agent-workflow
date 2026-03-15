---
description: Improve existing code for better quality, performance, or maintainability.
---

# /enhance Workflow

Improve existing code without changing its behavior.

## When to Use

- Code works but could be better
- Refactoring for maintainability
- Performance optimization
- Adding error handling
- Improving code quality

## Workflow Steps

### Step 1: Analyze Current State

```
Understand what exists:
- What does this code do?
- What are the pain points?
- What improvements are needed?
```

### Step 2: Identify Improvements

```
Common improvements:
- Extract duplicated code
- Improve naming
- Add error handling
- Optimize performance
- Increase test coverage
- Improve type safety
```

### Step 3: Prioritize

```
Impact vs. Effort:
- High impact, low effort → Do first
- High impact, high effort → Plan carefully
- Low impact, low effort → Do if time permits
- Low impact, high effort → Skip
```

### Step 4: Implement

```
Small, incremental changes:
1. Make one improvement
2. Test thoroughly
3. Commit
4. Repeat
```

### Step 5: Verify

```
Ensure behavior unchanged:
- All existing tests pass
- New tests added for edge cases
- Manual testing complete
```

## Enhancement Categories

### Code Quality

```typescript
// Before
function calc(a, b, c) {
  if (a > 0) {
    if (b > 0) {
      return a + b + c;
    }
  }
  return 0;
}

// After
function calculateSum(base: number, addition: number, extra: number): number {
  if (base <= 0 || addition <= 0) {
    return 0;
  }
  return base + addition + extra;
}
```

### Error Handling

```typescript
// Before
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// After
async function getUser(id: string): Promise<User> {
  validateUserId(id);
  
  const response = await fetch(`/api/users/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new UserNotFoundError(id);
    }
    throw new ApiError(`Failed to fetch user: ${response.status}`);
  }
  
  return response.json();
}
```

### Performance

```typescript
// Before
function findUser(users: User[], name: string): User | undefined {
  return users.find(user => user.name === name);
}
const user = findUser(allUsers, 'John'); // O(n) per call

// After
class UserLookup {
  private byName: Map<string, User>;
  
  constructor(users: User[]) {
    this.byName = new Map(users.map(u => [u.name, u]));
  }
  
  findByName(name: string): User | undefined {
    return this.byName.get(name); // O(1)
  }
}
```

### Type Safety

```typescript
// Before
function process(data) {
  return data.items.map(i => i.value);
}

// After
interface Data {
  items: Array<{ value: number }>;
}

function process(data: Data): number[] {
  return data.items.map(i => i.value);
}
```

## Example

```
User: /enhance login function for better error handling

Agent: I'll enhance the login function.

**Current State:**
```typescript
async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return response.json();
}
```

**Issues:**
1. No input validation
2. No error handling
3. No type safety
4. No loading state
5. Hardcoded URL

**Improvements:**
1.  Add input validation
2.  Add error handling
3.  Add type safety
4.  Add loading state
5.  Extract URL to config

**Enhanced Version:**
```typescript
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

async function login(
  credentials: LoginCredentials
): Promise<LoginResult> {
  // Validation
  if (!isValidEmail(credentials.email)) {
    return { success: false, error: 'Invalid email' };
  }
  
  if (credentials.password.length < 8) {
    return { success: false, error: 'Password too short' };
  }
  
  try {
    const response = await fetch(API_CONFIG.loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      return { 
        success: false, 
        error: mapError(response.status) 
      };
    }
    
    const user = await response.json();
    return { success: true, user };
    
  } catch (error) {
    return { 
      success: false, 
      error: 'Network error' 
    };
  }
}
```

 Enhanced with:
- Input validation
- Error handling
- Type safety
- Configuration
- Proper error messages
```

---

**Enhance incrementally, verify constantly.**