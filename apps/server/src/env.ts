import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	// Elysia API server configuration
	PORT: z.coerce.number().default(3000),
	HOSTNAME: z.string().default('0.0.0.0'),

	// Frontend URL for CORS configuration
	FRONTEND_URL: z.string().url(),

	// Database
	DATABASE_URL: z.string().url().startsWith('postgresql://'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
	console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
	process.exit(1)
}

export const env = parsed.data
