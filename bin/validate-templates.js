#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, '..', 'templates');

// Required files for templates
const requiredFiles = [
  'opencode.json',
  '.opencode/.gitignore',
  '.opencode/README.md',
  '.opencode/ARCHITECTURE.md',
  '.opencode/archive/README.md',
  '.opencode/artifacts/README.md',
  '.opencode/config.template.json',
  '.opencode/package.json',
  '.opencode/plugins/session-artifacts.ts',
  '.opencode/agents/retrospective-writer.md',
  '.opencode/agents/archiver.md',
  '.opencode/agents/context-gatherer.md',
  '.opencode/agents/backend-specialist.md',
  '.opencode/agents/debugger.md',
  '.opencode/agents/developer.md',
  '.opencode/agents/devops-engineer.md',
  '.opencode/agents/feature-lead.md',
  '.opencode/agents/frontend-specialist.md',
  '.opencode/agents/performance-optimizer.md',
  '.opencode/agents/pr-reviewer.md',
  '.opencode/agents/project-planner.md',
  '.opencode/agents/security-auditor.md',
  '.opencode/agents/system-analyst.md',
  '.opencode/agents/test-engineer.md',
  '.opencode/commands/brainstorm.md',
  '.opencode/commands/archive.md',
  '.opencode/commands/assign-models.md',
  '.opencode/commands/check-progress.md',
  '.opencode/commands/create.md',
  '.opencode/commands/plan.md',
  '.opencode/commands/reframe.md',
  '.opencode/commands/review.md',
  '.opencode/commands/rubber-duck.md',
  '.opencode/commands/status.md',
  '.opencode/commands/test.md',
  '.opencode/skills/api-patterns/SKILL.md',
  '.opencode/skills/archive-writing/SKILL.md',
  '.opencode/skills/artifact-discipline/SKILL.md',
  '.opencode/skills/brainstorming/SKILL.md',
  '.opencode/skills/clarify-first/SKILL.md',
  '.opencode/skills/clean-code/SKILL.md',
  '.opencode/skills/code-philosophy/SKILL.md',
  '.opencode/skills/context-archive/SKILL.md',
  '.opencode/skills/context-gathering/SKILL.md',
'.opencode/skills/intelligent-routing/SKILL.md',
  '.opencode/skills/plan-writing/SKILL.md',
  '.opencode/skills/security-gate/SKILL.md',
  '.opencode/skills/systematic-debugging/SKILL.md',
  '.opencode/skills/testing-patterns/SKILL.md',
  '.opencode/templates/review-summary.template.md',
  '.opencode/templates/session-summary.template.md',
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
