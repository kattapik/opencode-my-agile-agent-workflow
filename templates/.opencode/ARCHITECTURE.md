# OpenCode Agent Kit - Architecture

> **Comprehensive AI Agent Orchestration System for OpenCode**
> 
> Inspired by Antigravity Kit, adapted for OpenCode's native agent system

---

##  Overview

OpenCode Agent Kit is a modular multi-agent system consisting of:

- **20 Specialist Agents** - Role-based AI personas for different domains
- **37 Skills** - Domain-specific knowledge modules
- **11 Workflows** - Slash command procedures
- **Intelligent Routing** - Automatic agent detection and invocation

---

##  Directory Structure

```
.opencode/
├── ARCHITECTURE.md          # This file
├── README.md                # User guide
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
├── skills/                  # 37 Domain Skills
│   ├── clean-code/
│   ├── frontend-design/
│   ├── backend-patterns/
│   ├── database-design/
│   ├── testing-patterns/
│   ├── security-auditing/
│   ├── devops-procedures/
│   ├── performance-profiling/
│   ├── brainstorming/
│   ├── plan-writing/
│   ├── architecture/
│   ├── parallel-agents/
│   ├── behavioral-modes/
│   ├── intelligent-routing/
│   └── ... (37 total)
├── workflows/               # 11 Slash Commands
│   ├── brainstorm.md
│   ├── create.md
│   ├── debug.md
│   ├── deploy.md
│   ├── enhance.md
│   ├── orchestrate.md
│   ├── plan.md
│   ├── preview.md
│   ├── status.md
│   ├── test.md
│   └── review.md
├── rules/                   # Global Rules
│   ├── coding-standards.md
│   ├── git-conventions.md
│   └── security-rules.md
└── scripts/                 # Validation Scripts
    └── README.md
```

---

##  Agents (20)

Specialist AI personas for different domains.

| Agent | Focus | Skills Used |
|-------|-------|-------------|
| `orchestrator` | Multi-agent coordination | parallel-agents, behavioral-modes |
| `project-planner` | Discovery, task planning | brainstorming, plan-writing, architecture |
| `frontend-specialist` | Web UI/UX | frontend-design, react-patterns, tailwind |
| `backend-specialist` | API, business logic | api-patterns, nodejs-patterns, database-design |
| `database-architect` | Schema, SQL | database-design, prisma-expert |
| `mobile-developer` | iOS, Android, RN | mobile-design |
| `devops-engineer` | CI/CD, Docker | deployment-procedures, docker-expert |
| `security-auditor` | Security compliance | vulnerability-scanner, security-rules |
| `penetration-tester` | Offensive security | red-team-tactics |
| `test-engineer` | Testing strategies | testing-patterns, tdd-workflow, e2e-testing |
| `debugger` | Root cause analysis | systematic-debugging |
| `performance-optimizer` | Speed, Web Vitals | performance-profiling |
| `seo-specialist` | Ranking, visibility | seo-fundamentals |
| `documentation-writer` | Manuals, docs | documentation-templates |
| `product-manager` | Requirements, user stories | plan-writing, brainstorming |
| `product-owner` | Strategy, backlog, MVP | plan-writing, brainstorming |
| `qa-automation-engineer` | E2E testing, CI pipelines | e2e-testing, testing-patterns |
| `code-archaeologist` | Legacy code, refactoring | clean-code, code-review |
| `explorer-agent` | Codebase analysis | - |
| `api-designer` | API architecture | api-patterns, openapi |
| `game-developer` | Game logic, mechanics | game-development |

---

##  Skills (37)

Modular knowledge domains that agents load on-demand.

### Frontend & UI

| Skill | Description |
|-------|-------------|
| `react-patterns` | React & Next.js best practices |
| `vue-patterns` | Vue 3 composition API patterns |
| `tailwind-patterns` | Tailwind CSS v4 utilities |
| `frontend-design` | UI/UX patterns, design systems |
| `web-design-guidelines` | Web UI audit - accessibility, UX, performance |
| `responsive-design` | Mobile-first responsive patterns |

### Backend & API

| Skill | Description |
|-------|-------------|
| `api-patterns` | REST, GraphQL, tRPC patterns |
| `nodejs-patterns` | Node.js async, modules |
| `python-patterns` | Python standards, FastAPI |
| `nestjs-expert` | NestJS modules, DI, decorators |

### Database

| Skill | Description |
|-------|-------------|
| `database-design` | Schema design, optimization |
| `prisma-expert` | Prisma ORM, migrations |
| `sql-optimization` | Query optimization, indexing |

### TypeScript/JavaScript

| Skill | Description |
|-------|-------------|
| `typescript-expert` | Type-level programming, performance |
| `javascript-patterns` | Modern JS patterns |

### Cloud & Infrastructure

| Skill | Description |
|-------|-------------|
| `docker-expert` | Containerization, Compose |
| `deployment-procedures` | CI/CD, deploy workflows |
| `server-management` | Infrastructure management |
| `kubernetes-patterns` | K8s deployment patterns |

### Testing & Quality

