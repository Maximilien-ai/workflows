---
id: ci-triage
name: CI Triage
description: Monitor and triage CI/CD pipeline failures
schedule: "0 * * * *"
executionMode: automated
type: recurring
dependsOn:
  - team-kickoff
targeting:
  communities: []
  groups:
    - DevOps
  tags: []
  agents:
    - devops
---

# CI Triage

1. Check CI pipeline for any failed builds or tests
2. Categorize failures: flaky test, real regression, infrastructure issue
3. For real regressions: identify the breaking commit and notify the author
4. For flaky tests: log the pattern and create a fix ticket
5. Post CI health summary to DevOps group
