import type { App } from '@berp/shared/server'
import { treaty } from '@elysia/eden'

export const api = treaty<App>(import.meta.env.VITE_API_URL ?? 'http://localhost:3000')
