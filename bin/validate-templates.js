#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, '..', 'templates');

// Required files for templates
const requiredFiles = [
  '.opencode/README.md',
  '.opencode/ARCHITECTURE.md',
  '.opencode/config.template.json',
  '.opencode/package.json',
  '.opencode/agents/orchestrator.md',
  '.opencode/agents/feature-lead.md',
  '.opencode/agents/developer.md',
  '.opencode/agents/system-analyst.md',
  '.opencode/agents/pr-reviewer.md',
  '.opencode/skills/clean-code/SKILL.md',
  '.opencode/skills/plan-writing/SKILL.md',
  '.opencode/skills/testing-patterns/SKILL.md',
  '.opencode/workflows/create.md',
  '.opencode/workflows/plan.md',
  '.opencode/workflows/review.md',
  '.opencode/rules/coding-standards.md',
  '.opencode/rules/git-conventions.md',
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
