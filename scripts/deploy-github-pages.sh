#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export NEXT_PUBLIC_BASE_PATH=/myportfolio
export NEXT_PUBLIC_SITE_URL=https://noobsourabh.github.io/myportfolio

npm run build

cd out
rm -rf .git
git init -b gh-pages
git add -A
git commit -m "Deploy portfolio to GitHub Pages"
git push -f https://github.com/NoobSourabh/myportfolio.git HEAD:gh-pages

echo ""
echo "Deployed to https://noobsourabh.github.io/myportfolio/"
echo "If the site does not update immediately, run:"
echo "  gh api -X POST repos/NoobSourabh/myportfolio/pages/builds"
