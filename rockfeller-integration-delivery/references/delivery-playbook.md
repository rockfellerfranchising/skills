# Playbook de implementação

## Evento de saída para CRM

1. Persistir primeiro estado Rockfeller e evento/outbox na mesma unidade transacional quando efeito for crítico.
2. Enfileirar `{ eventId }`, não payload PII completo.
3. Worker carrega evento, monta `RockfellerIntegrationEvent<T>`, faz mapping e envia com timeout/chave de idempotência.
4. Sucesso salva provider request ID; falha transitória retrya; permanente vira DLQ segura.
5. Replay mantém a mesma chave e é auditado.

## Webhook de entrada

1. Preservar raw body antes de parsear quando assinatura exigir.
2. Rejeitar segredo ausente, assinatura inválida, timestamp vencido, content type/tamanho/schema inválido.
3. Deduplicar por ID do provider; sem ID, hash documentado de campos estáveis — nunca timestamp local.
4. Persistir recebimento/dedup antes de processar e responder após aceitação durável.
5. Worker traduz para contrato canônico, revalida referências internas e registra resultado seguro.

## Matriz de falhas

| Resultado | Ação |
| --- | --- |
| rede, timeout, 408, 429, 5xx | retry exponencial com jitter; respeitar `Retry-After` |
| payload/assinatura/autorização inválida | rejeitar, sem retry |
| provider 4xx de negócio | marcar permanente com código seguro |
| duplicata | devolver/registrar resultado idempotente |
| attempts esgotadas | DLQ, alerta, runbook e replay explícito |

## Contrato mínimo

Teste payload canônico → mapping, headers auth/idempotency, timeout, 429 com retry, 400 sem retry, duplicata, assinatura inválida, segredo ausente, replay e ausência de PII em logs.
