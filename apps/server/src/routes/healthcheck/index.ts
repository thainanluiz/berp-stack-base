import { Elysia } from 'elysia'
import { elysiaHealthCheckRoutes } from './elysia'

export const healthCheckRoutes = new Elysia({
	name: 'healthCheckRoutes',
}).use(elysiaHealthCheckRoutes)
