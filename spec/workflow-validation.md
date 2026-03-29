# WORKFLOW.md Validation

This repository validates each `WORKFLOW.md` file with two layers:

1. JSON Schema for YAML frontmatter: [`spec/workflow-frontmatter.schema.json`](/Users/maximilien/github/Maximilien-ai/workflows/spec/workflow-frontmatter.schema.json)
2. Repository-specific structural checks in [`scripts/validate-workflows.mjs`](/Users/maximilien/github/Maximilien-ai/workflows/scripts/validate-workflows.mjs)

## What Gets Checked

- Required frontmatter fields exist and use the expected types
- `executionMode: managed` includes an `owner`
- `type: conditional` includes at least one `dependsOn` entry
- `schedule` is `manual`, `once`, or a 5-field cron expression
- At least one targeting bucket contains at least one entry
- The Markdown body exists and starts with an H1 heading
- `id`, `owner`, `agents`, and `dependsOn` values use normalized slug formats

## Local Commands

```bash
npm run setup
npm install
npm run validate:workflows
npm run lint
npm run ci
./setup.sh
./lint.sh
./test.sh
```
