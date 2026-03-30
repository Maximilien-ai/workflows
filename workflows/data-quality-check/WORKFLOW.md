---
id: data-quality-check
name: Data Quality Check
description: Daily data quality validation and anomaly detection
schedule: "0 8 * * *"
executionMode: automated
type: recurring
dependsOn:
  - team-kickoff
targeting:
  communities: []
  groups:
    - Pipeline
    - Analytics
  tags: []
  agents: []
---

# Daily Data Quality Check

1. Run schema validation on all ingested tables
2. Check for null rates, duplicate keys, and referential integrity
3. Compare row counts against expected ranges (detect drops or spikes)
4. Run statistical anomaly detection on key business metrics
5. Post quality scorecard to Status group — flag any violations
