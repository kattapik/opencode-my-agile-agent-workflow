#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, extname, join } from 'path';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageRoot = join(__dirname, '..');
const projectRoot = process.cwd();
const templatesDir = join(packageRoot, 'templates');

const requiredOpencodeFiles = [
  {
    path: ['.gitignore'],
    content: '/artifacts/\n/archive/\n',
  },
  {
    path: ['artifacts', 'README.md'],
    content: `# Artifacts\n\nLive feature state lives here.\n\nDo not commit this directory. The template ships a .opencode/.gitignore rule for /artifacts/ because this folder is session-local runtime state.\n`,
  },
  {
    path: ['archive', 'README.md'],
    content: `# Archive\n\nThis directory stores compact, durable summaries of finished work.\n\nArchive entries are summary-only: outcome, key changes, verification signal, and any follow-up.\n`,
  },
];

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
  - Merges .opencode into the current project.
  - Optionally merges opencode.json into the project root.

Commands:
  --help, -h   Show this help message
`);
  rl.close();
  process.exit(0);
}

function shouldCopyEntry(entry) {
  return entry.name !== 'node_modules';
}

function isAppendableTextFile(path) {
  return path.endsWith('.md') || path.endsWith('.txt') || path.endsWith('.gitignore');
}

function isJsonFile(path) {
  return extname(path) === '.json';
}

function appendUniqueContent(targetPath, sourceContent) {
  const targetContent = readFileSync(targetPath, 'utf8');
  const trimmedSource = sourceContent.trim();
  if (!trimmedSource || targetContent.includes(trimmedSource)) {
    return 'skipped';
  }

  const nextContent = `${targetContent.trimEnd()}\n\n${trimmedSource}\n`;
  writeFileSync(targetPath, nextContent);
  return 'appended';
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeJsonValues(targetValue, sourceValue) {
  if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
    const seen = new Set(targetValue.map((item) => JSON.stringify(item)));
    const merged = [...targetValue];
    for (const item of sourceValue) {
      const key = JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }
    return merged;
  }

  if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
    const merged = { ...sourceValue };
    for (const [key, value] of Object.entries(targetValue)) {
      if (Object.prototype.hasOwnProperty.call(sourceValue, key)) {
        merged[key] = mergeJsonValues(value, sourceValue[key]);
      } else {
        merged[key] = value;
      }
    }
    return merged;
  }

  return targetValue;
}

function mergeJsonFile(targetPath, sourceContent) {
  try {
    const sourceJson = JSON.parse(sourceContent);
    const targetJson = JSON.parse(readFileSync(targetPath, 'utf8'));
    const merged = mergeJsonValues(targetJson, sourceJson);
    const nextContent = `${JSON.stringify(merged, null, 2)}\n`;
    if (nextContent === readFileSync(targetPath, 'utf8')) {
      return 'skipped';
    }
    writeFileSync(targetPath, nextContent);
    return 'merged';
  } catch {
    return 'skipped';
  }
}

function mergeDirectory(sourceDir, targetDir, stats) {
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (!shouldCopyEntry(entry)) {
      continue;
    }

    if (entry.isDirectory()) {
      mergeDirectory(sourcePath, targetPath, stats);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!existsSync(targetPath)) {
      writeFileSync(targetPath, readFileSync(sourcePath));
      stats.created += 1;
      continue;
    }

    if (!statSync(targetPath).isFile()) {
      stats.skipped += 1;
      continue;
    }

    if (isJsonFile(sourcePath)) {
      const result = mergeJsonFile(targetPath, readFileSync(sourcePath, 'utf8'));
      if (result === 'merged') {
        stats.appended += 1;
      } else {
        stats.skipped += 1;
      }
      continue;
    }

    if (!isAppendableTextFile(sourcePath)) {
      stats.skipped += 1;
      continue;
    }

    const result = appendUniqueContent(targetPath, readFileSync(sourcePath, 'utf8'));
    if (result === 'appended') {
      stats.appended += 1;
    } else {
      stats.skipped += 1;
    }
  }
}

function mergeProjectConfig(templatesDir, projectRoot, stats) {
  const sourceConfig = join(templatesDir, 'opencode.json');
  if (!existsSync(sourceConfig) || !statSync(sourceConfig).isFile()) {
    return;
  }

  const targetJson = join(projectRoot, 'opencode.json');
  const targetJsonc = join(projectRoot, 'opencode.jsonc');
  if (!existsSync(targetJson) && existsSync(targetJsonc)) {
    // Avoid generating a second competing config file in repos that already
    // use JSONC. Ask the user to merge manually.
    stats.skipped += 1;
    log.warn('Found opencode.jsonc. Skipping opencode.json install; merge templates/opencode.json manually if desired.');
    return;
  }

  const sourceContent = readFileSync(sourceConfig, 'utf8');
  if (!existsSync(targetJson)) {
    writeFileSync(targetJson, sourceContent);
    stats.created += 1;
    return;
  }

  const result = mergeJsonFile(targetJson, sourceContent);
  if (result === 'merged') {
    stats.appended += 1;
  } else {
    stats.skipped += 1;
  }
}

function ensureRequiredOpencodeFiles(targetDir, stats) {
  for (const required of requiredOpencodeFiles) {
    const targetPath = join(targetDir, ...required.path);
    const parent = dirname(targetPath);
    if (!existsSync(parent)) {
      mkdirSync(parent, { recursive: true });
    }
    if (!existsSync(targetPath)) {
      writeFileSync(targetPath, required.content);
      stats.created += 1;
    }
  }
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
  }

  const stats = { created: 0, appended: 0, skipped: 0 };
  mergeDirectory(source, target, stats);
  ensureRequiredOpencodeFiles(target, stats);
  mergeProjectConfig(templatesDir, projectRoot, stats);

  log.success('Installed .opencode in merge mode.');
  log.info(`Created ${stats.created} files, appended ${stats.appended} text files, skipped ${stats.skipped} existing files.`);
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
