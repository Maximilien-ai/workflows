# Multiagent Workflows

> **Status:** Work in Progress — format stabilizing, expect changes before v1.0

Workflow definitions for multiagent teams. Each workflow defines a scheduled or manual task with agent targeting, execution mode, and markdown instructions.

## Tested With

- [OpenClaw](https://openclaw.ai) — Personal AI Assistant
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
id: daily-standup
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
- **Secret requirements:** optional `secretRequirements` metadata for API keys, event URLs, tokens, and similar runtime inputs
- **Types:** `once` (kickoff), `recurring` (cron), `conditional` (waits for deps)
- **Progress:** agents report 0-100% completion

## Secure Runtime Inputs

Workflows can declare `secretRequirements` in frontmatter when they need user-provided runtime values such as API keys, slugs, URLs, or export paths.

- ClawMax can prompt for these values at run time and store them browser-local
- sensitive values do not need to be written into the markdown body
- non-sensitive values can still be echoed into the run context when appropriate

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
Workflow examples must live at `workflows/<id>/WORKFLOW.md`, and `id` should be the lowercase slug of the workflow name.

## Source Of Truth

ClawMax originated the `WORKFLOW.md` spec and the initial workflow examples in this repository.

For now:

- ClawMax-derived workflows should stay synced with the source templates in `Maximilien-ai/clawmax`
- Community-submitted workflows are maintained in this repository on their own terms

The intended direction is to make this repository the primary public home for the spec and workflow examples, with ClawMax eventually pulling from here instead of acting as the long-term upstream source.

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
