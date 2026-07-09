import { describe, expect, it, mock } from 'bun:test'

let failNextQuery = false

mock.module('../../database/client', () => ({
	db: {
		execute: async () => {
			if (failNextQuery) {
				throw new Error('connection refused')
			}
			return []
		},
	},
}))

const { databaseHealthCheckRoutes } = await import('./database')

describe('GET /healthcheck/database', () => {
	it('reports the database as healthy when the query succeeds', async () => {
		failNextQuery = false
		const response = await databaseHealthCheckRoutes.handle(new Request('http://localhost/healthcheck/database'))

		expect(response.status).toBe(200)

		const body = (await response.json()) as Record<string, unknown>
		expect(body.status).toBe('ok')
		expect(typeof body.timestamp).toBe('string')
	})

	it('responds 503 with the driver error when the query fails', async () => {
		failNextQuery = true
		const response = await databaseHealthCheckRoutes.handle(new Request('http://localhost/healthcheck/database'))

		expect(response.status).toBe(503)

		const body = (await response.json()) as Record<string, unknown>
		expect(body.status).toBe('error')
		expect(body.message).toBe('connection refused')
	})
})
