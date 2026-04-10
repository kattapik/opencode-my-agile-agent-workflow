# AGENTS.md - opencode-agile-agent

> Project-specific instructions for AI agents working in this repo.

---

## Purpose

- This repo defines and maintains the reusable `.opencode` agile-agent kit.
- Treat `AGENTS.md` as a normal repo file, not a generated artifact.
- Keep installer and docs aligned with the actual kit behavior.

## Primary Flow

- Primary agent: `@feature-lead` or `@feature-loop` when the task needs iterative closure.
- First call: `@context-gatherer` to map current state before planning or proof.
- Use the compact context bundle:
  - `brief.md`
  - `spec.md`
  - `task.md`
  - `notes.md`
  - `status.yaml`
- `status.yaml` is the live execution source of truth.

## Archive Rule

- Archive the full context bundle only when `status.yaml.status = done`.
- Only the main agent finalizes and archives completed work.

## Repo-Specific Rules

- Do not reintroduce generated `AGENTS.md` behavior.
- Do not reintroduce `AGENTS.template.md`.
- Keep `.opencode` reusable; keep `AGENTS.md` project-specific.
- Remove dead workflow concepts instead of preserving compatibility with removed systems.
- Prefer small, explicit updates over broad speculative rewrites.

## Quality Bar

- Keep prompts, commands, templates, and docs mutually consistent.
- When changing workflow semantics, update the owning files in the same pass.
- Call out dead code, dead docs, stale commands, and drifted instructions during implementation and review.

## Useful Paths

- `.opencode/README.md`
- `.opencode/ARCHITECTURE.md`
- `.opencode/agents/`
- `.opencode/commands/`
- `.opencode/templates/`
- `bin/cli.js`
- `bin/validate-templates.js`
- `bin/sync-templates.js`
