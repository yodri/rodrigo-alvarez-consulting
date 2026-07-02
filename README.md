# Rodrigo Álvarez Consulting — Landing Page

Swiss-minimalist one-page portfolio for a premium CSV / IT Quality Assurance
consultant. Fully static build ready to be published on **GitHub Pages** from
the `main` branch root.

Live URL (once deployed): `https://<your-username>.github.io/<repo-name>/`

---

## 1 · Publish on GitHub Pages (main / root)

1. Create a new **empty public repo** on GitHub — e.g. `rodrigo-alvarez-site`.
2. From this folder (`/app/gh-pages-deploy`), initialise git and push
   everything to the repo's `main` branch:

   ```bash
   cd /app/gh-pages-deploy
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin git@github.com:<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. In the GitHub repo → **Settings → Pages**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` — folder `/ (root)`
   - Save.

4. Wait ~1 minute. Site will be live at
   `https://<your-username>.github.io/<repo-name>/`.

### Custom domain (optional)

- In GitHub Pages settings, set your custom domain (e.g. `rodrigoalvarez.me`).
- Add a `CNAME` file to the repo root containing just the domain:
  ```
  echo "rodrigoalvarez.me" > CNAME && git add CNAME && git commit -m "add CNAME" && git push
  ```
- Configure DNS at your registrar with a CNAME record pointing to
  `<your-username>.github.io`.

---

## 2 · What's inside this folder

| File / Dir       | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `index.html`     | Entry HTML (already minified, favicon + title embedded)    |
| `404.html`       | SPA fallback — rewrites deep links back to `index.html`    |
| `.nojekyll`      | Tells GH Pages not to run Jekyll on the folder             |
| `static/js/`     | Bundled React app (single JS file)                         |
| `static/css/`    | Compiled Tailwind CSS                                      |
| `asset-manifest.json` | CRA-generated file, safe to leave                     |

All assets use relative paths (`./static/...`), so the site works from any
sub-path (e.g. `/repo-name/`) without extra config.

---

## 3 · Routing

The site uses `react-router` client-side routing:

- `/` → home
- `/legal` → Legal Notice page

The `404.html` + inline decoder in `index.html` handles direct URLs and
refreshes on inner routes (a standard SPA-on-GitHub-Pages trick from
[rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)).

---

## 4 · Updating the site

When you want to change content:

1. Edit source in `/app/frontend/src/pages/Landing.jsx` (or `LegalNotice.jsx`).
2. Rebuild:

   ```bash
   cd /app/frontend
   yarn build
   ```

3. Re-generate the deploy folder (from the project workspace):

   ```bash
   cp -r /app/frontend/build/* /app/gh-pages-deploy/
   touch /app/gh-pages-deploy/.nojekyll
   # (Optionally re-run the strip-script that removes analytics/badges)
   ```

4. Commit + push the updated files to `main`.

---

## 5 · License

© 2026 Rodrigo Álvarez Consulting S.L.U. All rights reserved.
