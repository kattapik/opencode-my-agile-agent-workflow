#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join, sep } from 'path';
import { existsSync, mkdirSync, cpSync, rmSync } from 'fs';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');
const projectRoot = process.cwd();
const templatesDir = join(packageRoot, 'templates');

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
  - Copies .opencode into the current project.

Commands:
  --help, -h   Show this help message
`);
  rl.close();
  process.exit(0);
}

function shouldCopyPath(path) {
  return !path.includes(`${sep}node_modules${sep}`) && !path.endsWith(`${sep}node_modules`);
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

  const source = join(templatesDir, '.opencode');
  const target = join(projectRoot, '.opencode');

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

  log.success('Installed .opencode.');
  log.title('Done');
  console.log('Start with @feature-lead and add or update AGENTS.md manually if your repo needs one.');

  rl.close();
}

install().catch((error) => {
  log.error(`Unexpected error: ${error.message}`);
  console.error(error);
  rl.close();
  process.exit(1);
});
