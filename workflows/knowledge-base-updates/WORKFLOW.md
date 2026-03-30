---
name: Knowledge Base Updates
description: Weekly KB gap analysis and article updates
schedule: 0 10 * * 5
executionMode: managed
type: recurring
dependsOn:
  - ticket-triage
  - sla-monitoring
targeting:
  communities: []
  groups:
    - Knowledge Base
  tags: []
  agents:
    - knowledge-mgr
---
# Weekly KB Review

1. Analyze resolved tickets from the past week — identify recurring questions
2. Check if existing KB articles cover the top 10 ticket topics
3. Draft new articles for any gaps found
4. Update outdated articles based on product changes
5. Post KB update summary and link new articles in Knowledge Base group
