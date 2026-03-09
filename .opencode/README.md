#  OpenCode Template - Agile Agent-Driven Development

> **Complete template for spec-driven, autonomous development with AI agents**
> 
> Copy this `.opencode` folder to any project and customize `AGENTS.md` for your stack.

---

##  What's Included

###  **Working Team Agents** (4 Specialized Agents)
- **Feature Lead** - Orchestrator that coordinates the entire workflow
- **System Analyst** - Creates specs, proposals, and task breakdowns
- **Developer** - Implements code based on specifications
- **PR Reviewer** - Validates against code philosophy and standards

###  **Perfect Loop Check System**
- **Ralph Wiggum Integration** - Autonomous iteration with learning
- **Verification Loops** - Auto-verify until success criteria met
- **Edge Case Detection** - Proactive identification of boundary conditions
- **Multi-Agent State Sharing** - Export/import state between agents

###  **Spec-Driven Development**
- **PRD Templates** - Product Requirements Document
- **Proposal Template** - Business justification and user stories
- **Spec Template** - Technical specification
- **Task Template** - Atomic implementation checklist

###  **Smart Instruction Prompts**
- Philosophy-driven code principles
- Context-aware decision making
- Anti-pattern prevention
- Variation encouragement

###  **Flexible Agile Workflows**
- Sequential execution for dependencies
- Parallel execution for independent tasks
- Iterative refinement loops
- Multi-phase delivery

---

##  Quick Start

### 1. Copy Template to Your Project

```bash
cp -r .opencode /path/to/your/project/
cd /path/to/your/project
```

### 2. Customize AGENTS.md

Edit `AGENTS.md` in your project root with:
- Your tech stack (framework, language, state management)
- Project-specific conventions
- File naming patterns
- Key architectural rules

### 3. Start Using Agents

```
You: I want to implement user authentication with JWT

Agent: I'll orchestrate this feature end-to-end.
→ Gathering requirements...
→ Delegating to System Analyst for specs...
→ Delegating to Developer for implementation...
→ Delegating to PR Reviewer for validation...
→ ✅ Feature complete!
```

---

##  Directory Structure

```
.opencode/
├── README.md                          # This file
├── agents/
│   ├── feature-lead.md                # Orchestrator agent
│   ├── system-analyst.md              # Planning & specs agent
│   ├── developer.md                   # Implementation agent
│   └── pr-reviewer.md                 # Code review agent
├── skills/
│   ├── ralph-wiggum/
│   │   ├── SKILL.md                   # Ralph loop guide
│   │   ├── templates/
│   │   │   ├── prd-template.md        # PRD structure
│   │   │   ├── planning-template.md   # Planning structure
│   │   │   └── spec-template.md       # Spec structure
│   │   └── examples/
│   │       ├── basic-loop.md          # Simple loop example
│   │       ├── multi-agent.md         # Multi-agent example
│   │       └── spec-driven.md         # Spec-driven example
│   └── code-philosophy/
│       └── SKILL.md                   # Code principles
├── plugins/
│   ├── ralph-wiggum.ts                # Ralph integration plugin
│   ├── validate-standards.ts          # Standards validation
│   └── lint-format.ts                 # Auto lint/format
├── templates/
│   ├── AGENTS.template.md             # Template for AGENTS.md
│   ├── prd-template.md                # PRD template
│   ├── proposal-template.md           # Proposal template
│   ├── spec-template.md               # Spec template
│   └── task-template.md               # Task checklist template
└── docs/
    ├── workflow.md                    # Complete workflow guide
    ├── agent-guide.md                 # How to work with agents
    └── troubleshooting.md             # Common issues & fixes
```

---

##  Core Workflow

### Phase 1: Requirements Gathering
```
User Request → Feature Lead → Clarify Requirements
                                    ↓
                            Search Codebase
                                    ↓
                            Ask Missing Details
```

### Phase 2: Planning
```
Feature Lead → System Analyst
                    ↓
              ┌─────┴─────┐
              ↓           ↓           ↓
         proposal.md  spec.md    task.md
              ↓           ↓           ↓
         (business)  (technical) (checklist)
```

