import { describe, expect, it } from 'bun:test'
import { elysiaHealthCheckRoutes } from './elysia'

describe('GET /healthcheck/elysia', () => {
	it('reports the server as healthy', async () => {
		const response = await elysiaHealthCheckRoutes.handle(new Request('http://localhost/healthcheck/elysia'))

		expect(response.status).toBe(200)

		const body = (await response.json()) as Record<string, unknown>
		expect(body.status).toBe('ok')
		expect(typeof body.timestamp).toBe('string')
	})
})
