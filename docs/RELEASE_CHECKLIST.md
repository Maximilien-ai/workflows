# Release Checklist

## Before Opening The PR

- [ ] Update `CHANGELOG.md` with the release version and notable changes
- [ ] Update `docs/BACKLOG.md` to reflect completed and remaining work
- [ ] Run `./format.sh`
- [ ] Run `./lint.sh`
- [ ] Run `./test.sh`
- [ ] Confirm all valid workflow examples still pass validation
- [ ] Confirm invalid fixtures still fail validation as expected

## Before Merging

- [ ] Open a PR with the template completed
- [ ] Confirm the PR includes goal, category, labels/tags, agents, and tested OpenClaw / ClawMax versions when relevant
- [ ] Wait for GitHub Actions CI to pass
- [ ] Confirm branch protection requirements are satisfied

## Before Publishing The Release

- [ ] Confirm `main` is green after merge
- [ ] Publish the tag/release from the merged `main` commit
- [ ] Verify the release notes are accurate
- [ ] Verify the release appears in GitHub Releases
