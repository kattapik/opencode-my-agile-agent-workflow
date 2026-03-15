# OpenCode Agent Kit

> **Multi-Agent Orchestration System for OpenCode**
> 
> Inspired by Antigravity Kit, adapted for OpenCode's native agent system

---

## What's Included

### 20 Specialist Agents

| Category | Agents |
|----------|--------|
| **Coordination** | orchestrator, project-planner, explorer-agent |
| **Development** | frontend-specialist, backend-specialist, mobile-developer, game-developer |
| **Data** | database-architect, api-designer |
| **Quality** | test-engineer, qa-automation-engineer, security-auditor, penetration-tester |
| **Operations** | devops-engineer, performance-optimizer, seo-specialist |
| **Product** | product-manager, product-owner, documentation-writer |
| **Maintenance** | debugger, code-archaeologist |

### Core Skills

- `clean-code` - Global coding standards
- `intelligent-routing` - Automatic agent detection
- `parallel-agents` - Multi-agent coordination
- `brainstorming` - Socratic discovery
- `plan-writing` - Task breakdown
- `testing-patterns` - Testing strategies
- `api-patterns` - API design
- `frontend-design` - UI/UX patterns
- `systematic-debugging` - Debug methodology

### 11 Workflows

| Command | Description |
|---------|-------------|
| `/brainstorm` | Explore options, clarify requirements |
| `/create` | Build new features |
| `/debug` | Fix bugs systematically |
| `/deploy` | Deploy to production |
| `/orchestrate` | Multi-agent coordination |
| `/plan` | Create task breakdowns |
| `/preview` | Preview changes |
| `/status` | Check project health |
| `/test` | Run and generate tests |
| `/review` | Code review workflow |
| `/enhance` | Improve existing code |

---

## Quick Start

### 1. Use the Orchestrator

The orchestrator automatically routes to the right specialist:

```
You: Add JWT authentication

Orchestrator: 🤖 Applying @security-auditor + @backend-specialist...
[Work proceeds with expert-level assistance]
```

### 2. Use Workflows

```
/brainstorm user dashboard
/create checkout page
/debug login error
/plan feature breakdown
```

### 3. Direct Agent Invocation

```
Use the frontend-specialist to build the dashboard
Use the security-auditor to review authentication
```

---

## Directory Structure

```
.opencode/
├── ARCHITECTURE.md          # System documentation
├── README.md                # This file
├── agents/                  # 20 Specialist Agents
│   ├── orchestrator.md      # Master coordinator
│   ├── project-planner.md   # Discovery & planning
│   ├── frontend-specialist.md
│   ├── backend-specialist.md
│   ├── database-architect.md
│   ├── mobile-developer.md
│   ├── devops-engineer.md
│   ├── security-auditor.md
│   ├── penetration-tester.md
│   ├── test-engineer.md
│   ├── debugger.md
│   ├── performance-optimizer.md
│   ├── seo-specialist.md
│   ├── documentation-writer.md
│   ├── product-manager.md
│   ├── product-owner.md
│   ├── qa-automation-engineer.md
│   ├── code-archaeologist.md
│   ├── explorer-agent.md
│   ├── api-designer.md
│   └── game-developer.md
├── skills/                  # Domain Knowledge
│   ├── clean-code/
│   ├── intelligent-routing/
│   ├── parallel-agents/
│   ├── brainstorming/
│   ├── plan-writing/
│   ├── testing-patterns/
│   ├── api-patterns/
│   ├── frontend-design/
│   └── systematic-debugging/
├── workflows/               # Slash Commands
│   ├── brainstorm.md
│   ├── create.md
│   ├── debug.md
│   ├── deploy.md
│   ├── orchestrate.md
│   ├── plan.md
│   ├── test.md
│   ├── status.md
│   ├── review.md
│   └── enhance.md
└── rules/                   # Global Standards
    ├── coding-standards.md
    └── git-conventions.md
```

---

## Intelligent Routing

The system automatically detects which agent(s) to use:

```
User: "Add JWT authentication"
→ Detected: Security + Backend
→ Agents: security-auditor, backend-specialist

User: "Fix the dashboard button"
→ Detected: Frontend
→ Agents: frontend-specialist

User: "Optimize slow queries"
→ Detected: Database + Performance
→ Agents: database-architect, performance-optimizer
```

### Keyword Detection

| Keywords | Agent(s) |
|----------|----------|
| component, react, vue, css | frontend-specialist |
| api, endpoint, server | backend-specialist |
| database, schema, sql | database-architect |
| security, vulnerability, auth | security-auditor |
| test, jest, playwright | test-engineer |
| bug, error, fix | debugger |
| deploy, docker, ci/cd | devops-engineer |
| performance, optimize | performance-optimizer |

