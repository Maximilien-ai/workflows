#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

npx --yes markdownlint-cli2 "**/*.md" "#node_modules"
npx --yes prettier --check "**/*.{json,md,mjs,yaml,yml}"
