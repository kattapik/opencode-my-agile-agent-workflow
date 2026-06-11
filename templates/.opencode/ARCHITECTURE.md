# OpenCode Agent Kit — Architecture

## Overview
- 15 agents, 19 skills, 11 commands
- Primary: feature-lead
- All others are subagents communicating through @ handoffs
- Active feature state lives in `.opencode/artifacts/features/<feature-slug>/` and is tracked through `status.yaml`

## Request Lifecycle
1. User request lands with @feature-lead.
2. @feature-lead **clarifies first** — iterates questions until scope, intent, and business value are clear. If user has no idea, offers default + trade-offs.
3. Active feature state is retrieved from `.opencode/artifacts/features/<feature-slug>/status.yaml`.
4. @context-gatherer maps current project and active work.
5. If new feature: create HTML context bundle + status.yaml. If continuing: refresh the active artifact.
6. Discovery and planning produce the compact context bundle.
7. Build agents implement the approved spec from canonical handoff packets.
8. Quality agents review, test, and harden.
9. Security-sensitive changes pass through @security-auditor.
10. Any failure loops back to the owning agent.
11. When the flow may compact before the final gates, @retrospective-writer captures a compact checkpoint.
12. After a meaningful failure is resolved, the agent may ask whether the lesson should become a reusable skill or rule.
13. Approved work summaries archived under `.opencode/archive/<feature-slug>.md`.
14. @archiver writes the final archive record.
15. feature-lead synthesizes the final outcome.

## Context Bundle
Create only for new features. Skip if no active feature and user is continuing work.
- brief.html: why, outcome, business context, scope, constraints, default choice
- spec.html: contract, data flow, edge cases, risks, acceptance criteria
- task.html: ordered checklist, dependencies, owners
- notes.html: facts, decisions, blockers, links
- status.yaml: live execution state

Start from `.opencode/templates/planning-artifact.template.html`. Treat it as a block shell: use tables for rows, graph blocks for dependencies, ERD blocks for entities, flow blocks for sequences, matrix blocks for tradeoffs, timeline blocks for phases, and custom blocks for forms not yet anticipated. Each visible block must have canonical data in `<script id="artifact-data" type="application/json">` for AI-readable updates.

Reusable diagram blocks live in `.opencode/templates/blocks/` for activity, swimlane, use case, sequence, and C4 diagrams. Use them when the planning artifact needs a shared mental model instead of prose.

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
- Every subagent should receive an explicit, compact handoff packet from the previous agent — not a document dump.
- A repo delta check (via `git status`) guards against drift between artifact state and git state.
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

## Subagent Awareness — Tech Lead Notes

This system uses a **multi-agent (subagent) architecture**. Understanding how subagents work is critical for debugging, extending, and maintaining the kit.

### What is a Subagent?
- A subagent is an agent spawned by another agent (typically `feature-lead`) to handle a specialized slice of work.
- Each subagent runs in its own context window. It does **not** share memory with the parent agent.
- Communication between agents is purely through **explicit, compact handoff packets** — not shared state or long prompts.

### Handoff Protocol
- Before handing off, the calling agent produces a minimal context packet: feature slug, current status, approved scope, and next action.
- The receiving subagent reads this packet and operates independently.
- After completing its work, the subagent returns a result or updates `status.yaml` so the orchestrating agent can pick up.

### Why This Matters
| Risk | Mitigation |
|------|------------|
| Context loss between agents | Always pass explicit handoff packets, never rely on implicit memory |
| Conflicting edits | Agents gate on `status.yaml` stage before writing |
| Runaway subagents | Each agent has a bounded `steps` setting in config |
| Spec drift | Subagents must read from the canonical `spec.html`/`task.html`, not re-derive from conversation |
| Archive corruption | Only `feature-lead` may finalize archives, and only when `status.yaml` is `done` |

### Key Subagent Patterns
1. **Read before write** — every subagent starts by reading current status, never assumes a state.
2. **Compact output** — subagent results are brief: file paths changed, status update, blockers. No prose dumps.
3. **Gate before advance** — subagents must not advance the workflow stage without meeting the gate condition (see Gate Rules above).
4. **Fail loudly** — if a subagent encounters an ambiguity or missing input, it should surface a blocker rather than guess.
5. **No orphan context** — if a session may compact, `retrospective-writer` captures a checkpoint. No work is lost silently.

### Agent Permission Model
- Each agent declares its tool permissions in `config.template.json` under `agent.<name>.permission.task`.
- Default deny (`"*": "deny"`) means the agent cannot spawn other agents unless explicitly allowed.
- Use the permission map to reason about blast radius when a subagent fails.

### Extending the Subagent Network
- Add a new agent: create a `.md` file in `.opencode/agents/`, define role, scope, and gate conditions.
- Register permissions in `config.template.json`.
- Update `ARCHITECTURE.md` Role Map and Command Map accordingly.
- Do NOT add agents without a clear handoff pattern and a bounded `steps` cap.
