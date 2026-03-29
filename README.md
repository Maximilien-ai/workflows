# Multiagent Workflows

> **Status:** Work in Progress — format stabilizing, expect changes before v1.0

Workflow definitions for multiagent teams. Each workflow defines a scheduled or manual task with agent targeting, execution mode, and markdown instructions.

## Tested With

- [OpenClaw](https://openclaw.ai) — open-source multiagent CLI
- [ClawMax](https://clawmax.ai) — multiagent orchestration platform

## Structure

```text
spec/                          # Format specification
  workflow-spec.md             # WORKFLOW.md format spec
workflows/                     # Example workflows
  kickoff/
    WORKFLOW.md
  pr-review/
    WORKFLOW.md
  ...
```

## Format

Workflows are defined as `.md` files with YAML frontmatter (metadata) + markdown body (instructions).

```yaml
---
name: Daily Standup
description: Async daily standup
schedule: "30 9 * * *"
executionMode: automated
targeting:
  groups:
    - Status
---

# Daily Standup

Each team member: post three items:
1. What you completed since last standup
2. What you plan to work on today
3. Any blockers or questions
```

See [spec/workflow-spec.md](spec/workflow-spec.md) for the full specification.

## Workflow Features

- **Schedule:** cron expressions, `manual`, or `once`
- **Execution modes:** `automated` (no oversight) or `managed` (requires owner)
- **Targeting:** by agents, groups, communities, or tags
- **Dependencies:** `dependsOn` for DAG sequencing
- **Types:** `once` (kickoff), `recurring` (cron), `conditional` (waits for deps)
- **Progress:** agents report 0-100% completion

## Example Workflows

| Workflow            | Schedule     | Mode      | Description                   |
| ------------------- | ------------ | --------- | ----------------------------- |
| Team Kickoff        | manual       | managed   | Initialize team, assign roles |
| PR Review           | every 2h     | automated | Review open pull requests     |
| Daily Standup       | 9:30am daily | automated | Async status updates          |
| Pipeline Monitoring | hourly       | automated | Check data pipeline health    |
| Release Prep        | manual       | managed   | Changelog, version bump, QA   |

## Contributing

Contributions welcome. Follow the WORKFLOW.md format with YAML frontmatter.

## Development

Use the shared local scripts so contributor checks match CI:

```bash
./setup.sh
./format.sh
./lint.sh
./test.sh
```

- `./setup.sh` installs local tooling
- `./format.sh` normalizes markdown and repo file formatting
- `./lint.sh` checks markdown and formatting without changing files
- `./test.sh` runs linting plus `WORKFLOW.md` validation

Before opening a PR, include the workflow or agent template goal, category, labels/tags, target agents, and the OpenClaw and/or ClawMax versions you tested with.

## License

MIT
