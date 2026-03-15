---
name: api-patterns
description: REST and GraphQL API design patterns and best practices.
version: 1.0.0
---

# API Patterns

Best practices for designing REST and GraphQL APIs.

## REST API Design

### Resource Naming

```
✅ GOOD:
GET    /users                 # List users
GET    /users/{id}            # Get user
POST   /users                 # Create user
PUT    /users/{id}            # Replace user
PATCH  /users/{id}            # Update user
DELETE /users/{id}            # Delete user
GET    /users/{id}/orders     # Get user's orders

❌ BAD:
GET    /getUsers
POST   /createUser
GET    /user-orders/{userId}
```

### HTTP Status Codes

| Code | Use When |
|------|----------|
| 200 | Successful GET, PUT, PATCH |
| 201 | Resource created (POST) |
| 204 | Success with no content (DELETE) |
| 400 | Invalid request |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Resource not found |
| 409 | Conflict (duplicate) |
| 422 | Validation error |
| 429 | Rate limited |
| 500 | Server error |

### Response Envelope

```json
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "abc-123"
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

### Pagination

```json
// Cursor-based (preferred)
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTAwfQ==",
    "hasMore": true
  }
}

// Offset-based
{
  "data": [...],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalCount": 100
  }
}
```

## GraphQL Design

### Schema Structure

```graphql
type Query {
  user(id: ID!): User
  users(filter: UserFilter, pagination: PaginationInput): UserConnection!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
  updateUser(id: ID!, input: UpdateUserInput!): User!
}

type User {
  id: ID!
  name: String!
  email: String!
  orders: [Order!]!
}
```

### Best Practices

- Use meaningful names (camelCase for fields)
- Provide descriptions
- Use enums for fixed values
- Implement pagination for lists
- Use input types for mutations

## Authentication Patterns

### JWT Pattern

```typescript
// Access token: short-lived (15 min)
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });

// Refresh token: long-lived (7 days)
const refreshToken = crypto.randomBytes(64).toString('hex');

// Store: httpOnly cookie for refresh, memory for access
```

### API Key Pattern

```typescript
// Header-based
Authorization: Bearer sk_live_xxx

// Query param (less secure)
?api_key=sk_live_xxx
```

## Rate Limiting

```typescript
// Per-user limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  keyGenerator: (req) => req.user.id
});
```

---

**Consistent APIs enable great developer experience.**
