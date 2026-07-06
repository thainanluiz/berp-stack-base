import { Elysia } from 'elysia'

export const elysiaHealthCheckRoutes = new Elysia({
	name: 'elysiaHealthCheckRoutes',
	prefix: '/healthcheck',
}).get('/elysia', () => {
	return {
		status: 'ok',
		message: 'Server is healthy and running',
		timestamp: new Date().toISOString(),
	}
})
