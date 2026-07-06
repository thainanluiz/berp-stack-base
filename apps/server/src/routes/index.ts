import { Elysia } from 'elysia'
import { healthCheckRoutes } from './healthcheck'

export const routes = new Elysia({
	name: 'routes',
}).use(healthCheckRoutes)
