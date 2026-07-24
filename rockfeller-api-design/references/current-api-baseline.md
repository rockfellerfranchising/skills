# Baseline dos projetos atuais

## Members

Members é NestJS modular. Controllers normalmente declaram prefixo completo, como `@Controller('v1/admin/crm/leads')`; OpenAPI fica em `/openapi.json`, Scalar em `/reference`, e web usa `packages/api-client` gerado. DTOs de resposta são classes espelho das interfaces compartilhadas para Swagger.

Contrato legado é heterogêneo: leads usam `page`/`pageSize` e `{ leads, total, page, totalPages }`; timeline/cards já usam `nextCursor`. O padrão novo não autoriza troca incompatível em `/v1`.

`ValidationPipe` global usa whitelist, transform e forbidNonWhitelisted. Webhook pode usar interface em vez de DTO para aceitar campos extras do fornecedor, mas exige validação/assinatura própria.

## Leveling

Leveling usa prefixo global `/v1`; API é fonte de verdade para students, sessions e placements e browser não recebe a chave de integração. Rotas públicas são boundary server-side, não autorização de usuário Members.
