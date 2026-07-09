# @berp/web

Frontend do berp-stack: [React 19](https://react.dev) (com o [React Compiler](https://react.dev/learn/react-compiler)) + [TanStack Router](https://tanstack.com/router) via [Vite](https://vite.dev).

## Setup

```bash
cp .env.example .env
```

`VITE_API_URL` tem default (`http://localhost:3000`) — só precisa mudar se o `@berp/server` estiver rodando em outra porta/host. Schema de validação em [`src/env.ts`](src/env.ts).

## Scripts

Todos os scripts abaixo devem ser executados da **raiz do monorepo** (ex.: `bun run dev:web`), não desta pasta. Veja o [README raiz](../../README.md#scripts) para a lista completa.

| Script local | O que faz |
|---|---|
| `dev` | Sobe o Vite dev server |
| `build` | `tsc --noEmit` seguido de `vite build` |
| `preview` | Serve o build de produção localmente |
| `test` | Roda os testes (`vitest run`) |
| `typecheck` | `tsc --noEmit` |

## Roteamento

Rotas são arquivos dentro de `src/routes/` — o plugin `@tanstack/router-plugin` gera `src/routeTree.gen.ts` automaticamente a cada `dev`/`build` (esse arquivo é commitado; não edite à mão). Veja a [documentação de file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing) do TanStack Router.

## Consumindo a API

[`src/lib/api.ts`](src/lib/api.ts) exporta um client [Eden Treaty](https://elysiajs.com/eden/treaty/overview) tipado contra o `@berp/server`, via o tipo `App` re-exportado por `@berp/shared/server`. Chamadas feitas por ele ganham autocomplete e type-checking de rota, params e response — sem precisar duplicar contratos de API no frontend.
