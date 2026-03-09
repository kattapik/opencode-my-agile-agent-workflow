#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, cpSync, writeFileSync, readFileSync } from 'fs';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = join(__dirname, '..', 'templates');

// Colors for terminal output
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
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// ASCII Art Banner
const banner = `
${colors.cyan}╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ${colors.bright}OpenCode Agile Agent - Spec-Driven Development${colors.reset}${colors.cyan}     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝${colors.reset}
`;

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify question
const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

// Detect project framework
async function detectProjectFramework() {
  const packageJsonPath = join(process.cwd(), 'package.json');
  
  if (!existsSync(packageJsonPath)) {
    return { framework: 'unknown', language: 'javascript' };
  }
  
  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    // Detect framework
    if (deps['next']) return { framework: 'next', language: 'typescript' };
    if (deps['nuxt']) return { framework: 'nuxt', language: 'typescript' };
    if (deps['@angular/core']) return { framework: 'angular', language: 'typescript' };
    if (deps['svelte']) return { framework: 'svelte', language: 'typescript' };
    if (deps['vue'] || deps['vue2'] || deps['vue3']) return { framework: 'vue', language: 'typescript' };
    if (deps['react'] || deps['react-dom']) return { framework: 'react', language: 'typescript' };
    if (deps['express']) return { framework: 'express', language: 'typescript' };
    if (deps['fastify']) return { framework: 'fastify', language: 'typescript' };
    if (deps['nestjs'] || deps['@nestjs/core']) return { framework: 'nestjs', language: 'typescript' };
    
    // Check for TypeScript
    const hasTypeScript = deps['typescript'] || existsSync(join(process.cwd(), 'tsconfig.json'));
    
    return { 
      framework: 'generic', 
      language: hasTypeScript ? 'typescript' : 'javascript' 
    };
  } catch {
    return { framework: 'unknown', language: 'javascript' };
  }
}

// Framework options
const frameworkOptions = [
  { name: 'React', value: 'react' },
  { name: 'Vue.js', value: 'vue' },
  { name: 'Next.js', value: 'next' },
  { name: 'Nuxt.js', value: 'nuxt' },
  { name: 'Angular', value: 'angular' },
  { name: 'Svelte', value: 'svelte' },
  { name: 'NestJS', value: 'nestjs' },
  { name: 'Express', value: 'express' },
  { name: 'Fastify', value: 'fastify' },
  { name: 'Generic / Other', value: 'generic' },
];

// Generate AGENTS.md based on project config
function generateAgentsMd(config) {
  const { projectName, framework, language, styling, stateManagement, testing } = config;
  
  return `# AGENTS.md - ${projectName}

> **Instructions for AI agents working on this project**
> 
> This file defines _how_ to build. For _what_ to build, see feature requirements.

---

## 📦 Project Stack

- **Framework:** ${framework.charAt(0).toUpperCase() + framework.slice(1)}
- **Language:** ${language.charAt(0).toUpperCase() + language.slice(1)}
- **Styling:** ${styling}
- **State Management:** ${stateManagement}
- **Testing:** ${testing}

---

## 📚 Core Documentation (CRITICAL)

Before making architectural or styling decisions, **review** these documents:

| Document | Purpose | Location |
|----------|---------|----------|
| API Standards | API response structure, error handling | \`docs/api-standards.md\` |
| UI Standards | Styling rules, component patterns | \`docs/ui-standards.md\` |
| Code Style | Linting, formatting rules | \`.eslintrc.js\`, \`.prettierrc\` |
| Architecture | System design, data flow | \`docs/architecture.md\` |

---

## 🎨 Code Conventions

### File Naming

| Type | Pattern | Example |
|------|---------|---------|
| Components | \`PascalCase.tsx\` | \`UserCard.tsx\` |
| Pages | \`PascalCasePage.tsx\` | \`LoginPage.tsx\` |
| Stores | \`camelCase.store.ts\` | \`auth.store.ts\` |
| Hooks/Composables | \`useCamelCase.ts\` | \`useAuth.ts\` |
| Types | \`camelCase.types.ts\` | \`user.types.ts\` |
| Utils | \`camelCase.utils.ts\` | \`date.utils.ts\` |
| API | \`camelCase.api.ts\` | \`auth.api.ts\` |
| Tests | \`*.test.ts\` or \`*.spec.ts\` | \`auth.test.ts\` |

### Code Style

- **Indentation:** 2 spaces
- **Quotes:** single
- **Semicolons:** required
- **Line Width:** 100
- **Trailing Commas:** es5

---

## 🔧 Project-Specific Rules

<!-- ADD YOUR CUSTOM RULES HERE -->

### Rule 1: Error Handling

Always use proper error typing:

\`\`\`typescript
// ✅ GOOD
try {
  await saveUser(user);
} catch (err: unknown) {
  const e = err as { response?: { data?: { message?: string } } };
  error.value = e.response?.data?.message ?? 'Operation failed';
}

// ❌ BAD
catch (err: any) {
  error.value = err.message;
}
\`\`\`

### Rule 2: Type Safety

Always use explicit types, never \`any\`:

\`\`\`typescript
// ✅ GOOD
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  return api.get(\`/users/\${id}\`);
}

// ❌ BAD
function getUser(id: any): any {
  return api.get(\`/users/\${id}\`);
}
\`\`\`

---

## 🧪 Testing Standards

### Unit Tests

\`\`\`typescript
describe('useAuthStore', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should login successfully', async () => {
    // Arrange
    const credentials = { email: 'test@example.com', password: 'password' };
    
    // Act
    await authStore.login(credentials);
    
    // Assert
    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.user).toBeDefined();
  });
});
\`\`\`

### Test Coverage

- **Minimum:** 70% coverage
- **Target:** 80% coverage
- **Critical paths:** 100% coverage (auth, payments, etc.)

---

## 🚀 Quick Reference

### Commands

\`\`\`bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Lint check
npm run format       # Format code
npm run type-check   # TypeScript check (if applicable)
\`\`\`

### Important Files

\`\`\`
src/
├── components/      # Reusable components
├── pages/           # Page components
├── stores/          # State management
├── api/             # API calls
├── types/           # TypeScript types
├── utils/           # Utility functions
└── hooks/           # Custom hooks/composables
\`\`\`

---

## 💡 Key Reminders

1. **Follow existing patterns** - Check similar files first
2. **Handle errors gracefully** - Always use try/catch/finally
3. **Think about loading states** - UX matters
4. **Use TypeScript strictly** - No \`any\` types
5. **Test your code** - Write tests for critical logic

---

**Keep this file updated as the project evolves.**
`;
}

