#!/usr/bin/env bash
# Blocks publishing while index.html still has placeholders (data-todo) or unapproved copy (data-draft).
# Run before every push:  ./tools/check-draft.sh && git push
set -uo pipefail
cd "$(dirname "$0")/.."
todos=$(grep -o 'data-todo' index.html | wc -l | tr -d ' ')
drafts=$(grep -o 'data-draft="[^"]*"' index.html | sed 's/data-draft=//; s/"//g' | paste -sd ',' - | sed 's/,/, /g')
if [ "$todos" -gt 0 ] || [ -n "$drafts" ]; then
  echo "NOT READY TO PUBLISH"
  echo "  placeholders (data-todo): $todos"
  [ -n "$drafts" ] && echo "  awaiting approval (data-draft): $drafts"
  echo "  Fill or delete them in index.html, then run this again."
  exit 1
fi
echo "Ready to publish: no placeholders or drafts left."
