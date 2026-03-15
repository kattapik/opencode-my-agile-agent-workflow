---
description: Explore options and clarify requirements before implementation. Use when requirements are unclear or you need to explore possibilities.
---

# /brainstorm Workflow

Explore options, clarify requirements, and discover the best approach.

## When to Use

- Requirements are vague or incomplete
- Multiple approaches are possible
- You need to understand the problem space
- Starting a new feature or project

## Workflow Steps

### Step 1: Understand the Request

```
Ask clarifying questions:
1. What problem are you trying to solve?
2. Who is this for?
3. What are the constraints?
4. What does success look like?
```

### Step 2: Explore Options

```
Generate multiple approaches:
- Option A: [description]
- Option B: [description]
- Option C: [description]

For each option, consider:
- Pros and cons
- Effort required
- Risks involved
```

### Step 3: Narrow Down

```
Apply constraints to filter options:
- Must-have requirements
- Timeline constraints
- Technical limitations
- Resource availability
```

### Step 4: Recommend

```
Based on analysis, recommend:
- Best approach
- Why it's recommended
- Trade-offs to accept
```

### Step 5: Validate

```
Confirm with user:
"Based on our discussion, I recommend [approach].
This will [benefit].
The trade-offs are [trade-offs].
Should we proceed with this approach?"
```

## Example

```
User: /brainstorm user authentication

Agent: I'll help you explore authentication options.

**Clarifying Questions:**
1. What type of users? (consumers, employees, both?)
2. What security level is required? (basic, MFA, enterprise?)
3. Any existing auth system to integrate?

User: Consumers, basic security, no existing system

Agent: **Options:**

**Option A: Email/Password**
- Pros: Simple, familiar to users
- Cons: Password management, security concerns
- Effort: Medium

**Option B: Social Login (Google, GitHub)**
- Pros: No password management, faster signup
- Cons: Dependency on providers, privacy concerns
- Effort: Low

**Option C: Magic Links**
- Pros: No passwords, secure
- Cons: Email deliverability, less familiar
- Effort: Medium

**Recommendation:** Option B (Social Login) with Option A as fallback.
This gives you the best UX with minimal security overhead.

Proceed with this approach?
```

---

**End with clear direction, not endless exploration.**
