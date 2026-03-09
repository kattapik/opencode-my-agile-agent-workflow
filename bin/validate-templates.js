#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, '..', 'templates');

// Required files for templates
const requiredFiles = [
  '.opencode/agents/feature-lead.md',
  '.opencode/agents/developer.md',
  '.opencode/agents/system-analyst.md',
  '.opencode/agents/pr-reviewer.md',
  '.opencode/skills/code-philosophy/SKILL.md',
  '.opencode/README.md',
  '.opencode/config.template.json',
  '.opencode/package.json',
];

let hasErrors = false;

// Check if templates directory exists
if (!existsSync(templatesDir)) {
  console.error('❌ Templates directory not found!');
  process.exit(1);
}

// Check each required file
requiredFiles.forEach(file => {
  const filePath = join(templatesDir, file);
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    console.log(`✓ ${file}`);
  } else {
    console.error(`✗ ${file} - Missing`);
    hasErrors = true;
  }
});

console.log('');
if (hasErrors) {
  console.error('❌ Validation failed! Some required files are missing.');
  process.exit(1);
} else {
  console.log('✅ All templates validated successfully!');
  process.exit(0);
}

// Check required files
console.log('Checking required files...');

// First check if main directories exist
const mainDirs = [
  '.opencode/agents',
  '.opencode/skills',
  '.opencode/skills/code-philosophy',
];

mainDirs.forEach(dir => {
  const dirPath = join(templatesDir, dir);
  if (existsSync(dirPath) && statSync(dirPath).isDirectory()) {
    console.log(`  ✓ ${dir}/`);
  } else {
    console.error(`  ✗ ${dir}/ - MISSING`);
    hasErrors = true;
    return;
  }
});

// Check for specific important files
const importantFiles = [
  '.opencode/agents/feature-lead.md',
  '.opencode/agents/developer.md',
  '.opencode/agents/system-analyst.md',
  '.opencode/agents/pr-reviewer.md',
  '.opencode/skills/code-philosophy/SKILL.md',
  '.opencode/README.md',
  '.opencode/config.template.json',
  '.opencode/package.json',
];

importantFiles.forEach(file => {
  const filePath = join(templatesDir, file);
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    console.log(`  ✓ ${file}`);
  } else {
    console.error(`  ✗ ${file} - MISSING`);
    hasErrors = true;
  }
});

// Check directory structure
console.log('\nChecking directory structure:');
const directories = [
  '.opencode/agents',
  '.opencode/skills',
  '.opencode/skills/code-philosophy',
];

directories.forEach(dir => {
  const dirPath = join(templatesDir, dir);
  if (existsSync(dirPath) && statSync(dirPath).isDirectory()) {
    const files = readdirSync(dirPath);
    console.log(`  ✓ ${dir}/ (${files.length} files)`);
  } else {
    console.error(`  ✗ ${dir}/ - MISSING`);
    hasErrors = true;
  }
});

console.log('');
if (hasErrors) {
  console.error('❌ Validation failed! Some required files are missing.');
  process.exit(1);
} else {
  console.log('✅ All templates validated successfully!\n');
  process.exit(0);
}
