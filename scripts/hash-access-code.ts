// Prints the hash to put in ACCESS_CODE_HASH (src/lib/project-access.ts) for a new access code.
// Usage: bun run access-code <code>
import { createHash } from 'node:crypto'

import { ACCESS_SALT } from '../src/lib/project-access.ts'

const code = process.argv[2]
if (!code) {
  console.error('Usage: bun run access-code <code>')
  process.exit(1)
}
console.log(createHash('sha256').update(`${ACCESS_SALT}:${code.trim()}`).digest('hex'))
