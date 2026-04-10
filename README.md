# opencode-agile-agent

Scaffold the OpenCode spec-driven agent kit into any project with one confirmation.

## Quick Start
- `npx opencode-agile-agent`
- `npx opencode-agile-agent@latest`
- `npx create-opencode-agile`

## Install Flow
- The installer asks one yes/no question.
- Framework, language, and project name are auto-detected.
- Confirmed installs copy `.opencode` into the current project root and generate `AGENTS.md` there.
- Declining exits immediately.

## Local Install
- Run `npx opencode-agile-agent` from the repo you want to set up.
- The installer writes to the current working directory, not the package directory.

## What Gets Installed
- 26 agents
- 14 skills
- 10 commands
- Shared rules, docs, and project config

## Custom Commands
- `.opencode/commands/*.md` holds the slash commands.
- Each command uses Markdown frontmatter plus a prompt body, matching OpenCode's command format.
- The command set is `brainstorm`, `create`, `debug`, `plan`, `progress`, `reframe`, `review`, `rubber-duck`, `status`, and `test`.

## Design Notes
- Skills are compact, philosophy-first, and loaded by intent.
- `security-gate` decides when a change needs a security gate or redteam phase.
- `redteam-validation` simulates attacker behavior and proves exploitability.
- `qa-automation-engineer` is support-only for harness and CI plumbing, not the default test path.
- `orchestrator` is optional; default routing stays with `feature-lead` and the owning specialists.
- The compact planning bundle is brief.md, spec.md, task.md, notes.md, and status.yaml.
- `@feature-lead` is the primary entry point; the rest are subagents.
- Completed feature bundles are archived in `.opencode/archive/<feature-slug>/`.

## Spec-Driven Flow
- `@feature-lead` is the primary entry point.
- `@context-gatherer` maps the current project before any planning or proof.
- `@project-planner` and `@system-analyst` build `brief.md`, `spec.md`, `task.md`, `notes.md`, and `status.yaml`.
- `@developer` implements the approved spec.
- `@test-engineer`, `@security-auditor`, `@penetration-tester`, and `@pr-reviewer` close the loop.
- `@feature-lead` archives the completed bundle in `.opencode/archive/<feature-slug>/`.

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
