/** URL for a file in public/, respecting Vite's `base` (the site is served from /Portfolio/). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`
}
