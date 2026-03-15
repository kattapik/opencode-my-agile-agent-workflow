---
name: parallel-agents
description: Multi-agent coordination patterns and best practices for parallel execution.
version: 1.0.0
---

# Parallel Agents

Patterns and best practices for coordinating multiple agents in parallel.

## When to Use Parallel Agents

###  Good Candidates

- Independent tasks (frontend + backend)
- Multiple file types (code + tests + docs)
- Multiple perspectives (security + performance)
- Large codebase analysis
- Comprehensive reviews

###  Poor Candidates

- Sequential dependencies (API → Frontend)
- Shared mutable state
- Conflicting file modifications
- Tasks requiring full context from previous step

## Parallel Execution Patterns

### Pattern 1: Domain Split

```
Task: "Build user management feature"

┌─────────────────────────────────────┐
│         Orchestrator                 │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌─────────────┐ ┌─────────────┐
│  Frontend   │ │   Backend   │
│ Specialist  │ │ Specialist  │
│             │ │             │
│ Components  │ │   APIs      │
│ Pages       │ │   Services  │
│ State       │ │   Database  │
└─────────────┘ └─────────────┘
```

### Pattern 2: Multi-Perspective Review

```
Task: "Review authentication system"

┌─────────────────────────────────────┐
│         Orchestrator                 │
└──────────────┬──────────────────────┘
               │
   ┌───────────┼───────────┐
   │           │           │
   ▼           ▼           ▼
┌───────┐ ┌───────┐ ┌───────┐
│Security│ │Backend│ │ Test  │
│Auditor │ │Special│ │Engine │
└───────┘ └───────┘ └───────┘
   │           │           │
   └───────────┼───────────┘
               ▼
         Synthesis Report
```

### Pattern 3: File Type Distribution

```
Task: "Implement feature with tests"

┌─────────────────────────────────────┐
│         Orchestrator                 │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌─────────────┐ ┌─────────────┐
│  Developer  │ │    Test     │
│  (Code)     │ │  Engineer   │
│             │ │  (Tests)    │
└─────────────┘ └─────────────┘
```

## Agent Groups

### Foundation Group

For establishing core infrastructure:

| Agent | Responsibility |
|-------|----------------|
| `database-architect` | Schema, migrations |
| `security-auditor` | Security baseline |
| `devops-engineer` | CI/CD setup |

### Core Development Group

For building features:

| Agent | Responsibility |
|-------|----------------|
| `frontend-specialist` | UI components |
| `backend-specialist` | APIs, services |
| `database-architect` | Data layer |

### Quality Group

For ensuring quality:

| Agent | Responsibility |
|-------|----------------|
| `test-engineer` | Test coverage |
| `security-auditor` | Security check |
| `performance-optimizer` | Performance audit |

### Documentation Group

For documentation:

| Agent | Responsibility |
|-------|----------------|
| `documentation-writer` | Docs |
| `api-designer` | API docs |
| `seo-specialist` | Meta, sitemap |

## Coordination Protocol

### Step 1: Task Decomposition

```markdown
Original: "Build user dashboard"

Decomposed:
1. [Frontend] Dashboard UI components
2. [Backend] Dashboard API endpoints
3. [Database] Dashboard data queries
4. [Test] Dashboard E2E tests
```

### Step 2: Agent Assignment

```markdown
Assignments:
- frontend-specialist → Dashboard components
- backend-specialist → API endpoints
- database-architect → Queries
- test-engineer → E2E tests
```

### Step 3: Dependency Analysis

```markdown
Dependencies:
- Backend API depends on Database queries
- Frontend depends on Backend API
- Tests depend on Frontend + Backend

Execution Order:
1. Database (independent)
2. Backend (depends on 1)
3. Frontend (depends on 2)
4. Tests (depends on 3)
```

### Step 4: Parallel Execution

```markdown
Wave 1: database-architect (parallel with nothing)
Wave 2: backend-specialist (after Wave 1)
Wave 3: frontend-specialist (parallel with Wave 2)
Wave 4: test-engineer (after Waves 2, 3)
```

## Context Sharing

### Shared Context Object

```typescript
interface SharedContext {
  // Original request
  userRequest: string;
  
  // Decisions made
  decisions: Decision[];
  
  // Work completed
  completedWork: WorkItem[];
  
  // Files created/modified
  files: FileInfo[];
  
  // Open questions
  openQuestions: Question[];
}
```

### Context Passing

```typescript
// Pass context to each agent
invokeAgent('frontend-specialist', {
  task: 'Build dashboard UI',
  context: sharedContext
});

invokeAgent('backend-specialist', {
  task: 'Build dashboard API',
  context: sharedContext
});
```

## Conflict Resolution

### File Conflicts

```
If multiple agents modify the same file:
1. Detect conflict
2. Merge changes if possible
3. Flag for human review if conflict
```

### API Contract Conflicts

```
If frontend and backend disagree on API:
1. Use API designer as mediator
2. Document contract
3. Both agents follow contract
```

## Synthesis Report

After parallel execution, synthesize results:

```markdown
## Orchestration Report

### Agents Invoked
| Agent | Status | Files Modified |
|-------|--------|----------------|
| frontend-specialist | ✅ Complete | 5 files |
| backend-specialist | ✅ Complete | 3 files |
| test-engineer | ✅ Complete | 2 files |

### Combined Findings
- [Finding from Agent 1]
- [Finding from Agent 2]
- [Finding from Agent 3]

### Integration Notes
- [How agents' work integrates]

### Recommendations
1. [Combined recommendation]
2. [Combined recommendation]

### Next Steps
- [ ] [Action item]
- [ ] [Action item]
```

---

**Parallel agents multiply productivity when tasks are independent.**
