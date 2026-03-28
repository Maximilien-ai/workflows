---
name: Ticket Triage
description: Triage and prioritize incoming support tickets
schedule: "*/30 * * * *"
executionMode: automated
type: recurring
dependsOn:
  - kickoff
targeting:
  communities: []
  groups:
    - Triage
  tags: []
  agents: []
---

# Ticket Triage Cycle

1. Pull all unassigned tickets since last triage
2. Categorize by priority (P0 = outage, P1 = broken feature, P2 = question, P3 = enhancement)
3. P0/P1: immediately assign to escalation engineer and notify support lead
4. P2/P3: assign to support agents based on current load and expertise
5. Update ticket status and post triage summary to Triage group