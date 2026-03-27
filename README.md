# opencode-agile-agent

Scaffold the OpenCode spec-driven agent kit into any project with one confirmation.

## Quick Start
- `npx opencode-agile-agent`
- `npx opencode-agile-agent@latest`
- `npx create-opencode-agile`

## Install Flow
- The installer asks one yes/no question.
- Framework, language, and project name are auto-detected.
- Confirmed installs copy `.opencode` and generate `AGENTS.md`.
- Declining exits immediately.

## What Gets Installed
- 25 agents
- 14 skills
- 7 commands
- Shared rules, docs, and project config

## Custom Commands
- `.opencode/commands/*.md` holds the slash commands.
- Each command uses Markdown frontmatter plus a prompt body, matching OpenCode's command format.
- The command set is `brainstorm`, `create`, `debug`, `plan`, `review`, `status`, and `test`.

## Design Notes
- Skills are compact, philosophy-first, and loaded by intent.
- `security-gate` decides when a change needs a security gate or redteam phase.
- `redteam-validation` simulates attacker behavior and proves exploitability.
- `qa-automation-engineer` is support-only for harness and CI plumbing, not the default test path.
- `orchestrator` is optional; default routing stays with `feature-lead` and the owning specialists.
- The compact planning bundle is proposal.md, goal.md, spec.md, task.md, and important.md.
- `@feature-lead` is the primary entry point; the rest are subagents.
- Completed feature bundles are archived in `.opencode/archive/<feature-slug>/`.

## Spec-Driven Flow
- `@feature-lead` is the primary entry point.
- `@context-gatherer` maps the current project before any planning or proof.
- `@project-planner` and `@system-analyst` build `proposal.md`, `goal.md`, `spec.md`, `task.md`, and `important.md`.
- `@developer` implements the approved spec.
- `@test-engineer`, `@security-auditor`, `@penetration-tester`, and `@pr-reviewer` close the loop.
- `@feature-lead` archives the completed bundle in `.opencode/archive/<feature-slug>/`.

## Template Source Of Truth
- `templates/.opencode` mirrors the project kit.
- Use `node bin/sync-templates.js` after editing `.opencode`.

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
