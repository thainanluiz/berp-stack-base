import type { App } from '@berp/shared/server'
import { treaty } from '@elysia/eden'
import { env } from '../env'

export const api = treaty<App>(env.VITE_API_URL)
