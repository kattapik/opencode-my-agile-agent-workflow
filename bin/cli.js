#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join, sep } from 'path';
import { existsSync, mkdirSync, cpSync, writeFileSync, readFileSync, rmSync } from 'fs';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const templatesDir = join(rootDir, 'templates');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}[i]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[ok]${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}[!]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[x]${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

const banner = `
${colors.cyan}========================================${colors.reset}
${colors.cyan} OpenCode Agile Agent Installer ${colors.reset}
${colors.cyan} Spec-driven, one-prompt setup ${colors.reset}
${colors.cyan}========================================${colors.reset}
`;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
OpenCode Agile Agent Installer

Usage:
  opencode-agile-agent

What it does:
  - Asks one yes/no question.
  - Detects the project stack automatically.
  - Copies .opencode and generates AGENTS.md.

Commands:
  --help, -h   Show this help message
`);
  rl.close();
  process.exit(0);
}

function shouldCopyPath(path) {
  return !path.includes(`${sep}node_modules${sep}`) && !path.endsWith(`${sep}node_modules`);
}

function detectProjectContext() {
  const defaults = {
    projectName: 'My Project',
    framework: 'Generic',
    language: 'JavaScript',
    styling: 'Follow existing styles',
    stateManagement: 'None / follow existing patterns',
    testing: 'Follow existing tests',
  };

  const packageJsonPath = join(rootDir, 'package.json');

  if (!existsSync(packageJsonPath)) {
    return defaults;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const deps = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };
    const has = (name) => Boolean(deps[name]);

    const framework = has('next')
      ? 'Next.js'
      : has('nuxt')
        ? 'Nuxt.js'
        : has('@angular/core')
          ? 'Angular'
          : has('svelte')
          ? 'Svelte'
          : has('vue') || has('vue2') || has('vue3')
              ? 'Vue'
              : has('react-native') || has('expo')
                ? 'React Native'
              : has('react') || has('react-dom')
                ? 'React'
                : has('express')
                  ? 'Express'
                  : has('fastify')
                    ? 'Fastify'
                    : has('nestjs') || has('@nestjs/core')
                      ? 'NestJS'
                      : 'Generic';

    const language = has('typescript') || existsSync(join(rootDir, 'tsconfig.json'))
      ? 'TypeScript'
      : 'JavaScript';

    const styling = has('tailwindcss')
      ? 'Tailwind'
      : has('styled-components')
        ? 'Styled Components'
        : has('sass') || has('scss')
          ? 'SCSS'
          : has('css-modules')
            ? 'CSS Modules'
            : 'Follow existing styles';

    const stateManagement = has('pinia')
      ? 'Pinia'
      : has('zustand')
        ? 'Zustand'
        : has('redux') || has('@reduxjs/toolkit')
          ? 'Redux'
          : has('mobx')
            ? 'MobX'
            : 'None / follow existing patterns';

    const testing = has('vitest')
      ? 'Vitest'
      : has('jest')
        ? 'Jest'
        : has('playwright')
          ? 'Playwright'
          : has('cypress')
            ? 'Cypress'
            : 'Follow existing tests';

    return {
      ...defaults,
      projectName: packageJson.name || defaults.projectName,
      framework,
      language,
      styling,
      stateManagement,
      testing,
    };
  } catch {
    return defaults;
  }
}

function generateAgentsMd(context) {
  return `# AGENTS.md - ${context.projectName}

> Instructions for AI agents working on this project.
>
> How to build lives here; what to build comes from feature specs.

---

## Project Stack

- Framework: ${context.framework}
- Language: ${context.language}
- State Management: ${context.stateManagement}
- Styling: ${context.styling}
- Testing: ${context.testing}

---

## Core Documentation

Review these before making architectural or styling decisions:

| Document | Purpose | Location |
|----------|---------|----------|
| OpenCode README | Kit overview and flow | .opencode/README.md |
| OpenCode Architecture | Agent lifecycle and gates | .opencode/ARCHITECTURE.md |
| Agent prompts | Role-specific behavior | .opencode/agents/*.md |
| Commands | Custom slash commands | .opencode/commands/*.md |
| Rules | Shared coding standards | .opencode/rules/*.md |

---

## OpenCode Delivery Model

- Primary agent: @feature-lead
- First call: @context-gatherer maps the current project state before planning or proof.
- Other agents are subagents and are called with @ awareness.
- Security-sensitive work: @security-auditor first, then @penetration-tester for redteam validation when needed.

## Compact Context Bundle

- proposal.md: why, value, scope
- goal.md: target outcome, constraints, default choice
- spec.md: contract, data flow, edge cases, risks
- task.md: ordered checklist, dependencies, owners
- important.md: facts, blockers, links, decisions

## Archive

- Archive completed bundles in .opencode/archive/<feature-slug>/.

## Decision Style

- Default first: choose a safe default when the downside is small.
- Ask only when scope, security, or architecture changes materially.
- Keep handoffs compact and explicit.

---

## Code Conventions

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase.tsx | UserCard.tsx |
| Pages | PascalCasePage.tsx | LoginPage.tsx |
| Stores | camelCase.store.ts | auth.store.ts |
| Hooks/Composables | useCamelCase.ts | useAuth.ts |
| Types | camelCase.types.ts | user.types.ts |
| Utils | camelCase.utils.ts | date.utils.ts |
| API | camelCase.api.ts | auth.api.ts |
| Tests | *.test.ts or *.spec.ts | auth.test.ts |

### Code Style

- Indentation: 2 spaces
- Quotes: single
- Semicolons: required
- Line Width: 100
- Trailing Commas: es5

---

## Project-Specific Rules

- Keep changes aligned to the compact spec bundle.
- Prefer defaults when a tradeoff is low risk.
- Surface options only when the decision changes scope, security, or architecture.

---

## Architecture Patterns

### State Management

- Describe where state lives.
- Keep async work inside the owning module.
- Make loading and error states explicit.

### API Layer

- Keep request and response shapes explicit.
- Normalize errors near the boundary.
- Version breaking contract changes.

### Component Structure

- Keep presentation and side effects separated.
- Put validation near the boundary.
- Make loading and error states visible.

---

## Testing Standards

- Unit tests: pure logic and helper functions.
- Integration tests: API calls and service boundaries.
- E2E tests: critical user journeys.
- Quality gate: verify behavior before release.

---

## Quick Reference

- Validate templates: node bin/validate-templates.js
- Sync templates: node bin/sync-templates.js
- Entry point: @feature-lead
`;
}

async function install() {
  console.log(banner);
  log.title('OpenCode Agile Agent Installer');

  const confirm = await question('Install the OpenCode agent kit now? [y/N]: ');
  if (!/^y(es)?$/i.test(confirm.trim())) {
    log.info('Install cancelled.');
    rl.close();
    return;
  }

  const context = detectProjectContext();
  log.info(`Detected project: ${context.projectName} (${context.framework}, ${context.language})`);

  const source = join(templatesDir, '.opencode');
  const target = join(rootDir, '.opencode');

  if (!existsSync(templatesDir) || !existsSync(source)) {
    log.error('Template source not found.');
    rl.close();
    process.exitCode = 1;
    return;
  }

  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  } else {
    rmSync(target, { recursive: true, force: true });
    mkdirSync(target, { recursive: true });
  }

  cpSync(source, target, {
    recursive: true,
    overwrite: true,
    filter: shouldCopyPath,
  });
  writeFileSync(join(rootDir, 'AGENTS.md'), generateAgentsMd(context), 'utf-8');

  log.success('Installed .opencode and generated AGENTS.md.');
  log.title('Done');
  console.log('Start with @feature-lead and review .opencode/README.md for the flow.');

  rl.close();
}

install().catch((error) => {
  log.error(`Unexpected error: ${error.message}`);
  console.error(error);
  rl.close();
  process.exit(1);
});
