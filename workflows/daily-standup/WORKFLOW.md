---
id: daily-standup
name: Daily Standup
description: "Async daily standup — what was done, what's planned, blockers"
schedule: 30 9 * * *
executionMode: automated
type: recurring
dependsOn:
  - team-kickoff
targeting:
  communities: []
  groups:
    - Status
  tags: []
  agents: []
---

# Daily Standup

1. Each team member: post in Status group with three items:
   - What you completed since last standup
   - What you plan to work on today
   - Any blockers or questions
2. Tech lead: review blockers and assign help if needed
3. DevOps: report on infrastructure health and pending deployments
4. QA: report on test status and any new bugs found
