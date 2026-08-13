# Contrato de API Rockfeller

## Paths e identificadores

Use REST sob `/v1`, substantivos plurais e nesting apenas para contenção real. Todo identificador persistido, público, interno, de provider, cache, fila e correlação é UUID v7. Nunca use UUID v4, `gen_random_uuid()`, Nano ID, ID sequencial ou coluna paralela de ID público em trabalho novo. Configure geração UUID v7 explicitamente na aplicação/migração; não herde defaults legados de UUID v4 silenciosamente.

## Respostas

Sucesso JSON:

```json
{ "ok": true, "data": {}, "pagination": {} }
```

`pagination` é opcional e exclusiva de listagens. Toda resposta inclui `X-Request-Id` no header; nunca duplique o request ID no body.

Erro JSON:

```json
{ "ok": false, "error": { "code": "INVALID_PAYLOAD", "message": "...", "details": [] } }
```

Use códigos upper snake case estáveis: `INVALID_PAYLOAD`, `UNAUTHORIZED`, `RESOURCE_NOT_FOUND`, `IDEMPOTENCY_CONFLICT`, `PROVIDER_UNAVAILABLE`. Não exponha detalhes do provider ou segredos.

## Paginação

Para coleção mutável/não limitada, ordene de modo estável e use cursor:

```json
{ "ok": true, "data": [], "pagination": { "limit": 50, "nextCursor": "opaque", "hasMore": true } }
```

Aceite `limit` e `cursor`; cursor codifica a borda de ordenação e filtros permanecem iguais. Omita paginação apenas em coleção limitada. Offset/page é exceção explícita de relatório que exige acesso aleatório.

## Escritas e compatibilidade

Valide DTO estritamente, autorize no servidor e use status HTTP semântico. Escritas aceitam `Idempotency-Key`; ela é obrigatória para pagamentos, efeitos externos e processamento acionado por webhook. Persista chave e devolva resultado seguro original em duplicata.

Mudanças em `/v1` são aditivas. Use `/v2` para path, campo obrigatório, semântica ou resposta incompatível. Depreque com documentação/janela de migração; nunca reaproveite campo silenciosamente.

## Documentação e segurança

Publique OpenAPI e referência interativa, documente auth/status, mantenha segredos server-side e aplique limite de body/rate limit em público. Em NestJS, use `@rockdev/telemetry` para logs seguros, request ID, traces, métricas, erros e auditoria correlacionável; não implemente essas camadas manualmente. Preserve o contrato publicado de erro ao adotar o filtro do pacote.
