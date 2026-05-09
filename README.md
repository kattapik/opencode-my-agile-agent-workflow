# opencode-agile-agent

Scaffold the OpenCode spec-driven agent kit into any project with one confirmation.

## Quick Start
- `npx opencode-agile-agent`
- `npx opencode-agile-agent@latest`
- `npx create-opencode-agile`

## Example Command Flow

### Start a new project
1. Run `npx opencode-agile-agent` inside the repo you want to set up.
2. Ask the main agent to clarify the project direction first.
3. Use `/brainstorm` if the idea is still fuzzy.
4. Use `/plan` once the scope is clear enough to turn into `brief.md`, `spec.md`, `task.md`, `notes.md`, and `status.yaml`.
5. Use `/create` when you want the first implementation pass to begin.
6. Use `/test` and `/review` before considering the first slice done.
7. Use `/archive` when the finished slice is approved and worth preserving as a summary.

Example:
```text
/brainstorm build a small SaaS app for tracking invoices for freelancers
/plan turn this into an MVP with auth, invoice CRUD, and dashboard
/create implement the MVP from the approved plan
/test cover the critical flows
/review check if this is safe to ship
/archive summarize what shipped in the approved MVP slice
```

### Start a new feature in an existing project
1. Start with `/brainstorm` if the request is ambiguous.
2. Use `/plan` to define the feature boundary and acceptance criteria.
3. Use `/create` to implement the approved feature slice.
4. Use `/test` to verify behavior and nearby paths.
5. Use `/review` for the final quality gate.
6. Use `/archive` after approval to store a finished work summary.
7. Use `/status` anytime you want a compact progress snapshot.

Example:
```text
/plan add team invitations with email, role selection, and acceptance flow
/create implement the invitations feature
/test verify invite creation, email sending, and acceptance flow
/review check for regressions, dead code, and spec drift
/archive summarize the approved invitations slice
```

## Install Flow
- The installer asks one yes/no question.
- Framework, language, and project name are auto-detected.
- Confirmed installs merge `.opencode` into the current project root instead of replacing it.
- If `templates/opencode.json` exists, the installer also creates or merges `opencode.json` in the project root.
- If the project already uses `opencode.jsonc` (and not `opencode.json`), the installer skips config installation to avoid creating a competing config file.
- Missing files are created. Existing `.md`, `.txt`, and `.gitignore` files receive appended template content when it is not already present.
- Existing `.json` files are merged key-wise without clobbering existing values. Other structured files like `.ts` and `.yaml` are left in place and are not overwritten.
- Declining exits immediately.

## Local Install
- Run `npx opencode-agile-agent` from the repo you want to set up.
- The installer writes to the current working directory, not the package directory.

## What Gets Installed
- 15 agents
- 15 skills
- 11 commands
- 1 runtime plugin
- Shared rules, docs, and project config

## Plannotator Integration

- The template includes `templates/opencode.json` with `@plannotator/opencode@latest` configured.
- With Plannotator enabled, `/plan` will use `submit_plan` (when available) to open a browser UI for plan approval and feedback.

## Custom Commands
- `.opencode/commands/*.md` holds the slash commands.
- Each command uses Markdown frontmatter plus a prompt body, matching OpenCode's command format.
- The command set is `archive`, `assign-models`, `brainstorm`, `check-progress`, `create`, `plan`, `reframe`, `review`, `rubber-duck`, `status`, and `test`.

## Design Notes
- Skills are compact, philosophy-first, and loaded by intent.
- `artifact-discipline` and `clean-code` are the core quality spine.
- `session-artifacts` is the runtime spine that preserves active feature state and safe handoffs.
- `retrospective-writer` captures reusable lessons from real failures and asks whether they should become a skill or rule.
- `archiver` is a dedicated archive-summary agent, not just a final step bolted onto the lead.
- `session_artifact_repo_delta` guards summaries and reviews against drift from the real git state.
- The compact planning bundle is brief.md, spec.md, task.md, notes.md, and status.yaml.
- `@feature-lead` is the primary entry point; the rest are subagents.
- `.opencode/artifacts/` is local runtime state and is git-ignored by the installed template.
- Completed work summaries are archived in `.opencode/archive/<feature-slug>.md`.

## Flow Notes
- The default command spine is `/brainstorm -> /plan -> /create -> /test -> /review -> /archive`.
- The flow is not rigid. You can reuse commands mid-stream when the work needs them.
- Examples:
  - `/brainstorm` again when implementation reveals ambiguity.
  - `/plan` again when scope changes materially.
  - `/test` on an intermediate risky slice.
  - `/review` before the whole feature is finished.
  - `/archive` for one completed slice while larger work continues.

## Spec-Driven Flow
- `@feature-lead` is the primary entry point.
- `session_artifact_current` restores active feature state before deeper work.
- `@context-gatherer` maps the current project before any planning or proof.
- `@project-planner` and `@system-analyst` build `brief.md`, `spec.md`, `task.md`, `notes.md`, and `status.yaml`.
- `@developer` implements the approved spec.
- `@test-engineer`, `@retrospective-writer`, `@security-auditor`, and `@pr-reviewer` close the loop.
- When a resolved failure exposes a durable lesson, ask whether to promote it into a reusable skill or rule.
- `@feature-lead` archives the completed work summary in `.opencode/archive/<feature-slug>.md` through the artifact finalizer.

## Template Source Of Truth
- `templates/.opencode` mirrors the project kit.
- Use `node bin/sync-templates.js` after editing `.opencode`.
- `AGENTS.md` is generated per installed project and is not stored as a reusable template.

## Requirements
- Node.js 16+

## Development Notes
- Main CLI: `bin/cli.js`
- Template validator: `bin/validate-templates.js`
- Template sync: `bin/sync-templates.js`

## Validate Template Before Publish
- `node bin/validate-templates.js`

## License
- MIT
