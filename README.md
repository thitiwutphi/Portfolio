# Portfolio

Personal portfolio of **Thitiwut Phimpisai** — live at **https://thitiwutphi.github.io/Portfolio/**

A plain HTML/CSS/JavaScript site (no build step) hosted on GitHub Pages from the `main` branch.

## Structure

```
index.html            Page content (hero, about, projects, contact)
assets/css/style.css  Styles, including light/dark theme tokens
assets/js/main.js     Theme toggle, mobile menu, and the GitHub projects feed
assets/favicon.svg    Browser tab icon
.nojekyll             Tells GitHub Pages to serve files as-is
```

## Editing

- **Text** — edit `index.html`; spots to personalise are marked with `<!-- TODO -->`.
- **Projects** — loaded automatically from your public GitHub repositories (forks and archived repos are skipped). Hide a repo or change how many are shown with `HIDDEN_REPOS` / `MAX_PROJECTS` at the top of `assets/js/main.js`. A repo's description and "Website" field on GitHub become the card text and its "Live demo" link.
- **Photo** — uses your GitHub avatar; to use another image, put it in `assets/` and change the `<img class="avatar">` `src`.
- **Colours** — change the variables at the top of `assets/css/style.css`.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish

```sh
git add -A && git commit -m "Update portfolio" && git push
```

GitHub Pages redeploys automatically within a minute or two.
