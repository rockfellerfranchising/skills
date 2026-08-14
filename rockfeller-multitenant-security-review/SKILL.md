---
name: rockfeller-multitenant-security-review
description: Review Rockfeller PRs, endpoints, use cases, repositories, jobs, caches, exports, and webhooks for authorization, ownership, PII, auditability, and tenant or school isolation. Use for security reviews and before implementing features that access students, staff, schools, franchises, CRM data, or external integrations.
---

# Rockfeller Multitenant Security Review

Use this skill to review a PR, endpoint, use case, repository, worker, export, or provider callback. Start with the request path, not a generic checklist. The current baseline is Members RBAC/ownership; `tenantId` and `schoolId` are not yet a shared data model and must not be invented.

## Read before reviewing

1. Read `references/current-boundaries.md` for the actual Members roles, contexts, protected resources, queues, and sensitive records.
2. Read `references/tenancy-model.md` only when the task claims franchise, tenant, school, teacher, employee, or student segregation.
3. Read the focused policy: `role-permission-matrix.md`, `sensitive-data-policy.md`, `public-routes.md`, or `audit-events.md`.

## Review procedure

### 1. Write the access hypothesis

State actor, resource, action, permitted scope, and expected denial. Example: `comercial` may read only leads for which it is responsible; an unrelated lead must not be distinguishable through `GET /v1/admin/crm/leads/:id`.

### 2. Follow the complete enforcement path

For HTTP, trace decorator/guard → controller → use case → repository → query. For async work, trace producer → serialized payload → queue/job ID → worker reload → provider/export. Identify which value carries actor and scope, where it is trusted, and where it is revalidated.

In Members, `@Roles`/`@RequirePermission` establish coarse access; `@RequireAccess` and repository `canUserAccess` establish object-level access. Neither client-side visibility nor a UUID parser is an ownership check.

### 3. Inspect data escape hatches

Check direct `findById`, joins, list filters, cache keys, object-storage paths, generated download links, webhook callbacks, event payloads, exception messages, logs, and retries. In NestJS, require `@rockdev/telemetry` for request context, redaction, logs and errors; flag parallel manual implementations as a design gap. Run:

```bash
bun scripts/scan-tenant-queries.ts <directory>
```

The script finds candidates only. Inspect surrounding predicates and callers; a query by ID can be safe when a guard already loaded and attached the approved resource.

### 4. Decide severity with evidence

Report a confirmed finding only when an untrusted actor can reach data or cause an effect outside its allowed scope. Report an absent school/tenant model as a design gap that blocks a proposed isolated feature, not as a hypothetical exploit in unrelated current code.

### 5. Specify a fix that holds at every boundary

Put authorization in server-side policy/repository paths, scope cache and job identifiers, keep public routes fail-closed, and add a regression test that uses two actors and two resources. Read `references/concrete-review-patterns.md` for examples.

## Required output

For every confirmed or high-confidence design finding, use:

```md
## Finding: <severity> — <title>

### Evidence
- <file and behavior>

### Exploitation
<actor, request/job input, target outside scope, observable result>

### Correction
<server-side ownership/scope enforcement and cache/job change>

### Regression test
<actor, target resource, expected 404 or 403>
```

Add `confidence` (`confirmed` or `design gap`) and cite the exact missing layer. Use 404 for undiscoverable cross-scope resources when policy requires concealment; otherwise use 403 consistently. Do not rely on hidden UI, client claims, or path naming as authorization.

## References

- `references/current-boundaries.md`: Members/Leveling runtime map and evidence sources.
- `references/concrete-review-patterns.md`: review walkthroughs and regression-test patterns.
- `references/tenancy-model.md`: current boundary and how to report missing tenancy.
- `references/role-permission-matrix.md`: Members RBAC baseline.
- `references/sensitive-data-policy.md`, `public-routes.md`, and `audit-events.md`: handling rules.
- `references/known-security-failures.md`: patterns to look for; not confirmed vulnerabilities.
- [Telemetry integration](https://github.com/rockfellerfranchising/telemetry/blob/main/README.md)

Read [current boundaries](references/current-boundaries.md) and [concrete review patterns](references/concrete-review-patterns.md) for the Members/Leveling baseline.
