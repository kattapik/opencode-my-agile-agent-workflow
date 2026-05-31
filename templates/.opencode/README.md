# OpenCode Agent Kit

Spec-driven multi-agent system for OpenCode.

---

## Included

- 15 agents
- 15 skills
- 11 commands
- 1 runtime plugin

## Plannotator (Optional)

- This kit can integrate with Plannotator for browser-based plan review.
- If your project has `opencode.json` with the local `session-artifacts` plugin and `@plannotator/opencode@latest`, artifact tools and `submit_plan` become available.
- The template `opencode.json` included with this repo configures Plannotator in `plan-agent` mode and allows `feature-lead` to call `submit_plan` during `/plan`.
- Optional slash commands (installs globally):
  - macOS/Linux/WSL: `curl -fsSL https://plannotator.ai/install.sh | bash`
  - Windows PowerShell: `irm https://plannotator.ai/install.ps1 | iex`

## Runtime Spine

- `session-artifacts` keeps live feature state in `.opencode/artifacts/features/<feature-slug>/`.
- `.opencode/artifacts/` is local runtime state and should stay out of git.
- Agents should retrieve active state through artifact tools instead of carrying full bundle context.
- Archive writes a concise summary record to `.opencode/archive/<feature-slug>.md`, and finalization runs through the artifact plugin.

## Flow Shape

- The default spine is `/brainstorm -> /plan -> /create -> /test -> /review -> /archive`.
- The flow is not rigid. Commands can be reused mid-stream when the work needs them.
- Common examples:
  - Use `/brainstorm` again during implementation when a requirement turns ambiguous.
  - Use `/plan` again when scope changes materially.
  - Use `/test` before `/create` is fully done when a risky slice needs early proof.
  - Use `/review` on an intermediate slice before the full feature is complete.
  - Use `/archive` to preserve one finished slice even if the larger feature continues.

## Skill Design

- Each skill is a compact mental model, not a checklist.
- The description field names the trigger and the decision domain.
- Prefer the smallest skill that answers the next choice.

## Context Skills

- `context-gathering` maps the current project and active work.
- `context-archive` stores completed work summaries in `.opencode/archive/<feature-slug>.md`.
- `archive-writing` turns approved work into a compact archive note.
- `cross-model-regression` coordinates multi-agent regression sweeps across different reviewer models.
- `failure-learning` turns verified mistakes into reusable skills or rules when the lesson is worth keeping.
- `security-gate` decides when a change needs a security gate or redteam phase.
- `redteam-validation` simulates attacker behavior and proves exploitability.

## Commands

- Custom slash commands live in `.opencode/commands/`.
- Each command file uses Markdown frontmatter plus a prompt body, matching OpenCode's command format.
- The current command set is `archive`, `assign-models`, `brainstorm`, `check-progress`, `create`, `plan`, `reframe`, `review`, `rubber-duck`, `status`, and `test`.

## Primary Flow

1. @feature-lead receives the request.
2. `session_artifact_current` restores the live feature state.
3. @context-gatherer maps the current project state.
4. @project-planner and @system-analyst create or refresh the compact bundle: brief.html, spec.html, task.html, notes.html, and status.yaml.
5. @developer implements the approved spec from a canonical handoff packet.
6. @test-engineer, @security-auditor, and @pr-reviewer close the loop.
7. When a failure exposed a reusable lesson, ask whether to promote it into a skill or rule.
8. If the session may compact before the final gate, @retrospective-writer captures a checkpoint.
9. @archiver writes the completed work summary through the artifact plugin.

## Context Bundle

- Templates live in `.opencode/templates/` for quick bundle creation.
- brief.html: why, outcome, scope, constraints, default choice
- spec.html: contract, data flow, edge cases, risks, acceptance criteria
- task.html: ordered checklist, dependencies, owners
- notes.html: facts, decisions, blockers, links
- status.yaml: live execution state

