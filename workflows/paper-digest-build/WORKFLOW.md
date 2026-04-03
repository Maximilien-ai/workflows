---
id: paper-digest-build
name: Paper Digest Build
description: Build a concise digest from recent paper summaries and cross-paper themes
schedule: manual
executionMode: managed
owner: trend-editor
type: conditional
dependsOn:
  - arxiv-topic-kickoff
targeting:
  communities: []
  groups:
    - Digest
  tags: []
  agents:
    - trend-editor
---

# Paper Digest Build

1. Gather the strongest summaries and selected papers for the digest
2. Identify major themes, disagreements, hype, and genuinely useful signal
3. Recommend which papers deserve deeper follow-up now
4. Turn the result into a concise, readable digest for the target audience
5. Post the final digest to Digest and the short summary to Status
