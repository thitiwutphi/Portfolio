import { createHash } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { ACCESS_CODE_HASH, hashAccessCode, isAccessCodeValid } from './project-access'
import { sha256Hex } from './sha256'

describe('sha256Hex', () => {
  it('matches the standard test vectors', () => {
    expect(sha256Hex('')).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
    expect(sha256Hex('abc')).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    )
  })

  it('matches Node’s implementation for longer and non-ASCII input', () => {
    for (const input of ['a'.repeat(1000), 'รหัสผ่าน 🔒', 'x'.repeat(55), 'y'.repeat(64)]) {
      expect(sha256Hex(input)).toBe(createHash('sha256').update(input).digest('hex'))
    }
  })
})

describe('access code', () => {
  it('accepts only the configured code, ignoring surrounding spaces', () => {
    expect(hashAccessCode('12345678')).toBe(ACCESS_CODE_HASH)
    expect(isAccessCodeValid(' 12345678 ')).toBe(true)
    expect(isAccessCodeValid('1234567')).toBe(false)
    expect(isAccessCodeValid('')).toBe(false)
  })
})
