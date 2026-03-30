# WORKFLOW.md Validation

This repository validates each `WORKFLOW.md` file with two layers:

1. JSON Schema for YAML frontmatter: [`spec/workflow-frontmatter.schema.json`](/Users/maximilien/github/Maximilien-ai/workflows/spec/workflow-frontmatter.schema.json)
2. Repository-specific structural checks in [`scripts/validate-workflows.mjs`](/Users/maximilien/github/Maximilien-ai/workflows/scripts/validate-workflows.mjs)

## What Gets Checked

- Required frontmatter fields exist and use the expected types
- `id` is required, slug-like, and matches the workflow name
- `executionMode: managed` includes an `owner`
- `type: conditional` includes at least one `dependsOn` entry
- `schedule` is `manual`, `once`, or a 5-field cron expression
- Workflow files live at `workflows/<id>/WORKFLOW.md`
- At least one targeting bucket contains at least one entry
- The Markdown body exists and starts with an H1 heading
- `id`, `owner`, `agents`, and `dependsOn` values use normalized slug formats
- Invalid fixtures in `fixtures/invalid-workflows/` must fail as expected

## Local Commands

```bash
npm run setup
npm install
npm run format
npm run validate:workflows
npm run lint
npm run ci
./setup.sh
./format.sh
./lint.sh
./test.sh
```
