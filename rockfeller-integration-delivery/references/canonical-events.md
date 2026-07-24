# Canonical events

New integrations exchange this envelope at the Rockfeller boundary:

```ts
interface RockfellerIntegrationEvent<T> {
  id: string;
  type: string;
  version: number;
  occurredAt: string;
  source: string;
  tenantId: string;
  correlationId: string;
  idempotencyKey: string;
  data: T;
}
```

Use UUID v7 for `id`, `tenantId`, `correlationId`, and `idempotencyKey`; use ISO-8601 UTC time, stable lowercase dot-separated `type`, and integer schema `version`. Never use UUID v4 or Nano ID. If tenancy is not modeled, stop and obtain the correct canonical scope rather than substitute an arbitrary value. Provider payloads are translated at adapters; business modules consume canonical contracts.
