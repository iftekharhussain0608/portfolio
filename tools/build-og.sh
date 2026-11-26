#!/usr/bin/env bash
# Renders the brand images with headless Chrome:
#   tools/og-image.html        -> assets/og-image.png        (1200x627, link preview when the site is shared)
#   tools/linkedin-banner.html -> assets/linkedin-banner.png (1584x396, LinkedIn profile cover)
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
render() { # src out width height
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size="$3,$4" --virtual-time-budget=6000 \
    --screenshot="$PWD/$2" "file://$PWD/$1" 2>/dev/null
  echo "Wrote $2"
}
render tools/og-image.html assets/og-image.png 1200 627
render tools/linkedin-banner.html assets/linkedin-banner.png 1584 396
