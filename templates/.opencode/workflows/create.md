---
description: Create new features, components, or projects. Use when building something new.
---

# /create Workflow

Build new features, components, or entire projects with structured approach.

## When to Use

- Creating a new feature
- Building a new component
- Starting a new project
- Adding significant new functionality

## Workflow Steps

### Step 1: Gather Requirements

```
Understand what to create:
- What are you building?
- What are the requirements?
- Any design specifications?
- Technical constraints?
```

### Step 2: Plan the Approach

```
Break down the task:
1. What files need to be created?
2. What files need to be modified?
3. What dependencies are needed?
4. What's the order of operations?
```

### Step 3: Select Agent(s)

```
Based on the task, select appropriate agent(s):
- Frontend work → frontend-specialist
- Backend work → backend-specialist
- Database work → database-architect
- Multiple domains → orchestrator for coordination
```

### Step 4: Implement

```
Execute the plan:
1. Create/modify files
2. Follow project conventions
3. Add appropriate error handling
4. Include necessary tests
```

### Step 5: Verify

```
Quality checks:
- [ ] Code compiles/builds
- [ ] Linting passes
- [ ] Tests pass
- [ ] Feature works as expected
```

### Step 6: Document

```
Document what was created:
- Summary of changes
- How to use the new feature
- Any important notes
```

## Example

```
User: /create user profile page

Agent: I'll help you create a user profile page.

**Requirements Check:**
- Display user info: name, email, avatar
- Allow editing profile
- Show activity history
- Responsive design

**Plan:**
1. Create ProfilePage component
2. Create ProfileForm component
3. Create ActivityList component
4. Add API endpoints
5. Add tests

**Agents:** frontend-specialist + backend-specialist

Proceed with this plan?

User: Yes

Agent: [Implementation proceeds...]
```

---

**Create with purpose, verify with care.**
