# Portfolio

Personal portfolio of **Thitiwut Phimpisai**, Robotics Software Engineer — live at
**https://thitiwutphi.github.io/Portfolio/**

## Stack

- **React 19** + **TypeScript** (strict) on **Vite 8**
- **TanStack Router** — file-based, type-safe routes with automatic code splitting
- **TanStack Query** — GitHub repositories fetched and cached client-side, validated with **zod**
- **shadcn/ui** (Radix) + **Tailwind CSS 4** — light / dark / system theme
- **Vitest** + Testing Library, **ESLint** (type-aware, a11y, TanStack rules), **Prettier**
- **GitHub Actions** → GitHub Pages, **Dependabot** for dependency updates

## Getting started

Requires [Bun](https://bun.sh) (package manager and script runner). Node.js 24 (see `.nvmrc`) is
recommended — CI runs the toolchain on Node.

```sh
bun install
bun run dev        # http://localhost:5173/Portfolio/
```

| Script            | What it does                             |
| ----------------- | ---------------------------------------- |
| `bun run dev`     | Start the dev server                     |
| `bun run build`   | Type-check and build to `dist/`          |
| `bun run preview` | Serve the production build locally       |
| `bun run test`    | Run unit and integration tests           |
| `bun run lint`    | Lint with ESLint                         |
| `bun run format`  | Format with Prettier                     |
| `bun run check`   | Type-check, lint, format check and tests |

## Editing content

All text lives in typed data files — no component changes needed:

| File                        | Content                                           |
| --------------------------- | ------------------------------------------------- |
| `src/content/profile.ts`    | Name, role, tagline, about, links, focus areas    |
| `src/content/experience.ts` | Work history                                      |
| `src/content/projects.ts`   | Projects (each gets a page at `/projects/<slug>`) |
| `src/content/skills.ts`     | Skill groups                                      |
| `src/content/education.ts`  | Education, certifications, awards                 |
| `src/content/seo.ts`        | Site URL and page titles / descriptions           |

The **On GitHub** section lists public, non-fork repositories automatically.

## Project structure

```
src/
  routes/              TanStack Router file routes (__root, index, projects/$slug)
  components/home/     Home page sections
  components/layout/   Header, footer, mobile nav, section wrappers
  components/ui/       shadcn/ui components (add more with `bunx shadcn@latest add <name>`)
  features/github/     GitHub API client, query options and repo list
  content/             Portfolio content (see above)
scripts/static-pages.ts  Build step that writes per-page HTML, 404.html and sitemap.xml
public/                Favicon, Open Graph image
```

## How deployment works

Every push to `main` runs `.github/workflows/deploy.yml`: type-check → lint → format check → tests →
build → deploy to GitHub Pages. Pull requests run the same checks without deploying.

GitHub Pages only serves static files, so the build also writes a static HTML file for every project
(`dist/projects/<slug>.html`) with that page's title, description and Open Graph tags. This makes deep
links load directly and gives correct link previews on LinkedIn and other sites, whose crawlers don't
run JavaScript. Unknown URLs fall back to `404.html`, where the app renders its not-found page.

The site is served from `/Portfolio/` (`base` in `vite.config.ts`). If you move it to a custom domain
or a `<user>.github.io` repository, change `base` and `site.url` in `src/content/seo.ts`.
