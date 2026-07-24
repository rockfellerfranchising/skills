# Limites atuais observados

## Produtos e identidades

`members` é o baseline de acesso: roles legados `admin`, `comercial`, `member` e `professor`, além de roles customizados com permissions. `member` é cliente com acesso a produto; `comercial` é equipe operacional de CRM. Não há relação formal de escola, franquia, tenant, professor-aluno ou funcionário-escola.

`leveling` é público e independente: web protege a chave de integração da API; a API é dona de students, sessions e placements. Não presuma que uma sessão de nivelamento herda autenticação do Members.

## Enforcement no Members

| Camada | Mecanismo | Prova | Não prova |
| --- | --- | --- | --- |
| sessão | `SessionGuard` + `req.user` | identidade | acesso ao objeto |
| rota | `@Roles` + `@RequirePermission` | role/permissão | carteira/ownership |
| recurso | `@RequireAccess` → guard → policy | `canUserAccess` em card, lead, note, conversation ou order | filtros de lista/efeitos indiretos |
| integração | `IntegrationKeyGuard` | chave ativa | assinatura, replay ou autorização de negócio |

Para CRM, admin vê tudo; comercial depende de responsável, assignee ou recurso sem responsável, conforme o tipo. O guard de recurso é aplicado depois do guard de sessão, busca o recurso pelo param e chama a policy.

## Assíncrono e dados

Apps: web, API NestJS, worker BullMQ, SDR BullMQ e nivelamento. Filas: `automation-run`, `automation-step`, `omnichannel-inbound`, `crm-card-export` e `sdr-turn`. O inbound omnichannel usa hash do raw body para deduplicação. Exports persistem requester e expiração; revise autorização tanto na geração quanto no download.

Fontes: `members/docs/architecture/overview.md`, `docs/api/access-control.md`, `docs/api/queue.md`, `docs/api/security.md` e `leveling/docs/architecture.md`.
