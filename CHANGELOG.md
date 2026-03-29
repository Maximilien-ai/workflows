# Changelog

All notable changes to this project will be documented in this file.

## [0.1.1] - Unreleased

- CI workflow for pull requests and pushes to `main`
- `WORKFLOW.md` frontmatter schema at `spec/workflow-frontmatter.schema.json`
- Repository validation guide at `spec/workflow-validation.md`
- Shared developer entrypoints: `./setup.sh`, `./lint.sh`, and `./test.sh`
- Dependency-free workflow validator at `scripts/validate-workflows.mjs`
- Markdown lint and formatting configuration
- Project backlog at `docs/BACKLOG.md`
- Updated `package.json` scripts to use shared shell entrypoints
- Normalized markdown formatting across the spec, README, and workflow examples
- Added `owner` to managed workflow examples so the repository matches the documented contract
- Quoted the `Release Prep` description so its YAML frontmatter parses correctly

## [0.1.0] - 2026-03-29

- Initial `WORKFLOW.md` specification
- Initial example workflow collection
- First public release for review and feedback
