import { expect, test } from 'vitest'
import { env } from './env'

test('exposes a valid API URL', () => {
	expect(() => new URL(env.VITE_API_URL)).not.toThrow()
})
