import { Elysia } from 'elysia'
import { databaseHealthCheckRoutes } from './database'
import { elysiaHealthCheckRoutes } from './elysia'

export const healthCheckRoutes = new Elysia({
	name: 'healthCheckRoutes',
})
	.use(elysiaHealthCheckRoutes)
	.use(databaseHealthCheckRoutes)