// Main installation function
async function install() {
  console.log(banner);
  
  log.title('🚀 OpenCode Agile Agent Installer');
  
  // Check if .opencode already exists
  const opencodePath = join(process.cwd(), '.opencode');
  if (existsSync(opencodePath)) {
    log.warn('.opencode directory already exists!');
    const overwrite = await question('Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      log.info('Installation cancelled.');
      rl.close();
      return;
    }
  }
  
  // Detect project
  log.info('Detecting project configuration...');
  const detected = await detectProjectFramework();
  
  log.info(`Detected: ${detected.framework} (${detected.language})`);
  
  // Ask for project details
  log.title('📝 Project Configuration');
  
  // Project name
  let projectName = '';
  try {
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));
    projectName = packageJson.name || 'My Project';
  } catch {
    projectName = 'My Project';
  }
  
  const customName = await question(`Project name (${projectName}): `);
  projectName = customName || projectName;
  
  // Framework selection
  log.info('\nAvailable frameworks:');
  frameworkOptions.forEach((opt, i) => {
    const marker = opt.value === detected.framework ? ' (detected)' : '';
    console.log(`  ${i + 1}. ${opt.name}${marker}`);
  });
  
  const frameworkInput = await question(`Select framework (1-${frameworkOptions.length}) [default: ${detected.framework}]: `);
  let framework = detected.framework;
  if (frameworkInput) {
    const idx = parseInt(frameworkInput) - 1;
    if (idx >= 0 && idx < frameworkOptions.length) {
      framework = frameworkOptions[idx].value;
    }
  }
  
  // Language
  const languageInput = await question(`Language (typescript/javascript) [default: ${detected.language}]: `);
  const language = languageInput || detected.language;
  
  // Styling
  const stylingInput = await question(`Styling (tailwind/css-modules/styled-components/scss/other) [default: tailwind]: `);
  const styling = stylingInput || 'tailwind';
  
  // State management
  const stateInput = await question(`State management (pinia/zustand/redux/none) [default: none]: `);
  const stateManagement = stateInput || 'none';
  
  // Testing
  const testingInput = await question(`Testing (jest/vitest/mocha/none) [default: vitest]: `);
  const testing = testingInput || 'vitest';
  
  const config = { projectName, framework, language, styling, stateManagement, testing };
  
  log.title('📦 Installing OpenCode Agile Agent...');
  
  // Create .opencode directory
  try {
    // Copy templates
    log.info('Copying templates...');
    
    // Create .opencode directory
    if (!existsSync(opencodePath)) {
      mkdirSync(opencodePath, { recursive: true });
    }
    
    // Copy all template files
    const templateOpencode = join(templatesDir, '.opencode');
    if (existsSync(templateOpencode)) {
      cpSync(templateOpencode, opencodePath, { recursive: true, overwrite: true });
      log.success('Templates copied successfully');
    } else {
      log.error('Templates directory not found!');
      rl.close();
      return;
    }
    
    // Generate AGENTS.md
    log.info('Generating AGENTS.md...');
    const agentsMd = generateAgentsMd(config);
    writeFileSync(join(process.cwd(), 'AGENTS.md'), agentsMd);
    log.success('AGENTS.md generated');
    
    // Success message
    log.title('✅ Installation Complete!');
    
    console.log(`
${colors.green}OpenCode Agile Agent has been installed successfully!${colors.reset}

${colors.cyan}What's included:${colors.reset}
  ✓ .opencode/agents/       - 4 specialized agents (Feature Lead, System Analyst, Developer, PR Reviewer)
  ✓ .opencode/skills/       - Code philosophy and best practices
  ✓ .opencode/README.md     - Complete documentation
  ✓ AGENTS.md               - Project-specific coding standards

${colors.cyan}Next steps:${colors.reset}
  1. Review and customize AGENTS.md for your project
  2. Start using agents with your AI assistant
  3. Read .opencode/README.md for detailed workflow

${colors.cyan}Example usage:${colors.reset}
  "I want to implement user authentication with JWT"
  
  The agents will:
  → Gather requirements
  → Create specs and task breakdown
  → Implement the feature
  → Review code quality
  → ✅ Deliver production-ready code

${colors.yellow}Happy coding with AI-powered agile development! 🚀${colors.reset}
`);
    
  } catch (error) {
    log.error(`Installation failed: ${error.message}`);
    console.error(error);
  }
  
  rl.close();
}

// Run installation
install().catch((error) => {
  log.error(`Unexpected error: ${error.message}`);
  console.error(error);
  rl.close();
  process.exit(1);
});