### Phase 3: Implementation
```
Feature Lead → Developer
                    ↓
              Execute task.md
                    ↓
              Create/Modify files
                    ↓
              Run lint & format
```

### Phase 4: Review
```
Feature Lead → PR Reviewer
                    ↓
              Check philosophy
                    ↓
              Check standards
                    ↓
              Check code quality
                    ↓
         ┌───────┴───────┐
         ↓               ↓
      APPROVED    CHANGES REQUESTED
         ↓               ↓
      Done          Back to Developer
```

### Phase 5: Verification (Loop)
```
If errors exist:
    Developer → Fix → Review → (loop until clean)
    
Or use Ralph Loop:
    ralph_loop_start → Auto-iterate → Verify → Done
```

---

##  Agent Roles

### 1. Feature Lead (Orchestrator)
- **Mode:** Primary (user-facing)
- **Responsibilities:**
  - Gather and clarify requirements
  - Coordinate between agents
  - Resolve ambiguities
  - Make final decisions
  - Report progress to user

### 2. System Analyst (Planner)
- **Mode:** Subagent
- **Responsibilities:**
  - Create business proposals
  - Write technical specifications
  - Break down into atomic tasks
  - Identify dependencies
  - Flag open questions

### 3. Developer (Implementer)
- **Mode:** Subagent
- **Responsibilities:**
  - Read specs fully before coding
  - Follow AGENTS.md conventions
  - Implement task checklist
  - Run lint/format after changes
  - Report modifications

### 4. PR Reviewer (Validator)
- **Mode:** Subagent
- **Responsibilities:**
  - Check code philosophy
  - Validate against standards
  - Identify anti-patterns
  - Ensure test coverage
  - Approve or request changes

---

##  Loop Check System

### Ralph Wiggum Loop
```
ralph_loop_start({
  prd_path: "feature.md",
  max_iterations: 10,
  timeout_ms: 300000,
  parallel: false,
  validate_prd: true,
  detect_edge_cases: true
})
```

### Verification Pattern
```
ralph_verify({
  verification_command: "npm test && npm run lint",
  success_pattern: "All tests passed",
  spec_compliance_check: true,
  edge_case_tests: ["empty input", "null values", "concurrent access"]
})
```

### State Sharing
```
// Export state
const state = ralph_export({ state_id: "feature-plan" })

// Import in another agent
ralph_import({ state_json: state })
```

---

##  When to Use What

| Scenario | Agent/Tool | Why |
|----------|-----------|-----|
| New feature from scratch | Feature Lead → Full Team | Complete workflow needed |
| Simple bug fix | Developer directly | No planning needed |
| Complex refactoring | Ralph Loop + Developer | Iterative improvement |
| Add tests | Developer + PR Reviewer | Implementation + validation |
| Architecture change | System Analyst → Proposal | Planning required |
| Multi-service feature | Ralph Loop (parallel) | Independent tasks |
| Code review | PR Reviewer | Validation only |

---

##  Smart Patterns

### Pattern 1: Spec-First Development
```
1. System Analyst creates spec.md
2. User reviews and approves spec
3. Developer implements from spec
4. PR Reviewer validates against spec
→ Zero ambiguity, clear success criteria
```

### Pattern 2: Iterative Refinement
```
1. Ralph Loop starts with MVP PRD
2. Auto-iterate until verification passes
3. Export state
4. Import and continue with enhancements
→ Progressive delivery with learning
```

### Pattern 3: Parallel Execution
```
1. System Analyst creates specs for 3 services
2. Ralph Loop runs all 3 in parallel
3. Each service has isolated state
4. Final integration verification
→ Speed through isolation
```

### Pattern 4: Guard-Driven Development
```
1. PR Reviewer checks guard clauses
2. Fail fast on invalid states
3. Parse at boundaries, trust inside
4. Pure functions, no hidden mutations
→ Robust, maintainable code
```

---

##  Configuration

### Customize Agents

Edit agent `.md` files to:
- Change models (e.g., `model: opencode-go/gpt-4`)
- Adjust tool permissions
- Modify instructions

