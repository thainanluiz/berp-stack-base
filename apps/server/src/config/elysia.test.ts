import { describe, expect, it } from 'bun:test'

process.env.FRONTEND_URL ??= 'http://localhost:5173'
process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:5432/berp'

const { env } = await import('../env')
const { config } = await import('./elysia')

describe('config plugin', () => {
	it('answers CORS preflight for the configured frontend origin', async () => {
		const response = await config.handle(
			new Request('http://localhost/', {
				method: 'OPTIONS',
				headers: {
					Origin: env.FRONTEND_URL,
					'Access-Control-Request-Method': 'GET',
				},
			}),
		)

		expect(response.headers.get('Access-Control-Allow-Origin')).toBe(env.FRONTEND_URL)
		expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('true')
	})

	it('serves the OpenAPI documentation', async () => {
		const response = await config.handle(new Request('http://localhost/openapi'))
		expect(response.status).toBe(200)
	})
})
