#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

npx --yes prettier --write "**/*.{json,md,mjs,yaml,yml}"
