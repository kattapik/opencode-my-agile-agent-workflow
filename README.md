# create-opencode-agile

> **Scaffold AI-powered spec-driven development with OpenCode Agile Agent**

[![npm version](https://img.shields.io/npm/v/create-opencode-agile.svg)](https://img.shields.io/badge/license-MIT-blue.svg)](https://img.shields.io/badge/size-green.svg)

**CLI tool to install OpenCode Agile Agent - a complete spec-driven development workflow with specialized AI agents**

##  Quick Start

```bash
# Run with npx (no installation required)
npx create-opencode-agile

# Or install globally
npm install -g create-opencode-agile
```

##  What it does

This CLI tool will:

1. **Detect your project** - Automatically detects your framework (React, Vue, Next.js, etc.)
2. **Copy `.opencode` templates** - Installs agent definitions and skills
3. **Generate `AGENTS.md`** - Creates project-specific coding standards
4. **Set up documentation** - Provides complete workflow guide

##  What's Included

###  Specialized Agents (4)

| Agent | Role | Description |
|-------|------|-------------|
| **Feature Lead** | Orchestrator | Coordinates entire feature development workflow |
| **System Analyst** | Planner | Creates specs, proposals, and task breakdown |
| **Developer** | Implementer | Implements code based on specifications |
| **PR Reviewer** | Validator | Validates code against philosophy and standards |

###  Loop Check System (Ralph Wiggum)

- **Autonomous iteration** with learning
- **Verification loops** - Auto-verify until success
- **Edge case detection** - Proactive identification of boundary conditions
- **Multi-agent state sharing** - Export/import state

###  Spec-Driven Development

- **PRD Templates** - Product Requirements Document
- **Proposal Template** - Business justification
- **Spec Template** - Technical specification
- **Task Template** - Atomic implementation checklist

###  Smart Features

- **Philosophy-driven code** - The 5 Laws of Elegant Defense
- **Context-aware decision making**
- **Anti-pattern prevention**
- **Variation encouragement**

##  Requirements

- Node.js 18.0.0 or higher
- npm or yarn

##  Usage

### Option 1: Interactive Mode

```bash
npx create-opencode-agile
```

The CLI will prompt you:
- Project name
- Framework
- Language
- Styling
- State management
- Testing

### Option 2: Quick Install (Non-Interactive)

```bash
npx create-opencode-agile --yes
```

This will:
- Skip all prompts
- Use detected configuration
- Install with default settings

### Option 3: Specific Framework

```bash
# React project
npx create-opencode-agile --framework react

# Vue project  
npx create-opencode-agile --framework vue

# Next.js project
npx create-opencode-agile --framework next
```

##  Project Structure After Installation

```
your-project/
├── .opencode/
│   ├── agents/
│   │   ├── feature-lead.md
│   │   ├── developer.md
│   │   ├── system-analyst.md
│   │   └── pr-reviewer.md
│   ├── skills/
│   │   └── code-philosophy/
│   │       └── SKILL.md
│   ├── README.md
│   ├── config.template.json
│   └── package.json
├── AGENTS.md          # Project-specific coding standards
└── package.json
```

##  Example Workflow

```
User: I want to implement user authentication with JWT

Agent (Feature Lead):
  🔍 Searching codebase...
  ✅ Found: User type in src/types/user.types.ts
  ✅ Found: User store in src/stores/user.store.ts
  
  📋 Quick questions:
  1. Search by: name only, or also email/role?
  2. Real-time search or search button?
  3. Where should search appear?

User: 1. Name and email, 2. Real-time, 3. UserListPage

Agent (Feature Lead):
  Perfect! Delegating to System Analyst for planning...
  
  ✅ System Analyst created:
  - proposal.md: User stories and success criteria
  - spec.md: Search API, store updates, component changes
  - task.md: 12 atomic tasks
  
  Delegating to Developer...
  
  ✅ Developer completed:
  - Created SearchInput component
  - Updated UserListPage with search
  - Added search to User store
  - Added API endpoint
  
  Delegating to PR Reviewer...
  
  ✅ PR Reviewer: APPROVED
  
  🎉 Feature Complete!
```

##  Important Notes

- **Customize `AGENTS.md`** after installation for your specific project rules
- **Read `.opencode/README.md`** for detailed workflow information
- **Set up proper TypeScript/ESLint config** for best results

##  Links
- [npm](https://www.npmjs.com/package/create-opencode-agile)
- [GitHub](https://github.com/opencode-ai/opencode-agile)
- [Documentation](https://opencode-ai.github.io/opencode-agile)

##  License

MIT  [OpenCode AI](https://opencode.ai)

##  Contributing

Contributions are welcome! Please read our contributing guidelines first.

##  Issues

Found a bug? Please open an issue on GitHub.
