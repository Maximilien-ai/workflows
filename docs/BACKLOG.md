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

## Next Up

- [x] Add Dependabot for npm and GitHub Actions updates
- [ ] Decide whether to enforce workflow filename or directory naming conventions in validation
- [ ] Publish `v0.1.3`

## Later

- [ ] Add example invalid workflows as validator fixtures
- [ ] Add JSON Schema examples to the spec docs
- [ ] Decide whether workflow IDs should be required in all examples
- [ ] Add a release checklist for future version bumps
