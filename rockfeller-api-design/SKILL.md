---
name: rockfeller-api-design
description: Design and review Rockfeller REST APIs, endpoints, DTOs, OpenAPI contracts, pagination, errors, identifiers, authorization, idempotency, and versioning. Use when creating or changing a Rockfeller API or public integration contract.
---

# Rockfeller API Design

Use this skill for route, DTO, response, pagination, public identifier, breaking change, or write with external effect. Apply standard to new APIs; do not silently rewrite published Members/Leveling contracts.

## Design order

1. Write resource, actor, authorization rule, source of truth, side effect, audience, and lifecycle states.
2. Choose path/method from `contract.md`; define request DTO, success/errors, IDs and pagination.
3. Decide whether write needs `Idempotency-Key`, concurrency control, audit, provider adapter, queue or webhook verification.
4. Document OpenAPI operation, auth, schemas and every status; update generated client when present.
5. Keep controller as transport, use case as orchestration, infra as persistence/provider detail. Validate and authorize server-side.
6. Test normal, invalid, unauthorized, forbidden/not-found, duplicate-key, pagination and compatibility paths. Use `endpoint-examples.md`.

## Non-negotiable decisions

- Every identifier is UUID v7. Never create UUID v4, Nano ID, sequential public ID, or a second public identifier scheme.
- JSON success is `{ ok: true, data, pagination? }`; errors are `{ ok: false, error: { code, message, details? } }`. `X-Request-Id` is always a response header, never a body field.
- Cursor is default for changing/unbounded lists. Offset/page is reporting exception.
- `/v1` is additive; breaking input/semantic/body changes require `/v2` and migration.
- `Idempotency-Key` is mandatory for payments, webhooks and external effects. Error `code` is always upper snake case.

Read `current-api-baseline.md` before changing existing endpoint. Do not wrap webhook payload in this envelope before signature verification.

## References

- [Canonical contract](references/contract.md)
- [Current Members and Leveling baseline](references/current-api-baseline.md)
- [Endpoint examples](references/endpoint-examples.md)
