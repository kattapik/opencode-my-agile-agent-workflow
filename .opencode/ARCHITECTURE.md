# OpenCode Agent Kit - Architecture

## Overview

- 26 agents
- 25 agents
- 14 skills
- 7 commands
- Primary agent: feature-lead
- All other agents are subagents and communicate through @ handoffs

## Request Lifecycle

1. User request lands with @feature-lead.
2. @context-gatherer maps the current project and active work.
3. Discovery and planning create the compact context bundle.
4. Build agents implement the approved spec.
5. Quality agents review, test, and harden the change.
6. Security-sensitive changes pass through @security-auditor and @penetration-tester before approval.
7. Any failure loops back to the owning agent.
8. Approved feature bundles are archived under .opencode/archive/<feature-slug>/.
9. feature-lead synthesizes the final outcome.

## Context Bundle

- proposal.md: why, value, scope
- goal.md: target outcome, constraints, default choice
- spec.md: contract, data flow, edge cases, risks
- task.md: ordered checklist, dependencies, owners
- important.md: facts, blockers, links, decisions

## Archive

- Archive completed bundles in `.opencode/archive/<feature-slug>/`.
- Keep archive entries compact and aligned with the approved bundle.

## Skill Design

- Skills are small, philosophy-first mental models.
- Skill descriptions should state the trigger and the decision domain.
- Prefer the smallest skill that changes the next decision.

## Role Map

| Stage | Agents | Responsibility |
|-------|--------|----------------|
| Primary | feature-lead | Owns the request, tradeoffs, and the final gate loop |
| Context | context-gatherer | Map the current project state and archive-ready history |
| Coordination | project-planner, explorer-agent | Split, map, and sequence the work |
| Advanced | orchestrator | Optional multi-domain synthesis pass |
| Product | product-manager | Define problem, value, priorities, and release scope |
| Spec | system-analyst, api-designer, database-architect | Create the compact context bundle and contracts |
| Build | developer, frontend-specialist, backend-specialist, mobile-developer, game-developer, devops-engineer | Implement the approved spec |
| Quality | test-engineer, security-auditor, penetration-tester, performance-optimizer, debugger, pr-reviewer | Verify, review, and harden |
| Automation | qa-automation-engineer | Build and maintain test harnesses and repeatable validation |
| Output | documentation-writer, seo-specialist | Explain and publish clearly |
| Maintenance | code-archaeologist | Clean and simplify legacy code |

## Command Map

| Command | Entry | Exit |
|---------|-------|------|
| brainstorm | @feature-lead receives the request. | One recommended path is clear. |
| create | @feature-lead receives the feature request. | Implementation matches the spec. |
| debug | @feature-lead scopes the bug and the impact. | The original failure no longer reproduces. |
| plan | @feature-lead receives the request. | The planning bundle is short and complete. |
| review | @feature-lead hands the change to @pr-reviewer. | Either APPROVED or CHANGES REQUESTED is clear. |
| status | @feature-lead asks for the current project state. | The current health is easy to understand. |
| test | @feature-lead defines the test scope. | The important paths are covered. |

## Gate Rules

- Do not hand off to build until the spec bundle is clear.
- Do not hand off to review until implementation is complete.
- Do not ship until the review gate is clean.
- Loop back to the owning agent when a gate fails.

## Decision Rule

- Prefer defaults when the tradeoff is low risk.
- Escalate to the user only when scope, security, or architecture changes materially.
- Keep all context compact enough for a subagent to finish without asking again.