- `status.yaml` is the live execution artifact; the HTML files stay as stable planning/reference context.
- Start from `.opencode/templates/planning-artifact.template.html` instead of a blank page.
- Treat planning HTML as a block system, not a fixed layout. Blocks may be `summary`, `table`, `flow`, `erd`, `graph`, `matrix`, `timeline`, `kanban`, `metric`, `checklist`, `decision`, `risk`, `evidence`, or `custom`.
- Keep planning HTML low-token: short text blocks, CSS-only layout, inline SVG when useful, tables for structured data, and `details` for context that is useful but not always visible.
- Put machine-readable input and every block's canonical data in `<script id="artifact-data" type="application/json">` so agents can update structure without rewriting long prose.
- Reusable blocks live in `.opencode/templates/blocks/` for all supported block types, including activity, swimlane, usecase, sequence, C4, ERD, graph, matrix, timeline, kanban, metric, evidence, and custom.
- `status.yaml.status` allowed values: `brainstorm`, `planning`, `implementation`, `verification`, `review`, `done`, `blocked`.

## Archive

- Completed work summaries live in `.opencode/archive/<feature-slug>.md`.
- Live artifacts in `.opencode/artifacts/` should not be committed.
- Keep the archive copy approved, compact, and read-only in practice.
- Archive only when `status.yaml` is `done`.
- Archive the outcome, not the full live bundle.
- Only the archive flow should finalize the archive summary.

## Agent Groups

| Group        | Agents                                                                                                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------- |
| Archive      | `archiver`                                                                                                        |
| Context      | `context-gatherer`                                                                                                |
| Primary      | `feature-lead`                                                                                                    |
| Coordination | `project-planner`                                                                                                 |
| Spec         | `system-analyst`                                                                                                  |
| Build        | `developer`, `frontend-specialist`, `backend-specialist`, `devops-engineer`                                      |
| Quality      | `test-engineer`, `security-auditor`, `performance-optimizer`, `debugger`, `pr-reviewer`                         |
| Learning     | `retrospective-writer`                                                                                            |

## Command Catalog

| Command        | Use When                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------- |
| archive        | Save an approved work summary into `.opencode/archive/<feature-slug>.md` for future reference. |
| assign-models  | Map available models to each agent, confirm the routing, and update the active OpenCode config. |
| brainstorm     | Explore options and clarify requirements before planning, or reopen ambiguity mid-flow.        |
| check-progress | Check current status, visible changes, remaining work, and the next best step.                |
| create         | Build new features, components, or project slices with a spec-driven flow.                    |
| plan           | Create or refresh structured task breakdowns and spec artifacts.                              |
| reframe        | Reset the framing when the output is off-target, unclear, or stuck repeating the same mistake. |
| review         | Review code against the spec, standards, and quality gates at any meaningful checkpoint.      |
| rubber-duck    | Think out loud, challenge assumptions, and isolate the real problem before changing anything. |
| status         | Check project health, docs, and operating readiness.                                          |
| test           | Run and generate tests for the codebase whenever proof is needed.                             |

## Skills

- context-gathering
- context-archive
- archive-writing
- cross-model-regression
- artifact-discipline
- clean-code
- brainstorming
- clarify-first
- plan-writing
- intelligent-routing
- frontend-design
- api-patterns
- session-closeout
- testing-patterns
- systematic-debugging
- code-philosophy
- security-gate
- redteam-validation
- failure-learning

## Repo Delta Guard

- `session_artifact_repo_delta` compares artifact-tracked files with actual git working tree changes.
- `session_artifact_data` reads the canonical JSON block data from an HTML artifact so agents can revise tables, graphs, ERDs, and custom visuals without parsing layout.
- Use it in `status`, `review`, and `archive` to catch drift before summaries or approval claims go stale.

## Routing Examples

- Add JWT auth -> @feature-lead -> @system-analyst -> @backend-specialist + @security-auditor -> @test-engineer
- Fix a UI bug -> @feature-lead -> @frontend-specialist -> @test-engineer -> @pr-reviewer
- Ship a multi-domain feature -> @feature-lead -> @project-planner -> specialist agents -> @pr-reviewer

## Rules

- Use the safest default when the downside is small.
- Ask only when scope, security, or architecture changes materially.
- Keep every handoff compact and explicit.
