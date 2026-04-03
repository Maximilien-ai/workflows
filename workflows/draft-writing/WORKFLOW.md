---
id: draft-writing
name: Draft Writing
description: Daily writing check-in and draft progress tracking
schedule: 0 10 * * *
executionMode: automated
type: recurring
dependsOn:
  - outline-review
targeting:
  communities: []
  groups:
    - Drafts
  tags: []
  agents: []
---

# Daily Draft Progress

1. Each writer: post progress update on assigned drafts
2. Flag any blockers (missing source material, unclear requirements)
3. For completed drafts: move to Review group for fact-checking
4. Editor: review pipeline and adjust priorities if needed
5. Post content pipeline status to Status group
