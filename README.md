# Portfolio

Personal portfolio of **Thitiwut Phimpisai**, Robotics Software Engineer — live at
**https://thitiwutphi.github.io/Portfolio/**

## Stack

- **React 19** + **TypeScript** (strict) on **Vite 8**
- **TanStack Router** — file-based, type-safe routes with automatic code splitting
- **shadcn/ui** (Radix) + **Tailwind CSS 4** — light / dark theme switch
- **Vitest** + Testing Library, **ESLint** (type-aware, a11y, TanStack rules), **Prettier**
- **GitHub Actions** → GitHub Pages, **Dependabot** for GitHub Actions updates

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

| File                        | Content                                                            |
| --------------------------- | ------------------------------------------------------------------ |
| `src/content/profile.ts`    | Name, role, contact details, summary, banner, photo                |
| `src/content/experience.ts` | Work history                                                       |
| `src/content/projects.ts`   | Projects (see below)                                               |
| `src/content/skills.ts`     | Top skills                                                         |
| `src/content/education.ts`  | Education, certifications, awards                                  |
| `src/content/logos.ts`      | Company and certification logos                                    |
| `src/content/companies.ts`  | Companies used by Experience and Projects (name, short name, logo) |
| `src/content/gallery.ts`    | Photos and captions for the Gallery page (`/gallery`)              |
| `src/content/seo.ts`        | Site URL and page titles / descriptions                            |

Projects can also list `highlights` and `tech`, which appear on their detail page.

### Adding a project

Add an entry to `projects` in `src/content/projects.ts` (newest first). Every project needs a
`company` — one of the ids in `src/content/companies.ts` (`arv`, `pim`, `rma`, `gosoft`); add a new
company there first if needed. `featured: true` puts it in Featured Projects on the home page.

`media` holds photos and videos; the first item is the cover on cards and in link previews:

- `{ type: 'image', src, thumb, width, height, alt }` — put files in `public/images/projects/<slug>/`
  (full size with a long edge of about 1600px, plus a ~640px-wide thumbnail)
- `{ type: 'video', src, poster, width, height, title }` — a short `.mp4` in `public/videos/`
  (GitHub Pages files must be under 100 MB; use YouTube for anything longer)
- `{ type: 'youtube', id, title }` — embedded from youtube-nocookie.com only when played

Until the first project is added, the Featured Projects panel and the Projects menu item are hidden
and the projects page shows an empty state (kept out of search results).

### Images

Images live in `public/images/`:

- `logos/` — official logos from each organization's website and the Java logo from Wikimedia
  Commons (`content/logos.ts`)
- `achievements/` — the PIM All Star photo and the MTA certificate transcript (home address removed)
- `gallery/` — photos for the Gallery page (`/gallery`); each has a full image (long edge ~1600px) and a
  640px-wide `-thumb` version. Add a photo by adding a line in `src/content/gallery.ts`
- `profile.webp` — profile photo (400×400)
- `hero-robot.webp`, `projects/*` — still low-resolution crops from the design mockup; replace them
  with the original photos (same file names, or update the paths in `src/content`)

A unit test checks that every referenced image exists.

## Project access code

The All Projects page and every project page ask for an access code (the home page still shows
project titles and covers). It only keeps casual visitors out — GitHub Pages is static, so project
text, photos and videos are still in the public repository. To change the code, run
`bun run access-code <new code>` and paste the hash into `src/lib/project-access.ts`.

## Languages

The site is in English (`/Portfolio/`) and Thai (`/Portfolio/th/`), with an EN / TH switch in the
header that keeps you on the same page and section.

- Interface text (buttons, headings, menus) lives in `src/i18n/messages.ts`.
- Portfolio content is translated next to the English text in `src/content`, as `{ en, th }` pairs.
  Technology names in `skills.ts` stay as plain strings unless they need a translation.
- A unit test fails if any `{ en, th }` pair is missing a language.
- To add a language, add it to `src/i18n/locales.ts`, add its messages and fill in the content —
  TypeScript points out every place that needs a translation.

## Project structure

```
src/
  routes/              TanStack Router file routes ({-$locale} prefix, home, projects/$slug)
  i18n/                Languages, interface text and the useLocale / useMessages hooks
  components/home/     Hero and dashboard panels of the home page
  components/layout/   Header (with active-section highlight), footer, mobile nav
  components/ui/       shadcn/ui components (add more with `bunx shadcn@latest add <name>`)
  content/             Portfolio content (see above)
scripts/static-pages.ts  Build step that writes per-page HTML, 404.html and sitemap.xml
public/                Images, favicon, Open Graph image
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
