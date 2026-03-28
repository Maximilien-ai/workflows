---
name: PR Review
description: Review open pull requests and provide feedback
schedule: "0 */2 * * *"
executionMode: automated
type: recurring
dependsOn:
  - kickoff
targeting:
  communities: []
  groups:
    - Engineering
  tags: []
  agents: []
---

# PR Review Cycle

1. List all open PRs that need review
2. For each PR: check code quality, test coverage, and adherence to patterns
3. Leave specific, actionable review comments
4. Approve PRs that meet standards; request changes on others
5. Flag any PRs open longer than 48 hours for tech lead attention