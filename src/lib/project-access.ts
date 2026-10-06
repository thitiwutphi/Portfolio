import { sha256Hex } from './sha256'

/*
 * Project pages are behind an access code. This only keeps casual visitors out: GitHub Pages is
 * static, so the project text, photos and videos are still in the public repository and site files.
 *
 * To change the code, run `bun run access-code <new code>` and paste the hash below. Visitors who
 * unlocked with the old code are asked again.
 */
export const ACCESS_CODE_HASH = 'd84ee454bf40158d0f1c0c54f51c175abcf31ab081b9dc080a5e393e68b372e1'
export const ACCESS_SALT = 'thitiwutphi-portfolio'

const STORAGE_KEY = 'projects-access'

export function hashAccessCode(code: string): string {
  return sha256Hex(`${ACCESS_SALT}:${code.trim()}`)
}

export function isAccessCodeValid(code: string): boolean {
  return hashAccessCode(code) === ACCESS_CODE_HASH
}

/** True when this browser has already entered the current code. */
export function hasProjectAccess(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === ACCESS_CODE_HASH
  } catch {
    return false
  }
}

export function rememberProjectAccess() {
  try {
    localStorage.setItem(STORAGE_KEY, ACCESS_CODE_HASH)
  } catch {
    // Storage can be unavailable (private mode); access then lasts for this visit only.
  }
}
