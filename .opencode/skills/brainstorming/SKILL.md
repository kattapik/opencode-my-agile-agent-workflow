---
name: brainstorming
description: Socratic questioning and discovery techniques for exploring ideas and requirements.
version: 1.0.0
---

# Brainstorming

Socratic questioning and discovery techniques for exploring ideas and clarifying requirements.

## The Socratic Method

Ask questions to guide discovery rather than providing answers.

### Core Questions

1. **What is the problem?**
   - What are you trying to solve?
   - Who has this problem?
   - Why does it matter?

2. **What are the constraints?**
   - What's the timeline?
   - What's the budget?
   - What technical limitations exist?

3. **What does success look like?**
   - How will you measure success?
   - What's the definition of done?
   - What would failure look like?

## Question Frameworks

### 5 Whys

Dig deeper into root causes:

```
Problem: Users aren't completing checkout

Why? → Form is too long
Why? → We're asking for too much information
Why? → We want complete user profiles
Why? → Marketing wants demographic data
Why? → To improve targeting

Root cause: Marketing needs vs. UX needs conflict
```

### SCAMPER

Explore alternatives:

| Question | Prompt |
|----------|--------|
| **S**ubstitute | What can be replaced? |
| **C**ombine | What can be merged? |
| **A**dapt | What can be adjusted? |
| **M**odify | What can be changed? |
| **P**ut to other use | What else can it do? |
| **E**liminate | What can be removed? |
| **R**everse | What can be inverted? |

### Six Thinking Hats

Explore from different perspectives:

| Hat | Focus |
|-----|-------|
| **White** | Facts and data |
| **Red** | Emotions and feelings |
| **Black** | Risks and problems |
| **Yellow** | Benefits and value |
| **Green** | Creativity and alternatives |
| **Blue** | Process and control |

## Discovery Process

### Phase 1: Understand the Request

```markdown
Initial request: "Build a dashboard"

Questions to ask:
- Who will use this dashboard?
- What decisions will they make from it?
- What data do they need?
- How often will they use it?
- What devices will they use?
```

### Phase 2: Explore Options

```markdown
Options for dashboard:
1. Real-time monitoring dashboard
2. Analytics dashboard with charts
3. Task management dashboard
4. Executive summary dashboard

Trade-offs:
- Real-time vs. historical data
- Simple vs. detailed
- Mobile vs. desktop priority
```

### Phase 3: Define Scope

```markdown
In Scope:
- [Feature 1]
- [Feature 2]

Out of Scope:
- [Feature X]
- [Feature Y]

MVP:
- [Minimum viable feature set]
```

### Phase 4: Validate Understanding

```markdown
"So what I'm hearing is:
- You need [X]
- For [audience]
- To solve [problem]
- With [constraints]

Is that correct?"
```

## Question Templates

### For New Features

```markdown
1. What problem does this solve?
2. Who is the target user?
3. How are they solving this today?
4. What would make this feature a success?
5. What are the must-haves vs. nice-to-haves?
6. What's the timeline?
7. Are there any technical constraints?
8. Are there any design preferences?
```

### For Bug Fixes

```markdown
1. What's the expected behavior?
2. What's the actual behavior?
3. When did this start happening?
4. Can you reproduce it reliably?
5. What steps reproduce it?
6. What have you tried to fix it?
7. Who is affected by this?
8. How urgent is this?
```

### For Performance Issues

```markdown
1. What's slow?
2. How slow is it? (measure)
3. When is it slow?
4. Has it always been slow?
5. What changed recently?
6. What's the target performance?
7. What metrics matter most?
```

### For Architecture Decisions

```markdown
1. What are we trying to achieve?
2. What are the constraints?
3. What are the options?
4. What are the trade-offs of each?
5. What's the impact of each option?
6. How reversible is this decision?
7. What's the cost of waiting?
```

## Facilitation Techniques

### Dot Voting

```markdown
Options:
- Option A •••• (4 votes)
- Option B •• (2 votes)
- Option C ••• (3 votes)

→ Proceed with Option A
```

### Impact/Effort Matrix

```
         High Impact
              │
   Quick Wins │ Major Projects
──────────────┼──────────────
  Fill-ins    │ Money Pits
              │
         Low Impact
    Low Effort      High Effort
```

### Affinity Mapping

```markdown
Group related ideas:

[Performance]     [Security]      [UX]
- Load time      - Auth          - Navigation
- Caching        - Encryption    - Responsive
- CDN            - Validation    - Accessibility
```

## Anti-Patterns to Avoid

### Leading Questions

```
❌ "Don't you think we should use React?"
✅ "What frontend framework are you considering?"
```

### Yes/No Questions

```
❌ "Do you need authentication?"
✅ "Tell me about your authentication requirements."
```

### Assumptions

```
❌ "I assume you want dark mode."
✅ "Do you have preferences for the visual theme?"
```

### Solutionizing

```
❌ "We should build it with microservices."
✅ "What are your scalability requirements?"
```

---

**Good questions lead to better solutions.**
