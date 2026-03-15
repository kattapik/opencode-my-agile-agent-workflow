---
description: Multi-agent coordination for complex tasks. Use when a task requires multiple specialists.
---

# /orchestrate Workflow

Coordinate multiple agents for complex, multi-domain tasks.

## When to Use

- Tasks requiring multiple perspectives
- Full-stack features
- Comprehensive reviews
- Complex implementations

## Minimum Agent Requirement

> **Orchestration requires at least 2 different agents.**

## Workflow Steps

### Step 1: Task Analysis

```
Analyze the task:
1. What domains are involved?
2. What skills are needed?
3. What are the dependencies?
4. What's the complexity level?
```

### Step 2: Agent Selection

```
Select appropriate agents:
- Security → security-auditor
- Frontend → frontend-specialist
- Backend → backend-specialist
- Database → database-architect
- Testing → test-engineer
- DevOps → devops-engineer
```

### Step 3: Plan Execution

```
Order agents by dependencies:
1. Foundation agents (database, security)
2. Core agents (backend, frontend)
3. Polish agents (testing, performance)
```

### Step 4: Execute

```
Invoke agents with context:
1. Pass full context to each agent
2. Collect findings from each
3. Handle any conflicts
4. Ensure boundaries respected
```

### Step 5: Synthesize

```
Combine results:
1. Merge findings
2. Resolve conflicts
3. Create unified report
4. Provide recommendations
```

## Example

```
User: /orchestrate build secure user management

Agent: I'll coordinate multiple agents for this task.

**Task Analysis:**
- Domains: Auth, Frontend, Backend, Database, Security
- Complexity: High
- Dependencies: DB → API → UI

**Agents Selected:**
1. database-architect (schema)
2. backend-specialist (API)
3. frontend-specialist (UI)
4. security-auditor (review)
5. test-engineer (tests)

**Execution:**

[database-architect]
- Created user schema
- Added indexes
- Migration ready

[backend-specialist]
- Created auth endpoints
- Implemented JWT
- Added validation

[frontend-specialist]
- Created login/register forms
- Implemented auth state
- Added route guards

[security-auditor]
- Reviewed auth implementation
- Identified 2 issues
- Provided fixes

[test-engineer]
- Added unit tests
- Added integration tests
- Coverage: 85%

**Synthesis Report:**
- Files created: 12
- Files modified: 5
- Issues found: 2 (fixed)
- Tests added: 24

**Ready for review!**
```

---

**Orchestration multiplies capability through coordination.**
