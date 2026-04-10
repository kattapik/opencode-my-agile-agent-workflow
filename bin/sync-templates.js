#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join, sep } from 'path';
import { cpSync, existsSync, rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const sourceOpencode = join(rootDir, '.opencode');
const targetTemplates = join(rootDir, 'templates');

function skipNodeModules(path) {
  return !path.includes(`${sep}node_modules${sep}`) && !path.endsWith(`${sep}node_modules`);
}

if (!existsSync(sourceOpencode)) {
  console.error('Missing .opencode source directory.');
  process.exit(1);
}

if (!existsSync(targetTemplates)) {
  console.error('Missing templates directory.');
  process.exit(1);
}

const targetOpencode = join(targetTemplates, '.opencode');

if (existsSync(targetOpencode)) {
  rmSync(targetOpencode, { recursive: true, force: true });
}

cpSync(sourceOpencode, join(targetTemplates, '.opencode'), {
  recursive: true,
  overwrite: true,
  filter: skipNodeModules,
});

console.log('Synced .opencode to templates/');