| Skill | Description |
|-------|-------------|
| `testing-patterns` | Jest, Vitest, strategies |
| `e2e-testing` | Playwright, Cypress |
| `tdd-workflow` | Test-driven development |
| `code-review-checklist` | Code review standards |
| `lint-and-validate` | Linting, validation |

### Security

| Skill | Description |
|-------|-------------|
| `vulnerability-scanner` | Security auditing, OWASP |
| `red-team-tactics` | Offensive security |
| `security-rules` | Security best practices |

### Architecture & Planning

| Skill | Description |
|-------|-------------|
| `app-builder` | Full-stack app scaffolding |
| `architecture` | System design patterns |
| `plan-writing` | Task planning, breakdown |
| `brainstorming` | Socratic questioning |

### Other

| Skill | Description |
|-------|-------------|
| `clean-code` | Coding standards (Global) |
| `behavioral-modes` | Agent personas |
| `parallel-agents` | Multi-agent patterns |
| `intelligent-routing` | Automatic agent selection |
| `documentation-templates` | Doc formats |
| `i18n-localization` | Internationalization |
| `performance-profiling` | Web Vitals, optimization |
| `systematic-debugging` | Troubleshooting |
| `seo-fundamentals` | SEO, E-E-A-T, Core Web Vitals |
| `mobile-design` | Mobile UI/UX patterns |
| `game-development` | Game logic, mechanics |
| `bash-linux` | Linux commands, scripting |
| `powershell-windows` | Windows PowerShell |
| `git-conventions` | Git workflow patterns |

---

##  Workflows (11)

Slash command procedures. Invoke with `/command`.

| Command | Description |
|---------|-------------|
| `/brainstorm` | Socratic discovery |
| `/create` | Create new features |
| `/debug` | Debug issues |
| `/deploy` | Deploy application |
| `/enhance` | Improve existing code |
| `/orchestrate` | Multi-agent coordination |
| `/plan` | Task breakdown |
| `/preview` | Preview changes |
| `/status` | Check project status |
| `/test` | Run tests |
| `/review` | Code review workflow |

---

##  Intelligent Agent Routing

The system automatically detects and applies the right specialist(s):

```
User: "Add JWT authentication"
AI: 🤖 Applying @security-auditor + @backend-specialist...

User: "Fix the dark mode button"
AI: 🤖 Using @frontend-specialist...

User: "Login returns 500 error"
AI: 🤖 Using @debugger for systematic analysis...
```

### How It Works:

1. Analyzes request silently
2. Detects domain(s) automatically (frontend, backend, security, etc.)
3. Selects the best specialist(s)
4. Informs you which expertise is being applied
5. You get specialist-level responses without needing to know the system architecture

---

##  Request Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REQUEST CLASSIFICATION                        │
│  • Analyze intent (build, debug, test, deploy, etc.)           │
│  • Identify domain (frontend, backend, mobile, etc.)           │
│  • Detect complexity (simple, medium, complex)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌───────────────────┐      ┌──────────────────┐
    │ WORKFLOW COMMAND  │      │  DIRECT AGENT    │
    │  (Slash Command)  │      │  ASSIGNMENT      │
    └─────────┬─────────┘      └────────┬─────────┘
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │       AGENT INITIALIZATION          │
         │  • Load agent persona/role          │
         │  • Load required skills             │
         │  • Set behavioral mode              │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │         TASK EXECUTION              │
         │  • Analyze codebase                 │
         │  • Apply best practices             │
         │  • Generate/modify code             │
         │  • Run validations                  │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │         RESULT DELIVERY             │
         │  • Present changes to user          │
         │  • Provide explanations             │
         │  • Suggest next steps               │
         └─────────────────────────────────────┘
```

---

##  Statistics

| Metric | Value |
|--------|-------|
| **Total Agents** | 20 |
| **Total Skills** | 37 |
| **Total Workflows** | 11 |
| **Coverage** | ~90% web/mobile development |

---

##  Quick Reference

| Need | Agent | Skills |
|------|-------|--------|
| Web App | `frontend-specialist` | react-patterns, frontend-design |
| API | `backend-specialist` | api-patterns, nodejs-patterns |
| Mobile | `mobile-developer` | mobile-design |
| Database | `database-architect` | database-design, prisma-expert |
| Security | `security-auditor` | vulnerability-scanner |
| Testing | `test-engineer` | testing-patterns, e2e-testing |
| Debug | `debugger` | systematic-debugging |
| Plan | `project-planner` | brainstorming, plan-writing |
| Multi-agent | `orchestrator` | parallel-agents, behavioral-modes |

---

##  Getting Started

### Quick Start

1. The orchestrator agent is your main entry point
2. Just describe what you need in natural language
3. The system will route to the right specialist(s)
4. Receive expert-level assistance automatically

### Manual Agent Selection

You can also explicitly invoke agents:

```
Use the security-auditor agent to review authentication
Use the frontend-specialist to build the dashboard
Use the test-engineer to add test coverage
```

### Using Workflows

```
/brainstorm authentication system
/create landing page with hero section
/debug why login fails
/plan feature breakdown
```

---

**Last Updated**: 2026-03-13
**Version**: 1.0.0
