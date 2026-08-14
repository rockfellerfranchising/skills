---
name: rockfeller-integration-delivery
description: Design and review Rockfeller CRM, Make, n8n, Joy, WhatsApp, webhook, and provider integrations with canonical events, authentication, idempotency, retries, PII minimization, observability, and contract tests. Use when sending or receiving external data or events.
---

# Rockfeller Integration Delivery

Use this skill before any CRM, Make, n8n, Joy, WhatsApp, webhook, checkout, or provider connection. A provider call is an adapter, never a hidden side effect in a controller or component. Existing Members and LP contracts are legacy references: preserve published shape and add an adapter for gradual migration.

## Choose the delivery shape

| Situation | Default | Why |
| --- | --- | --- |
| Rockfeller owns state and notifies another system | durable event + outbound worker | retries survive request/process failure |
| Provider owns state and notifies Rockfeller | signed inbound webhook + durable acceptance | authenticate before effect; deduplicate before processing |
| User needs immediate provider result | direct server-side API call | bounded, actionable UX failure |
| Business owns no-code routing | canonical event to Make/n8n adapter | avoid a second source of truth |

Read `references/existing-provider-contracts.md` before modifying a known integration and `references/delivery-playbook.md` for the exact sequence.

## Delivery procedure

1. Write source of truth, command/event owner, consumer, effect, and failure owner. Reject designs with two systems updating the same business state.
2. Define canonical `type`, schema `version`, `source`, scope, `correlationId`, and deterministic `idempotencyKey`. New boundaries use `canonical-events.md`.
3. Write provider mapping and PII decision. Keep mapping/auth inside infra adapter.
4. For outbound calls, set timeout, retry classification, durable queue/outbox, bounded exponential backoff with jitter, and DLQ/replay. For inbound calls, verify raw-body signature/key, freshness, schema, and duplicates.
5. Add contract tests and operational artifacts before declaring integration done. Use injected `Telemetry.trackDependency()` for provider calls and `Telemetry.runJob()` for workers; never add a second logger, tracing setup, request-ID middleware or error reporter.

## Required delivery record

```md
source_of_truth:
canonical_event:
provider_adapter:
authentication_and_signature:
idempotency_and_deduplication:
timeout_retry_and_dlq:
pii_decision:
contract_tests:
observability_and_alerts:
runbook_and_replay_owner:
```

Include behavior for duplicate, timeout, 4xx, 5xx, malformed callback and replay. Never return a superficial `fetch(url, { body })` solution.

## References

- [Canonical events](references/canonical-events.md) and [provider mappings](references/provider-field-mappings.md)
- [Existing provider contracts](references/existing-provider-contracts.md)
- [Delivery playbook](references/delivery-playbook.md) and [retry policy](references/retry-policy.md)
- [Webhook security](references/webhook-security.md), [PII sharing](references/pii-sharing-policy.md), and [error codes](references/integration-error-codes.md)
- [Telemetry integration](https://github.com/rockfellerfranchising/telemetry/blob/main/README.md)
