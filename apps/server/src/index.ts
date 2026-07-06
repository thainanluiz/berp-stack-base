import { Elysia } from 'elysia'
import { config } from './config/elysia'
import { env } from './env'
import { routes } from './routes'

const app = new Elysia()
	.use(config)
	.use(routes)
	.listen({ port: env.PORT, hostname: env.HOSTNAME }, () => {
		console.info(`API server running on port ${env.PORT}`)
	})

export type App = typeof app
