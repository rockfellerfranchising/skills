# Especificações por exemplo

## Lista cursorizada

```text
GET /v1/admin/courses?limit=50&cursor=<opaque>&status=published
```

```json
{ "ok": true, "data": [{ "id": "uuid-v7", "title": "..." }], "pagination": { "limit": 50, "nextCursor": "opaque-or-null", "hasMore": true } }
```

Ordene, por exemplo, `(created_at DESC, id DESC)`. Cursor representa borda; filtros permanecem iguais. Rejeite limit inválido e não exponha cursor decodificável sensível.

## Escrita idempotente

```text
POST /v1/checkout/orders
Idempotency-Key: <client-generated-key>
```

Validar DTO → autorizar → persistir intenção/hash da chave → executar/enfileirar efeito → persistir resultado → devolver mesma resposta para mesma chave/payload. Mesma chave com payload diferente retorna conflito. Banco impõe unicidade; cache não basta.

```json
{ "ok": true, "data": { "id": "uuid-v7", "status": "awaiting_payment" } }
```

## Erro e mudança incompatível

```json
{ "ok": false, "error": { "code": "INVALID_PAYLOAD", "message": "Dados inválidos.", "details": [{ "field": "email", "code": "INVALID_EMAIL" }] } }
```

`X-Request-Id` é sempre header. Nunca exponha stack, SQL, provider payload, token ou regra interna. Não transforme `GET /v1/admin/leads` de `{ leads }` em novo envelope: mantenha, adicione campo seguro ou publique `/v2` com OpenAPI/client/migração.
