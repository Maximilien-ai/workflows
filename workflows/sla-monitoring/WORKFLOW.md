---
name: SLA Monitoring
description: Monitor SLA compliance and flag at-risk tickets
schedule: "0 * * * *"
executionMode: automated
type: recurring
dependsOn:
  - kickoff
targeting:
  communities: []
  groups:
    - Status
  tags: []
  agents: []
---

# SLA Monitoring

1. Check all open tickets against SLA thresholds
2. Flag tickets approaching SLA breach (80% of allowed time)
3. For breached SLAs: notify support lead and escalate if needed
4. Calculate current SLA compliance rate and CSAT score
5. Post hourly SLA dashboard to Status group