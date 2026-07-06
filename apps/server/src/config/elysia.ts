import { cors } from '@elysia/cors'
import { openapi } from '@elysia/openapi'
import { Elysia } from 'elysia'
import { env } from '../env'

export const config = new Elysia({
	name: 'config',
})
	.use(
		cors({
			origin: [env.FRONTEND_URL],
			allowedHeaders: ['Content-Type', 'Authorization', 'Referrer-Policy', 'user-agent'],
			methods: ['GET', 'POST', 'DELETE', 'PUT'],
			credentials: true,
		}),
	)
	.use(openapi())
