# BERP Stack

[![CI](https://github.com/thainanluiz/berp-stack/actions/workflows/ci.yml/badge.svg)](https://github.com/thainanluiz/berp-stack/actions/workflows/ci.yml)

Base estrita de código para a stack **B**un + **E**lysia + **R**eact + **P**ostgreSQL. Monorepo, tudo orquestrado pela raiz — nenhum comando precisa ser rodado de dentro de `apps/*`.

## Stack

- [Bun](https://bun.sh) — runtime, package manager, test runner
- [Elysia](https://elysiajs.com) — servidor HTTP, com [Eden Treaty](https://elysiajs.com/eden/treaty/overview) pra type-safety ponta a ponta com o frontend
- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler) + [TanStack Router](https://tanstack.com/router), via [Vite](https://vite.dev)
- [Drizzle ORM](https://orm.drizzle.team) sobre [PostgreSQL](https://www.postgresql.org)
- [Zod](https://zod.dev) — validação de env vars nos dois lados, e ponte de schemas compartilhados via `@berp/shared`
- [Biome](https://biomejs.dev) — lint + format, único source of truth de estilo no monorepo
- [Vitest](https://vitest.dev) (web) e `bun test` (server)

## Requisitos

- [Bun](https://bun.sh) 1.3+
- [Docker](https://www.docker.com) (só pro Postgres local)

## Setup

```bash
bun install

cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env

docker compose up -d

bun run dev
```

O server sobe em `http://localhost:3000`, o web em `http://localhost:5173`.

## Estrutura

```
apps/
  server/     @berp/server — API Elysia
  web/        @berp/web — frontend React
packages/
  shared/     @berp/shared — ponte de tipos/schemas entre server e web
  ts-config/  @berp/ts-config — tsconfigs base compartilhados (base/web/server)
```

Cada `apps/*` e `packages/*` tem seu próprio README com detalhes específicos.

## Scripts

Todos rodam da raiz.

| Script | O que faz |
|---|---|
| `dev` | Sobe todos os apps em paralelo (`--filter '*'`) |
| `dev:web` | Só o web |
| `build` | Builda todos os apps que têm script `build` |
| `build:web` | Só o web |
| `preview:web` | Serve o build de produção do web |
| `check` | Lint + format check (Biome) |
| `check:fix` | Aplica as correções automáticas do Biome |
| `test` | Roda os testes de todos os apps |
| `typecheck` | `tsc --noEmit` em todos os workspaces |
| `db:generate` | Gera migrations do Drizzle a partir do schema |
| `db:migrate` | Aplica migrations pendentes no Postgres |
| `db:push` | Sincroniza o schema direto no banco (sem migration, só dev) |

## Versionamento de dependências

TypeScript, `@types/bun`, `@types/node`, `zod` e `elysia` ficam num [Bun catalog](https://bun.sh/docs/install/catalogs) no `package.json` raiz — cada workspace que precisa deles referencia `catalog:`, garantindo uma única versão resolvida no monorepo inteiro.

## CI

O workflow em [`.github/workflows/ci.yml`](.github/workflows/ci.yml) roda `check`, `typecheck`, `test` e `build` em todo push/PR pra `main`.

## Licença

[MIT](LICENSE)
