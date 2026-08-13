# Skills Rockfeller

Repositório central de skills internas para agentes de código que trabalham nos produtos Rockfeller. As skills registram decisões de arquitetura, segurança, integrações, instrumentação e criação de projetos que não devem depender apenas de conhecimento genérico do modelo.

O objetivo é que uma tarefa recorrente — revisar acesso, integrar um fornecedor, medir uma feature ou iniciar um produto — comece com o mesmo contexto, os mesmos critérios de qualidade e uma saída verificável.

## O que existe aqui

| Skill | Quando usar | Resultado principal |
| --- | --- | --- |
| `rockfeller-multitenant-security-review` | PRs, endpoints, jobs, exports e fluxos com dados sensíveis ou escopo de escola/franquia | Finding com evidência, exploração, correção e teste de regressão |
| `rockfeller-integration-delivery` | CRM, Make, n8n, Joy, WhatsApp, webhooks e APIs de fornecedores | Contrato canônico, política de entrega, observabilidade e testes de contrato |
| `rockfeller-product-instrumentation` | Features, telas e fluxos que precisam ser medidos | Plano PostHog com eventos, propriedades, funil, PII review e rollout |
| `rockfeller-project-bootstrap` | Criação de LP, dashboard, API, serviço ou monólito novo | Projeto iniciado pela CLI oficial `rock new` |
| `rockfeller-api-design` | Criação ou alteração de contratos HTTP | API REST versionada, paginada, autorizada e compatível |
| `rockfeller-telemetry` | Serviços NestJS que precisam de logs, request ID, traces, métricas, erros ou contexto de job | Integração padronizada com `@rockdev/telemetry` |

Cada skill contém um `SKILL.md` curto e referências carregadas apenas quando necessárias. Não duplique as referências em outro lugar: elas são a fonte de verdade operacional da skill.

## Instalação

Instale uma skill específica no projeto em que o agente irá trabalhar:

```bash
npx skills add https://github.com/rockfellerfranchising/skills --skill rockfeller-api-design
```

Para instalar mais de uma, repita o comando para cada nome da tabela. Projetos criados com a [Rock CLI](https://github.com/rockfellerfranchising/cli) já mostram as skills aplicáveis pré-selecionadas ao executar `rock new`.

> A skill `rockfeller-project-bootstrap` deve ser usada antes de criar qualquer novo projeto Rockfeller. Ela orienta a usar a CLI, não a reproduzir manualmente o scaffold.

## Estrutura

```text
rockfeller-<nome-da-skill>/
  SKILL.md              # instrução principal e gatilhos
  agents/openai.yaml    # metadados exibidos pelo catálogo de skills
  references/           # políticas, contratos e contexto carregado sob demanda
  scripts/              # automações determinísticas, quando aplicável
```

Atualmente, somente a revisão de segurança possui script: `scan-tenant-queries.ts`. Ele aponta hipóteses de consulta, cache ou job sem escopo; o resultado exige revisão humana e não confirma vulnerabilidades por si só.

## Como usar as skills

Descreva a tarefa normalmente e cite a skill quando quiser forçar o contexto, por exemplo:

```text
Use rockfeller-integration-delivery para desenhar a integração de leads com o CRM X.
```

```text
Faça uma revisão com rockfeller-multitenant-security-review do endpoint de exportação.
```

As skills devem ser aplicadas ao contexto real do projeto. Em especial:

- a revisão de segurança reconhece que os repositórios atuais ainda não possuem um modelo canônico compartilhado de `tenantId` ou `schoolId`;
- a instrumentação estabelece PostHog como padrão para trabalho novo, mas não presume que ele já esteja instalado;
- o envelope de integração canônico vale para integrações novas; contratos legados devem ser adaptados gradualmente;
- a skill de API padroniza `/v1`, exclusivamente UUID v7, envelope JSON `ok/data` e cursor para coleções não limitadas.
- serviços NestJS usam `@rockdev/telemetry` para logs, contexto, request ID, traces, métricas, erros e shutdown; não implemente essas camadas manualmente.

## Desenvolvimento local

Este é um repositório de Markdown e TypeScript leve; não há dependências de projeto para instalar. O validador de skills está disponível no ambiente Codex:

```bash
for skill in rockfeller-*; do
  python3 $USER/.codex/skills/.system/skill-creator/scripts/quick_validate.py "$skill"
done
```

Para exercitar o scanner de segurança em uma árvore TypeScript:

```bash
bun rockfeller-multitenant-security-review/scripts/scan-tenant-queries.ts <diretorio>
```

O scanner é um apoio à investigação. Leia a cadeia de autorização completa antes de abrir um finding.

## Atualização da CLI

As recomendações de skills para novos projetos são mantidas no repositório `../cli`, em `src/scaffold/recommended-skills.ts`:

- `web`: bootstrap, integrações e instrumentação;
- `api`: bootstrap, integrações, segurança e API design;
- `monolith`: todas as seis skills; `api`: também inclui telemetry.

Mudanças aqui que alterem nomes ou a estrutura de uma skill devem atualizar a referência correspondente na CLI no mesmo ciclo.

## Contribuição

Leia [AGENTS.md](AGENTS.md) antes de editar. Ele contém regras para criação, revisão e validação das skills. O arquivo [CONTRIBUTING.md](CONTRIBUTING.md) aponta para a mesma fonte de verdade.

Não adicione segredos, exemplos com PII real, URLs privadas, tokens, payloads completos de webhook ou decisões de produto sem fonte verificável.

## Segurança

Para vulnerabilidades, não abra uma issue pública com detalhes exploráveis. Consulte [SECURITY.md](SECURITY.md) e use o canal interno aprovado pela Rockfeller.

## Licença

Este repositório é distribuído sob a [Apache License 2.0](LICENSE).
