import { describe, expect, it } from 'bun:test'

process.env.FRONTEND_URL ??= 'http://localhost:5173'
process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:5432/berp'

const { env } = await import('./env')

describe('env', () => {
	it('parses the environment and applies defaults', () => {
		expect(['development', 'production', 'test']).toContain(env.NODE_ENV)
		expect(typeof env.PORT).toBe('number')
		expect(typeof env.HOSTNAME).toBe('string')
	})

	it('exposes valid URLs', () => {
		expect(() => new URL(env.FRONTEND_URL)).not.toThrow()
		expect(env.DATABASE_URL.startsWith('postgresql://')).toBe(true)
	})
})
