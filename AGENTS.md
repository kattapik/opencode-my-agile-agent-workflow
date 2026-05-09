# Agent Instructions

## Purpose

- This project is an npm package for creating and running agents that can perform tasks on your behalf.
- It is built on top of the Open Code client.
- Treat it like a spec kit for agents: you can create new agents or reuse the ones already provided.

## Policy

- Do not edit the `/.opencode` folder. It is reserved for local agent development only.
- When updating the default agent templates, edit files in `/templates/.opencode` instead.
- Keep agent instructions direct, concise, and action-oriented.
- Preserve the existing structure unless a change is explicitly requested.

## Usage

- Run the package with `npx opencode-agile-agent`.
- To use it in another repository, install or run it there with the same command.

## Publish

- `npm version patch`
- `git add .`
- `git commit -m "update version"`
- `git push origin main`
- `npm publish --access public`
