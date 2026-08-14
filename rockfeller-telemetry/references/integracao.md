# Integração de `@rockdev/telemetry`

## Fontes e URLs

- Pacote e instalação: <https://www.npmjs.com/package/@rockdev/telemetry>
- Guia de consumo e exemplos: <https://github.com/rockfellerfranchising/telemetry/blob/main/README.md>
- Contrato público e regras de segurança: <https://github.com/rockfellerfranchising/telemetry/blob/main/AGENTS.md>
- Convenções semânticas OpenTelemetry: <https://opentelemetry.io/docs/specs/semconv/>

As orientações abaixo foram verificadas no checkout `../telemetry`, versão `0.2.0`. Consulte o README da versão instalada antes de usar APIs novas.

## Integração NestJS mínima

```ts
// main.ts: primeiro import em desenvolvimento TypeScript
import '@rockdev/telemetry/register';
import { NestFactory } from '@nestjs/core';
import { TelemetryNestLogger } from '@rockdev/telemetry';

const app = await NestFactory.create(AppModule, { bufferLogs: true });
app.useLogger(app.get(TelemetryNestLogger));
app.enableShutdownHooks();
await app.listen(process.env.PORT ?? 3000);
```

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { TelemetryModule } from '@rockdev/telemetry';

@Module({ imports: [TelemetryModule.forRoot()] })
export class AppModule {}
```

Para produção, carregue o registro antes da aplicação:

```json
{ "start:prod": "node --import @rockdev/telemetry/register dist/main.js" }
```

Para Fastify, passe `createTelemetryFastifyOptions()` a `new FastifyAdapter(...)` na criação do app. Não crie logger Fastify/Pino separado.

No endpoint Terminus já existente, injete `TelemetryHealthIndicator` e devolva `telemetryHealth.status()`. Não exponha uma rota de health adicional só para telemetria.

## Contexto e sinais de domínio

Depois que o guard resolver a sessão, atribua o contexto com a API pública:

```ts
constructor(private readonly telemetryContext: TelemetryContext) {}

onAuthenticated(user: { id: string; tenantId?: string; schoolId?: string }) {
  this.telemetryContext.assign({
    actorId: user.id,
    tenantId: user.tenantId,
    schoolId: user.schoolId,
  });
}
```

Para providers, jobs e erros, injete `Telemetry` e use as operações correspondentes:

```ts
const result = await this.telemetry.trackDependency(
  { name: 'crm', operation: 'lead.upsert' },
  () => this.crm.upsert(lead),
);

await this.telemetry.runJob(
  { queue: 'integrations', job: 'deliver-lead', jobId },
  () => this.deliver(eventId),
);
```

Use `info`, `warn` e `error` para logs; `captureException` para reportar uma exceção; `increment` e `histogram` somente com labels de baixa cardinalidade. IDs, e-mail, URL, payload e texto da exceção não são labels de métrica.

## Ambiente e validação

Defina `OTEL_SERVICE_NAME`, `NODE_ENV` e uma versão (`OTEL_SERVICE_VERSION`, `RELEASE`, `RAILWAY_DEPLOYMENT_ID` ou `GIT_SHA`). Configure `OTEL_EXPORTER_OTLP_ENDPOINT` e `OTEL_EXPORTER_OTLP_HEADERS` apenas no ambiente seguro. `POSTHOG_API_KEY` habilita o reporter de exceções padrão. As flags `TELEMETRY_ENABLED`, `TELEMETRY_TRACING_ENABLED`, `TELEMETRY_METRICS_ENABLED`, `TELEMETRY_ERRORS_ENABLED` e `TELEMETRY_ERROR_STACK_ENABLED` desabilitam sinais apenas quando recebem `false`.

Valide com valores sintéticos:

1. request ID UUID recebido e ID gerado para header inválido;
2. resposta com o mesmo header de request ID, logs estruturados e rota parametrizada;
3. 4xx sem ruído de error tracking e 429/5xx reportados;
4. redaction de segredo/PII em log, span e reporter;
5. contexto isolado entre requisições concorrentes e contexto de job;
6. flush em `app.close()`.

## Lacuna de compatibilidade conhecida

Na versão verificada, o filtro padrão do pacote devolve erros como `{ error: { code, message, requestId } }`. A skill `rockfeller-api-design` define outro envelope e exige request ID somente no header. Antes de adotar o filtro em uma API que publique esse contrato, abra uma mudança compatível em `@rockdev/telemetry` ou alinhe o contrato; não contorne com outro filtro global ou middleware manual.
