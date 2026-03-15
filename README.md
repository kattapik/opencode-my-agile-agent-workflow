# opencode-agile-agent

Scaffold OpenCode LLM SpecKit into any project with a single command.

## Quick Start

```bash
# default
npx opencode-agile-agent

# explicit latest (recommended for docs/releases)
npx opencode-agile-agent@latest

# legacy alias (still supported)
npx create-opencode-agile
```

## What This CLI Installs

This package copies a full .opencode template into your target project, including:

1. Specialist agents in .opencode/agents
2. Reusable skills in .opencode/skills
3. Workflow commands in .opencode/workflows
4. Shared rules in .opencode/rules
5. Project docs and config under .opencode
6. A generated AGENTS.md in project root

## Template Source Of Truth

The installer uses the folder below as the template source:

- templates/.opencode

This folder is now synced from the project .opencode kit so every npx install gets the same LLM SpecKit content.

## Installed Structure (Summary)

```text
your-project/
├── .opencode/
│   ├── agents/
│   ├── skills/
│   ├── workflows/
│   ├── rules/
│   ├── ARCHITECTURE.md
│   ├── README.md
│   ├── config.template.json
│   └── package.json
└── AGENTS.md
```

## Requirements

- Node.js 16+

## Development Notes

- Main CLI: bin/cli.js
- Template validator: bin/validate-templates.js
- Published files: bin, templates, README.md

## Validate Template Before Publish

```bash
node bin/validate-templates.js
```

## License

MIT
