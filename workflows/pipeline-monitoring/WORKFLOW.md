---
name: Pipeline Monitoring
description: Hourly pipeline health check and failure alerting
schedule: "0 * * * *"
executionMode: automated
type: recurring
dependsOn:
  - kickoff
targeting:
  communities: []
  groups:
    - Pipeline
  tags: []
  agents: []
---

# Pipeline Monitoring

1. Check all scheduled ETL/ELT job statuses
2. Flag any failed or stalled pipelines with error details
3. Verify data freshness — check latest timestamps in key tables
4. For failures: notify the responsible data engineer and log incident
5. Post pipeline health summary to Status group
