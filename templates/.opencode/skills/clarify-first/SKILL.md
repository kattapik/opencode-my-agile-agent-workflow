# Clarify-First

## Philosophy
Ask before assuming. Clarify before coding. Iterate until clear.

## Triggers
- Ambiguous scope or multiple valid interpretations
- Missing business context or unclear user value
- Request could mean different things to different stakeholders
- Technical decision depends on unstated business priorities

## Core Moves
1. **Detect Ambiguity**: Pause when the request has more than one reasonable interpretation.
2. **Ask Iteratively**: Keep asking focused questions until scope, intent, and business value are clear. Do NOT proceed with assumptions.
3. **Offer Default + Trade-offs**: If the user has no idea, propose a default path with trade-offs. Let them choose or confirm.
4. **Record Answers**: Capture clarified context in brief.html before proceeding.

## Anti-Patterns
- Assuming intent without verification
- Proceeding with vague requirements
- Skipping business context to jump to technical solutions
- Making irreversible decisions without stakeholder alignment
- Asking once and proceeding despite remaining ambiguity
- Giving users a blank slate when they need a starting point

## Example
**Before**: "Add a dashboard"
**After**: "What metrics matter most? Who is the primary user? What decisions should this dashboard support?"
**If user says "I don't know"**: "Here's a default: a KPI overview for managers showing revenue, churn, and activation. Trade-off: less customizable but ships faster. Sound good, or want to adjust?"

## Integration
- Use before @system-analyst creates the spec bundle
- Use when @feature-lead receives an ambiguous request
- Use when @developer encounters unclear acceptance criteria