---

## Multi-Agent Orchestration

### When to Orchestrate

- Tasks requiring multiple perspectives
- Full-stack features
- Comprehensive reviews
- Complex implementations

### Example

```
User: /orchestrate build secure user management

Orchestrator:
  Analyzing task...
  Domains: Auth, Frontend, Backend, Database, Security
  
  Agents selected:
  1. database-architect (schema)
  2. backend-specialist (API)
  3. frontend-specialist (UI)
  4. security-auditor (review)
  5. test-engineer (tests)
  
  [Execution proceeds...]
  
  Synthesis Report:
  - Files created: 12
  - Files modified: 5
  - Tests added: 24
  - Security issues: 2 (fixed)
  
  ✅ Complete!
```

---

## Agent Reference

### Coordination

| Agent | Use When |
|-------|----------|
| `orchestrator` | Multi-agent coordination |
| `project-planner` | Task breakdown, planning |
| `explorer-agent` | Codebase exploration |

### Development

| Agent | Use When |
|-------|----------|
| `frontend-specialist` | UI components, React/Vue |
| `backend-specialist` | APIs, server logic |
| `mobile-developer` | React Native, Flutter |
| `game-developer` | Unity, Godot |

### Data

| Agent | Use When |
|-------|----------|
| `database-architect` | Schema, migrations |
| `api-designer` | API design, OpenAPI |

### Quality

| Agent | Use When |
|-------|----------|
| `test-engineer` | Writing tests |
| `qa-automation-engineer` | E2E infrastructure |
| `security-auditor` | Security review |
| `penetration-tester` | Security testing |

### Operations

| Agent | Use When |
|-------|----------|
| `devops-engineer` | CI/CD, deployment |
| `performance-optimizer` | Performance tuning |
| `seo-specialist` | SEO optimization |

### Product

| Agent | Use When |
|-------|----------|
| `product-manager` | Requirements |
| `product-owner` | Backlog, MVP |
| `documentation-writer` | Docs (when requested) |

### Maintenance

| Agent | Use When |
|-------|----------|
| `debugger` | Bug fixing |
| `code-archaeologist` | Legacy code |

---

## Philosophy

### The 5 Laws of Elegant Code

1. **Guard Clauses First** - Handle unhappy paths at the beginning
2. **Parsed State at Boundaries** - Validate input at the edge
3. **Pure Functions** - Same input → same output
4. **Fail Loud** - Invalid states should throw errors
5. **Readability First** - Code reads like a sentence

### Multi-Agent Principles

1. **Specialists over generalists** - Each agent excels in their domain
2. **Boundaries respected** - Agents don't cross into other domains
3. **Intelligent routing** - System detects the right agent
4. **Parallel when possible** - Independent tasks run together
5. **Synthesis at the end** - Results combined into unified output

---

## Examples

### Example 1: Build Feature

```
User: /create user dashboard

Agent: I'll help you create a user dashboard.

🤖 Routing to: frontend-specialist + backend-specialist

[frontend-specialist]
- Created DashboardPage component
- Created DashboardWidget components
- Added responsive design

[backend-specialist]
- Created /api/dashboard endpoint
- Added data aggregation
- Implemented caching

✅ Dashboard complete!
- Files created: 8
- Files modified: 3
- Tests added: 12
```

### Example 2: Debug Issue

```
User: /debug login returns 500 error

Agent: I'll help you debug this.

🤖 Routing to: debugger

Step 1: Reproduce ✅
Step 2: Gather information ✅
Step 3: Hypothesize ✅
Step 4: Test ✅
Step 5: Fix ✅
Step 6: Verify ✅

Root cause: Async password hashing without await
Fix: Added await to hash() call

✅ Login working!
```

### Example 3: Security Review

```
User: /review authentication security

Agent: I'll review the authentication system.

🤖 Routing to: security-auditor

Review Findings:

[CRITICAL] Timing attack vulnerability
- Location: auth.service.ts:45
- Issue: String comparison for tokens
- Fix: Use timing-safe comparison

[HIGH] Missing rate limiting
- Location: /api/auth/login
- Issue: No brute force protection
- Fix: Add rate limiting middleware

✅ Review complete!
2 issues found, fixes provided
```

---

## Statistics

| Metric | Count |
|--------|-------|
| **Agents** | 20 |
| **Skills** | 9+ |
| **Workflows** | 11 |
| **Coverage** | ~90% web/mobile development |

---

## Contributing

Found a better pattern? Improved an agent?
→ Share it back to improve this template!

---

## License

MIT - Use freely in any project.

---

**Built with  for multi-agent AI development**
