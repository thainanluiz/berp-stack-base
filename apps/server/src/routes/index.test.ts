import { describe, expect, it, mock } from 'bun:test'

mock.module('../database/client', () => ({
	db: {
		execute: async () => [],
	},
}))

const { routes } = await import('./index')

describe('routes composition', () => {
	it('mounts the elysia health check', async () => {
		const response = await routes.handle(new Request('http://localhost/healthcheck/elysia'))
		expect(response.status).toBe(200)
	})

	it('mounts the database health check', async () => {
		const response = await routes.handle(new Request('http://localhost/healthcheck/database'))
		expect(response.status).toBe(200)
	})

	it('returns 404 for unknown paths', async () => {
		const response = await routes.handle(new Request('http://localhost/nope'))
		expect(response.status).toBe(404)
	})
})
