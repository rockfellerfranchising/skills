# Fluxo da CLI

Instale a CLI aprovada antes de iniciar qualquer projeto:

```bash
npm install -g @rockdev/cli
```

O repositório de desenvolvimento é `../cli`; o binário é `rock`. Use `rock new [template] [name]` para `web`, `api` ou `monolith`.

## Decisões pedidas

| Decisão | Opções atuais | Critério |
| --- | --- | --- |
| package manager | pnpm/bun | seguir produto/integrador |
| ORM | Prisma/Drizzle em API/monolith | escolher por domínio, sem misturar |
| extras | Biome, Lefthook, Commitlint, Dockerfile, Compose, EditorConfig, Better Auth | manter defaults salvo motivo |
| auth | email/senha, Google, GitHub, Discord | habilitar provider aprovado |
| base web | Landing Page, Login, Dashboard | acelerar estrutura, não definir design |
| skills | externas + Rockfeller | internas aplicáveis pré-selecionadas |

## Pós-criação

1. Entrar na pasta e ler README/AGENTS gerados.
2. Instalar dependências se necessário; rodar checks e `rock status`.
3. Usar `rock env example`/`rock env check`; nunca copiar `.env` de outro projeto.
4. Fazer primeira alteração como feature de domínio, preservando módulos/contratos/documentação.

## Arquivos obrigatórios

- `README.md` detalhado em português: objetivo, arquitetura, setup, comandos, envs, deploy, validação e contribuição.
- `AGENTS.md` detalhado em inglês e específico ao produto: propósito, mapa, invariantes, segurança, testes, deploy e uso obrigatório de code-review-graph antes de busca textual.
- `CLAUDE.md` e `CONTRIBUTING.md` como symlinks para `AGENTS.md`.
- `.github/workflows/` para PR/push: formatting Biome, lint Biome, typecheck, tests e build quando aplicável. Deploy automático somente após quality gate e para ambiente aplicável.
- `railway.json` para serviço Railway e `vercel.json` para app Vercel; não crie configuração vazia.
- `.code-review-graph/` local com banco ignorado e configuração MCP suportada.

Leia também [code-review-graph.md](code-review-graph.md) antes de escrever AGENTS.md de um projeto novo.
