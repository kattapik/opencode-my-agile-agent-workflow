# OpenCode Agent Kit

Spec-driven multi-agent system for OpenCode.

---

## Included

- 25 agents
- 14 skills
- 7 commands

## Skill Design

- Each skill is a compact mental model, not a checklist.
- The description field names the trigger and the decision domain.
- Prefer the smallest skill that answers the next choice.

## Context Skills

- `context-gathering` maps the current project and active work.
- `context-archive` stores completed bundles in `.opencode/archive/<feature-slug>/`.
- `security-gate` decides when a change needs a security gate or redteam phase.
- `redteam-validation` simulates attacker behavior and proves exploitability.
- `orchestrator` is optional; default routing stays with `feature-lead` and the owning specialists.

## Commands

- Custom slash commands live in `.opencode/commands/`.
- Each command file uses Markdown frontmatter plus a prompt body, matching OpenCode's command format.
- The current command set is `brainstorm`, `create`, `debug`, `plan`, `review`, `status`, and `test`.

## Primary Flow

1. @feature-lead receives the request.
2. @context-gatherer maps the current project state.
3. @project-planner and @system-analyst create the compact bundle: proposal.md, goal.md, spec.md, task.md, and important.md.
4. @developer implements the approved spec.
5. @test-engineer, @security-auditor, @penetration-tester, and @pr-reviewer close the loop.
6. @feature-lead archives the completed bundle.

## Context Bundle

- proposal.md: why, value, scope
- goal.md: target outcome, constraints, default choice
- spec.md: contract, data flow, edge cases, risks
- task.md: ordered checklist, dependencies, owners
- important.md: facts, blockers, links, decisions

## Archive

- Completed bundles live in `.opencode/archive/<feature-slug>/`.
- Keep the archive copy approved, compact, and read-only in practice.

## Agent Groups

| Group | Agents |
|-------|--------|
| Context | `context-gatherer` |
| Primary | `feature-lead` |
| Coordination | `project-planner`, `explorer-agent` |
| Advanced | `orchestrator` |
| Product | `product-manager` |
| Spec | `system-analyst`, `api-designer`, `database-architect` |
| Build | `developer`, `frontend-specialist`, `backend-specialist`, `mobile-developer`, `game-developer`, `devops-engineer` |
| Quality | `test-engineer`, `security-auditor`, `penetration-tester`, `performance-optimizer`, `debugger`, `pr-reviewer` |
| Automation | `qa-automation-engineer` |
| Output | `documentation-writer`, `seo-specialist` |
| Maintenance | `code-archaeologist` |

## Command Catalog

| Command | Use When |
|---------|----------|
| brainstorm | Explore options and clarify requirements before planning. |
| create | Build new features, components, or project slices with a spec-driven flow. |
| debug | Diagnose and fix bugs using a root-cause approach. |
| plan | Create structured task breakdowns and spec artifacts. |
| review | Review code against the spec, standards, and quality gates. |
| status | Check project health, docs, and operating readiness. |
| test | Run and generate tests for the codebase. |

## Skills

- context-gathering
- context-archive
- clean-code
- brainstorming
- plan-writing
- parallel-agents
- intelligent-routing
- frontend-design
- api-patterns
- testing-patterns
- systematic-debugging
- code-philosophy
- security-gate
- redteam-validation

## Routing Examples

- Add JWT auth -> @feature-lead -> @system-analyst -> @backend-specialist + @security-auditor + @penetration-tester -> @test-engineer
- Fix a UI bug -> @feature-lead -> @frontend-specialist -> @test-engineer -> @pr-reviewer
- Ship a multi-domain feature -> @feature-lead -> @project-planner -> specialist agents -> @pr-reviewer

## Rules

- Use the safest default when the downside is small.
- Ask only when scope, security, or architecture changes materially.
- Keep every handoff compact and explicit.
