---
name: intelligent-routing
description: Automatic agent detection and routing based on task keywords and context.
version: 1.0.0
---

# Intelligent Routing

Automatically detect which agent(s) should handle a task based on keywords and context.

## How It Works

1. **Analyze** the user request for keywords and patterns
2. **Detect** relevant domains (frontend, backend, security, etc.)
3. **Select** appropriate specialist agent(s)
4. **Announce** which agent is being used
5. **Execute** with specialist expertise

## Keyword Detection Matrix

### Frontend

| Keywords | Agent |
|----------|-------|
| component, react, vue, angular, svelte | `frontend-specialist` |
| css, style, tailwind, scss, styled | `frontend-specialist` |
| ui, ux, design, layout, responsive | `frontend-specialist` |
| page, route, navigation, menu | `frontend-specialist` |
| form, input, button, modal | `frontend-specialist` |
| state, redux, zustand, context | `frontend-specialist` |

### Backend

| Keywords | Agent |
|----------|-------|
| api, endpoint, route, rest, graphql | `backend-specialist` |
| server, express, fastify, nestjs | `backend-specialist` |
| authentication, auth, login, jwt | `backend-specialist` + `security-auditor` |
| database, sql, prisma, sequelize | `database-architect` |
| migration, schema, table, index | `database-architect` |

### Security

| Keywords | Agent |
|----------|-------|
| security, vulnerability, cve, owasp | `security-auditor` |
| encrypt, decrypt, hash, password | `security-auditor` |
| xss, sql injection, csrf | `security-auditor` |
| penetration, pentest, exploit | `penetration-tester` |
| audit, compliance, gdpr | `security-auditor` |

### Testing

| Keywords | Agent |
|----------|-------|
| test, jest, vitest, mocha | `test-engineer` |
| e2e, playwright, cypress | `test-engineer` |
| coverage, tdd, unit test | `test-engineer` |
| qa, automation, pipeline | `qa-automation-engineer` |

### DevOps

| Keywords | Agent |
|----------|-------|
| deploy, deployment, release | `devops-engineer` |
| docker, container, kubernetes | `devops-engineer` |
| ci/cd, pipeline, github actions | `devops-engineer` |
| infrastructure, terraform, aws | `devops-engineer` |

### Performance

| Keywords | Agent |
|----------|-------|
| performance, slow, optimize, fast | `performance-optimizer` |
| bundle, size, lazy load | `performance-optimizer` |
| lighthouse, core web vitals | `performance-optimizer` |

### Debugging

| Keywords | Agent |
|----------|-------|
| bug, error, fix, broken | `debugger` |
| debug, crash, exception | `debugger` |
| issue, problem, not working | `debugger` |

### Planning

| Keywords | Agent |
|----------|-------|
| plan, roadmap, milestone | `project-planner` |
| feature, requirement, spec | `project-planner` |
| architecture, design, decision | `project-planner` |
| brainstorm, idea, explore | `project-planner` |

### Mobile

| Keywords | Agent |
|----------|-------|
| mobile, ios, android, app | `mobile-developer` |
| react native, flutter, expo | `mobile-developer` |
| app store, play store | `mobile-developer` |

### SEO

| Keywords | Agent |
|----------|-------|
| seo, search, ranking, google | `seo-specialist` |
| meta, sitemap, robots | `seo-specialist` |
| structured data, schema | `seo-specialist` |

### Documentation

| Keywords | Agent |
|----------|-------|
| documentation, docs, readme | `documentation-writer` |
| api docs, reference, guide | `documentation-writer` |

### Games

| Keywords | Agent |
|----------|-------|
| game, unity, godot, unreal | `game-developer` |
| gameplay, mechanics, level | `game-developer` |

## Multi-Agent Detection

When multiple domains are detected, combine agents:

### Common Combinations

| Request Pattern | Agents |
|-----------------|--------|
| "Build a secure API" | `backend-specialist` + `security-auditor` |
| "Create a dashboard with database" | `frontend-specialist` + `database-architect` |
| "Fix slow page with tests" | `performance-optimizer` + `test-engineer` |
| "Deploy with monitoring" | `devops-engineer` + `performance-optimizer` |
| "Mobile app with auth" | `mobile-developer` + `security-auditor` |

## Detection Algorithm

```typescript
function detectAgents(request: string): Agent[] {
  const agents: Agent[] = [];
  const keywords = extractKeywords(request);
  
  // Check each domain
  if (matchesAny(keywords, FRONTEND_KEYWORDS)) {
    agents.push('frontend-specialist');
  }
  
  if (matchesAny(keywords, BACKEND_KEYWORDS)) {
    agents.push('backend-specialist');
  }
  
  if (matchesAny(keywords, SECURITY_KEYWORDS)) {
    agents.push('security-auditor');
  }
  
  // ... more domains
  
  // Default to orchestrator if no specific match
  if (agents.length === 0) {
    agents.push('orchestrator');
  }
  
  return agents;
}
```

## Announcement Pattern

When routing to an agent, announce the selection:

```
🤖 Applying @frontend-specialist + @backend-specialist...
```

## Context Passing

When invoking agents, pass full context:

```typescript
invokeAgent('backend-specialist', {
  task: 'Create authentication API',
  context: {
    userRequest: originalRequest,
    previousFindings: explorerResults,
    constraints: userPreferences
  }
});
```

---

**Intelligent routing ensures users get specialist help without needing to know the agent system.**
