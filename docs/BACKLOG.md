# Backlog

## Completed

- [x] Add `WORKFLOW.md` frontmatter schema for repository validation
- [x] Add workflow validation script for `workflows/*/WORKFLOW.md`
- [x] Add CI for pull requests and pushes to `main`
- [x] Add markdown linting and formatting checks
- [x] Add shared developer commands: `./setup.sh`, `./lint.sh`, and `./test.sh`
- [x] Align managed workflow examples with the documented `owner` requirement
- [x] Add a changelog to track release-level changes
- [x] Add a repo `.gitignore` to exclude `node_modules/`
- [x] Apply GitHub branch protection for `main` with required CI checks
- [x] Add `CODEOWNERS` so review routing is explicit
- [x] Add issue and PR templates for structured contributions
- [x] Add a markdown autofix path for local normalization
- [x] Add development and test guidelines to `README.md`
- [x] Decide to enforce workflow filename/directory naming in validation
- [x] Add invalid workflow fixtures
- [x] Add JSON Schema examples to the docs
- [x] Decide to require workflow IDs as slugs from workflow names
- [x] Add a release checklist

## Next Up

- [x] Add Dependabot for npm and GitHub Actions updates
- [ ] Publish `v0.1.4`

## Later

- [ ] Consider enforcing uniqueness for workflow `dependsOn` targets against known IDs
- [ ] Add a JSON Schema or fixture path for future agent template formats