### Environment Variables

```bash
# Ralph settings
export RALPH_MAX_ITERATIONS=20
export RALPH_TIMEOUT_MS=600000
export RALPH_AUTO_VERIFY=true

# Agent settings
export AGENT_MODEL_PRIMARY=opencode
export AGENT_MODEL_PLANNING=sonnet
export AGENT_MODEL_CODING=claude
```

### Plugin Configuration

Create `.opencode/config.json`:
```json
{
  "plugins": {
    "ralph-wiggum": {
      "enabled": true,
      "max_iterations": 15,
      "timeout_ms": 300000
    },
    "validate-standards": {
      "enabled": true,
      "strict_mode": true
    }
  }
}
```

---

##  Philosophy

### The 5 Laws of Elegant Code

1. **Guard Clauses** - Handle unhappy path first
2. **Parsed State** - Trust types at the boundary
3. **Purity** - Functions should be predictable
4. **Fail Loud** - Invalid states must scream
5. **Readability** - Code reads like a sentence

### Spec-Driven Manifesto

> **Specs first, code second.** Define what "done" looks like before writing any code. A PRD with clear tasks and acceptance criteria is worth more than 1000 lines of implementation.

### Iterative Autonomy

> **Fail fast, learn faster.** Each failed iteration teaches the system. Loops don't just retry—they adapt based on previous failures.

---

##  Examples

### Example 1: Add User Authentication
```
User: Add JWT authentication with refresh tokens

Feature Lead: 
  ✅ Gathering requirements...
  ✅ Delegating to System Analyst...
  
System Analyst:
  ✅ Created proposal.md (user stories, success criteria)
  ✅ Created spec.md (endpoints, types, store)
  ✅ Created task.md (atomic checklist)
  
Feature Lead:
  ✅ Specs approved by user
  ✅ Delegating to Developer...
  
Developer:
  ✅ Implemented all checklist items
  ✅ Created 8 files, modified 3 files
  ✅ Ran lint and format
  
Feature Lead:
  ✅ Delegating to PR Reviewer...
  
PR Reviewer:
  ✅ All philosophy checks passed
  ✅ All standard checks passed
  ✅ APPROVED
  
Feature Lead:
  🎉 Feature complete! Summary:
  - 5 API endpoints
  - 2 Pinia stores
  - 4 Vue components
  - 15 unit tests
  - All verification passed
```

### Example 2: Fix All TypeScript Errors (Ralph Loop)
```
User: Fix all TypeScript errors in the project

Agent: This is a good candidate for Ralph Loop.
  📋 Loop Plan:
  - Task: Fix TypeScript errors
  - Max Iterations: 15
  - Verification: npx tsc --noEmit
  - Success: No errors found
  
  Proceed? (yes/no)

User: yes

[Ralph Loop running autonomously...]

Iteration 1: Found 23 errors → Fixed 8
Iteration 2: Found 15 errors → Fixed 7
Iteration 3: Found 8 errors → Fixed 5
Iteration 4: Found 3 errors → Fixed 3
Iteration 5: Verification passed ✅

✅ Ralph completed! All TypeScript errors fixed.
```

---

##  Troubleshooting

### Agent not understanding requirements?
→ Feature Lead didn't gather enough context. Ask more specific questions.

### Loops not progressing?
→ Check `ralph_status({ verbose: true })`. PRD might be too vague.

### Code not following standards?
→ PR Reviewer caught it. Developer needs to re-read AGENTS.md.

### State conflicts in parallel execution?
→ Tasks aren't truly independent. Run sequentially instead.

---

##  Customization Checklist

- [ ] Copy `.opencode/` to your project
- [ ] Edit `AGENTS.md` with your stack
- [ ] Customize agent instructions if needed
- [ ] Set up plugins in `config.json`
- [ ] Add project-specific skills
- [ ] Test with a simple feature
- [ ] Adjust iteration limits as needed

---

##  Contributing

Found a better pattern? Improved an agent? 
→ Share it back to improve this template!

---

##  License

MIT - Use freely in any project.

---

**Built with  for agile, spec-driven development**
