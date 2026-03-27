#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, '..', 'templates');

// Required files for templates
const requiredFiles = [
  'AGENTS.template.md',
  '.opencode/README.md',
  '.opencode/ARCHITECTURE.md',
  '.opencode/archive/README.md',
  '.opencode/config.template.json',
  '.opencode/package.json',
  '.opencode/memory/project.md',
  '.opencode/agents/context-gatherer.md',
  '.opencode/agents/api-designer.md',
  '.opencode/agents/backend-specialist.md',
  '.opencode/agents/code-archaeologist.md',
  '.opencode/agents/database-architect.md',
  '.opencode/agents/debugger.md',
  '.opencode/agents/developer.md',
  '.opencode/agents/devops-engineer.md',
  '.opencode/agents/documentation-writer.md',
  '.opencode/agents/explorer-agent.md',
  '.opencode/agents/feature-lead.md',
  '.opencode/agents/frontend-specialist.md',
  '.opencode/agents/game-developer.md',
  '.opencode/agents/mobile-developer.md',
  '.opencode/agents/orchestrator.md',
  '.opencode/agents/penetration-tester.md',
  '.opencode/agents/performance-optimizer.md',
  '.opencode/agents/pr-reviewer.md',
  '.opencode/agents/product-manager.md',
  '.opencode/agents/project-planner.md',
  '.opencode/agents/qa-automation-engineer.md',
  '.opencode/agents/security-auditor.md',
  '.opencode/agents/seo-specialist.md',
  '.opencode/agents/system-analyst.md',
  '.opencode/agents/test-engineer.md',
  '.opencode/commands/brainstorm.md',
  '.opencode/commands/create.md',
  '.opencode/commands/debug.md',
  '.opencode/commands/plan.md',
  '.opencode/commands/review.md',
  '.opencode/commands/status.md',
  '.opencode/commands/test.md',
  '.opencode/skills/api-patterns/SKILL.md',
  '.opencode/skills/brainstorming/SKILL.md',
  '.opencode/skills/clean-code/SKILL.md',
  '.opencode/skills/code-philosophy/SKILL.md',
  '.opencode/skills/context-archive/SKILL.md',
  '.opencode/skills/context-gathering/SKILL.md',
  '.opencode/skills/frontend-design/SKILL.md',
  '.opencode/skills/intelligent-routing/SKILL.md',
  '.opencode/skills/parallel-agents/SKILL.md',
  '.opencode/skills/plan-writing/SKILL.md',
  '.opencode/skills/redteam-validation/SKILL.md',
  '.opencode/skills/security-gate/SKILL.md',
  '.opencode/skills/systematic-debugging/SKILL.md',
  '.opencode/skills/testing-patterns/SKILL.md',
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
