# OpenCode Agent Kit — Architecture

## Overview
- 15 agents, 19 skills, 11 commands, 1 runtime plugin
- Primary: feature-lead
- All others are subagents communicating through @ handoffs
- `session-artifacts` is the runtime spine for active feature state and handoff safety

## Request Lifecycle
1. User request lands with @feature-lead.
2. @feature-lead **clarifies first** — iterates questions until scope, intent, and business value are clear. If user has no idea, offers default + trade-offs.
3. `session_artifact_current` restores active feature state.
4. @context-gatherer maps current project and active work.
5. If new feature: create context bundle + status.yaml. If continuing: refresh the active artifact.
6. Discovery and planning produce the compact context bundle.
7. Build agents implement the approved spec from canonical handoff packets.
8. Quality agents review, test, and harden.
9. Security-sensitive changes pass through @security-auditor.
10. Any failure loops back to the owning agent.
11. When the flow may compact before the final gates, @retrospective-writer captures a compact checkpoint.
12. After a meaningful failure is resolved, the agent may ask whether the lesson should become a reusable skill or rule.
13. Approved work summaries archived under `.opencode/archive/<feature-slug>.md` through the artifact finalizer.
14. @archiver writes the final archive record.
15. feature-lead synthesizes the final outcome.

## Context Bundle
Create only for new features. Skip if no active feature and user is continuing work.
- brief.md: why, outcome, business context, scope, constraints, default choice
- spec.md: contract, data flow, edge cases, risks, acceptance criteria
- task.md: ordered checklist, dependencies, owners
- notes.md: facts, decisions, blockers, links
- status.yaml: live execution state

`status.yaml.status` allowed: `brainstorm`, `planning`, `implementation`, `verification`, `review`, `done`, `blocked`.

## Archive
- Archive in `.opencode/archive/<feature-slug>.md`.
- Include the shipped summary, changed surfaces, verification signal, and remaining follow-up.
- Finalize only when `status.yaml` is `done`.
- Finalize only from the primary agent.

## Skill Design
- Skills are small, philosophy-first mental models.
- Skill descriptions state the trigger and decision domain.
- Prefer the smallest skill that changes the next decision.
- `artifact-discipline` keeps runtime state out of prompt memory.
- `session-closeout` leaves a durable checkpoint before compaction or pause.
- Use `cross-model-regression` when risky changes need multiple specialist checks across different reviewer models.
- Promote lessons from repeated or costly failures only when they create durable guidance.

## Runtime Spine
- Active work lives in `.opencode/artifacts/features/<feature-slug>/`.
- `.opencode/artifacts/` is local runtime state and should be git-ignored.
- Planning docs and runtime evidence live side-by-side but stay separate.
- Every subagent should start from `session_artifact_handoff` instead of a document dump.
- `session_artifact_repo_delta` guards against drift between artifact state and git state.
- Archive remains the immutable shipped summary.

## Flow Rules
- The default command spine is `/brainstorm -> /plan -> /create -> /test -> /review -> /archive`.
- The flow is resumable and non-linear. Any command can be re-entered when the work needs that lens.
- Re-plan on scope drift, re-brainstorm on ambiguity, re-test on risky changes, and re-review at meaningful checkpoints.
- Use @retrospective-writer when a failure may deserve a reusable lesson.

## Role Map

| Stage | Agents | Responsibility |
|-------|--------|----------------|
| Primary | feature-lead | Own request, tradeoffs, final gate loop |
| Archive | archiver | Write compact archive summaries for approved work |
| Learning | retrospective-writer | Capture a reusable failure lesson and decide whether it should become a skill or rule |
| Context | context-gatherer | Map project state and archive-ready history |
| Coordination | project-planner | Split, map, sequence work |
| Spec | system-analyst | Create compact context bundle and contracts |
| Build | developer, frontend-specialist, backend-specialist, devops-engineer | Implement approved spec |
| Quality | test-engineer, security-auditor, performance-optimizer, debugger, pr-reviewer | Verify, review, harden |

## Command Map

| Command | Entry | Exit |
|---------|-------|------|
| archive | @archiver closes approved work | Archive path and saved summary are explicit |
| brainstorm | @feature-lead receives request or ambiguity returns | One recommended path is clear |
| check-progress | @feature-lead needs a git-aware status read | Current state and next step are explicit |
| create | @feature-lead receives feature request | Implementation matches spec |
| plan | @feature-lead receives request or scope drift | Planning bundle is short and complete |
| review | @feature-lead hands change to @pr-reviewer at any meaningful checkpoint | APPROVED or CHANGES REQUESTED |
| reframe | @feature-lead detects a framing mismatch | Better direction and next step are explicit |
| rubber-duck | @feature-lead needs to reason before changing code | Assumptions and next check are explicit |
| status | @feature-lead asks for project state | Current health is easy to understand |
| test | @feature-lead defines test scope | Important paths are covered |

## Gate Rules
- Do not hand off to build until spec bundle is clear.
- Do not hand off to review until implementation is complete.
- Do not ship until review gate is clean.
- Do not archive until repo delta is reconciled.
- Loop back to owning agent when a gate fails.

## Decision Rules
- Prefer defaults when tradeoff is low risk AND business intent is clear.
- Escalate to user when scope, security, or architecture changes materially.
- Keep context compact enough for a subagent to finish without asking again.
- Pass intent in prompts and retrieve documents through tools.

## Clarification Rules
- **Iterate until clear**: Keep asking until scope, intent, and business value are unambiguous.
- **No hallucination**: If you don't know, ask. Never assume user intent.
- **Default + trade-offs**: If user has no idea, propose a default path with trade-offs. Let them choose.
- **Business before technical**: Capture who, what value, and success criteria before any technical planning.
- **State assumptions**: Flag what you inferred and what is unverified.
- **Compact but complete**: Keep context bundle output compact, but never skip user requirements.
