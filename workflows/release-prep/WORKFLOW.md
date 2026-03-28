---
name: Release Prep
description: Prepare a release: changelog, version bump, final QA
schedule: "manual"
executionMode: managed
type: conditional
dependsOn:
  - pr-review
  - ci-triage
targeting:
  communities: []
  groups:
    - Engineering
    - QA
  tags: []
  agents: []
---

# Release Preparation

1. QA engineer: run full regression suite and report results
2. Tech lead: review all PRs merged since last release
3. Compile changelog from commit messages and PR descriptions
4. DevOps: prepare release branch and version bump
5. Final sign-off from tech lead, then trigger deployment