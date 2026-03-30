---
id: publish
name: Publish
description: Format and publish approved content
schedule: "manual"
executionMode: managed
owner: publisher
type: conditional
dependsOn:
  - fact-check
targeting:
  communities: []
  groups:
    - Publishing
  tags: []
  agents:
    - publisher
---

# Content Publishing

1. Take approved, reviewed content from the Review group
2. Format for the target platform (docs site, blog, wiki)
3. Add SEO metadata: title, description, keywords, open graph tags
4. Publish and verify the live page renders correctly
5. Post publication confirmation with link to Status group
