# @berp/server

API do berp-stack: [Elysia](https://elysiajs.com) rodando no runtime do [Bun](https://bun.sh), com [Drizzle ORM](https://orm.drizzle.team) sobre PostgreSQL.

## Setup

```bash
cp .env.example .env
```

Preencha as variáveis conforme necessário — o schema de validação está em [`src/env.ts`](src/env.ts). `FRONTEND_URL` e `DATABASE_URL` são obrigatórias; o resto tem default.

O Postgres roda via `docker compose up -d` na raiz do monorepo.

## Scripts

Todos os scripts abaixo devem ser executados da **raiz do monorepo** (ex.: `bun run dev`), não desta pasta. Veja o [README raiz](../../README.md#scripts) para a lista completa.

| Script local | O que faz |
|---|---|
| `dev` | Sobe o servidor com watch (`bun run --watch src/index.ts`) |
| `test` | Roda os testes (`bun test`) |
| `typecheck` | `tsc --noEmit` |
| `db:generate` | Gera migrations a partir do schema em `src/database/schema/` |
| `db:migrate` | Aplica as migrations pendentes no banco |
| `db:push` | Sincroniza o schema direto no banco, sem gerar migration (só dev) |

## Estrutura

```
src/
  config/elysia.ts       # CORS + OpenAPI
  database/
    client.ts            # instância do Drizzle
    schema/               # tabelas (drizzle-kit lê daqui)
    migrations/           # gerado por db:generate
  routes/
    healthcheck/          # /healthcheck/elysia, /healthcheck/database
  env.ts                  # validação de env vars com zod
  index.ts                # bootstrap do Elysia + export type App (Eden Treaty)
```

Rotas novas seguem o padrão de `routes/healthcheck/`: um arquivo por recurso, um `index.ts` por pasta compondo os plugins via `.use()`.

## Type-safety com o frontend

Este servidor exporta `type App` (ver [`src/index.ts`](src/index.ts)). O `apps/web` consome esse tipo via `@berp/shared/server` para ter um client [Eden Treaty](https://elysiajs.com/eden/treaty/overview) totalmente tipado, sem duplicar contratos de API.
