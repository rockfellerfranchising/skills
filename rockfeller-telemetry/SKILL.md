---
name: rockfeller-telemetry
description: Integre e revise observabilidade em serviços NestJS Rockfeller com @rockdev/telemetry, incluindo logs estruturados, request ID, contexto assíncrono, traces, métricas, erros, jobs e shutdown. Use ao criar ou alterar bootstrap, logger, middleware/interceptor HTTP, tratamento de exceção, health, worker ou integração externa de um serviço NestJS.
---

# Rockfeller Telemetry

Use `@rockdev/telemetry` como a única integração de observabilidade de serviços NestJS Rockfeller. Não implemente `AsyncLocalStorage`, middleware/interceptor de request ID, logger Pino, setup OpenTelemetry, redaction, filtro global de exceção, métricas HTTP, health ou flush manualmente. Não importe dependências internas do pacote, como Pino, PostHog ou SDKs OpenTelemetry.

Leia [integração e referências](references/integracao.md) antes de alterar o bootstrap ou a configuração. Preserve contratos HTTP já publicados; se o formato de erro exigido divergir do filtro do pacote, trate como lacuna de compatibilidade e evolua o pacote, sem criar um handler paralelo.

## Passo a passo

1. Confirme Node 20+, Nest 10/11 e o adapter HTTP. Instale `pnpm add @rockdev/telemetry`.
2. Carregue `@rockdev/telemetry/register` antes de Nest, banco e clients HTTP: em produção, `node --import @rockdev/telemetry/register dist/main.js`; em desenvolvimento TypeScript, como primeiro import do entrypoint.
3. Registre `TelemetryModule.forRoot()` uma vez no módulo raiz. No `main.ts`, crie Nest com `bufferLogs: true`, use `TelemetryNestLogger` e habilite shutdown hooks. Para Fastify, crie o adapter com `createTelemetryFastifyOptions()`.
4. Defina somente as variáveis documentadas: identidade do serviço (`OTEL_SERVICE_NAME`, `NODE_ENV`, release), endpoint/headers OTLP e flags `TELEMETRY_*`. Não escreva credenciais em código, documentação ou `.env.example`.
5. Após autenticar, atribua `actorId`, `tenantId` e `schoolId` por `TelemetryContext.assign()` ou pelo extrator `context.extract`. Para trabalho fora de HTTP, use `Telemetry.runJob()` ou `TelemetryContext.run()`; não use estado global.
6. Injete `Telemetry` para eventos de domínio, `trackDependency()` para chamadas de provider e `span()`/`@Trace` apenas em trechos de diagnóstico úteis. Use métricas com atributos de baixa cardinalidade.
7. Injete `TelemetryHealthIndicator` no endpoint de health já existente; a biblioteca não cria rota pública. Teste request ID aceito/gerado, contexto concorrente, 4xx esperado, 5xx, redaction, uma chamada externa, job e shutdown. Teste Express e Fastify quando ambos forem suportados.

## Regras de implementação

- Registre eventos estáveis, em `snake_case` ou pontuados, com atributos seguros. Não registre body, URL com query, segredo, token, CPF, cartão ou PII desnecessária.
- Deixe request ID, traces HTTP, métricas HTTP, captura automática de 5xx/429, sanitização e resposta segura de exceção sob responsabilidade do pacote.
- Para uma chamada externa, envolva somente o adapter em `trackDependency({ name, operation }, fn)`. Para tentativas, DLQ e replay, mantenha os eventos de domínio e chaves de idempotência do contrato da integração.
- Mantenha PostHog de analytics de produto separado: ele mede comportamento do produto; `@rockdev/telemetry` é o caminho obrigatório para sinais operacionais do serviço.

## Referências

- [Integração, configuração e compatibilidade](references/integracao.md)
