# Contratos existentes e compatibilidade

## Entrada no Members

`POST /v1/integrations/ingest` e `POST /v1/integrations/rockplus/sync` não exigem sessão, mas usam `IntegrationKeyGuard` com `x-api-key`. A chave é guardada como SHA-256; integração revogada não é aceita. O guard anexa `integrationId` e atualiza `lastUsedAt` sem bloquear a resposta.

Ingestão genérica aceita identidade de lead, `eventType`, payload livre, stage, temperatura, produtos, tags e UTM; pode criar/atualizar lead, registrar timeline e emitir `lead.created`, `lead.tag.added`, `card.stage.changed` ou `card.tier.changed`. É contrato legado, não o envelope canônico.

RockPlus sincroniza `user.created`, `user.updated`, `subscription.updated` e `product.removed`. Preserve nomes/campos do fornecedor em adaptador; não imponha o envelope interno sem versão negociada.

## Joy, WhatsApp, e-mail e LP

Joy é middleware de pagamento/matrícula. O contrato possui particularidades como `adressNumber` e respostas não uniformes; checkout revalida oferta, nivelamento e turma no servidor. Não registre CPF, cartão ou payload de cobrança em logs/DLQ.

Meta/Evolution recebem webhooks e alimentam filas de omnichannel/SDR. Inbound omnichannel usa job ID determinístico do raw body para deduplicação. Resend processa eventos de e-mail. Preserve o modelo webhook seguro → fila → worker → adapter.

A Expansion LP envia lead por route handler server-side: valida JSON/tamanho/telefone/consentimento, aplica timeout e não expõe token ao browser. É referência de boundary, mas precisa de idempotência ao evoluir.

Fontes: `members/docs/integracoes.md`, `docs/api/integrations.md`, `docs/api/queue.md` e `expasion-lp/apps/web/src/app/api/leads/route.ts`.
