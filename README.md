# iftekhar-hussain: personal brand website

**Live:** https://iftekharhussain0608.github.io/portfolio/ (GitHub Pages, deploys on every push to `main`)

A fast, dependency-free static site (HTML + CSS + a little JS). There's no build step, so it can be hosted anywhere.

```
index.html          the site
styles.css          design tokens (light + dark) and layout
script.js           theme toggle, mobile menu, scroll reveals
assets/             favicon, link-preview image, LinkedIn banner
tools/              HTML sources for the PNGs + build-og.sh to re-render them
BRAND.md            positioning, voice, palette, type, LinkedIn checklist
```

## Preview locally

```bash
open index.html                    # or:
python3 -m http.server 8080        # then visit http://localhost:8080
```

## Publishing changes

Placeholders show as amber boxes (`data-todo`) and unapproved copy is marked `data-draft`. A DRAFT badge
appears in the corner while any remain. Never push until the check passes:

```bash
./tools/check-draft.sh && git add -A && git commit -m "Update site" && git push
```

## Keeping it current

- Live at https://iftekharhussain0608.github.io/portfolio/ (GitHub Pages deploys on every push to `main`).
- If you move to a custom domain, replace that URL in `index.html` (canonical, og:url, og:image, JSON-LD).
- If you change your LinkedIn URL slug, update the LinkedIn links plus `sameAs` in `index.html`.
- After changing `tools/og-image.html` or `tools/linkedin-banner.html`, re-render with `./tools/build-og.sh`.
  When the preview image changes, bump the `?v=` number on `og:image` in `index.html`: LinkedIn caches images by URL,
  so the same address keeps showing the old card even after Post Inspector re-reads the page.

## Deploy (pick one, all free)

**GitHub Pages**
```bash
git init && git add . && git commit -m "Personal brand site"
gh repo create iftekhar-hussain-site --public --source=. --push
gh api -X POST repos/{owner}/iftekhar-hussain-site/pages -f "source[branch]=main" -f "source[path]=/"
# Site: https://<github-user>.github.io/iftekhar-hussain-site/
```

**Netlify Drop:** drag this folder onto https://app.netlify.com/drop.

**Cloudflare Pages:** `npx wrangler pages deploy . --project-name=iftekhar-hussain`

**Custom domain (recommended for a brand):** a domain like `iftekharhussain.com` / `.dev` / `.in` costs roughly $10–15 a year. Point it at any of the hosts above.

## Add it to your LinkedIn intro

1. Open your profile → click the **pencil** on your intro card (**Edit intro**).
2. Scroll to **Website** → paste the URL → set **Link text** (e.g. `Portfolio · iftekharhussain.com`) → **Save**.
   The link now shows directly under your headline.
3. Also add it under **Contact info → Website** (type: *Portfolio*), and to **Featured → Add a link**. The `og-image.png` becomes the preview card.
4. Upload `assets/linkedin-banner.png` as your background photo so the profile and the site match.
5. Check the preview with LinkedIn's Post Inspector: https://www.linkedin.com/post-inspector/ (it also refreshes a cached preview).
