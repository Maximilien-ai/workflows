#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

./lint.sh
node scripts/validate-workflows.mjs
