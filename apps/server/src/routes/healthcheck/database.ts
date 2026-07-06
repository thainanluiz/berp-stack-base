import { sql } from 'drizzle-orm'
import { Elysia } from 'elysia'
import { db } from '../../database/client'

export const databaseHealthCheckRoutes = new Elysia({
	name: 'databaseHealthCheckRoutes',
	prefix: '/healthcheck',
}).get('/database', async ({ set }) => {
	try {
		await db.execute(sql`select 1`)

		return {
			status: 'ok',
			message: 'Database is healthy and reachable',
			timestamp: new Date().toISOString(),
		}
	} catch (error) {
		set.status = 503

		return {
			status: 'error',
			message: error instanceof Error ? error.message : 'Database is unreachable',
			timestamp: new Date().toISOString(),
		}
	}
})
