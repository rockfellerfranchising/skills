---
name: rockfeller-product-instrumentation
description: Turn Rockfeller product issues, PRs, screens, and flows into privacy-safe PostHog instrumentation with event design, properties, identity and group rules, funnels, dashboards, feature flags, and validation. Use when adding or reviewing product analytics.
---

# Rockfeller Product Instrumentation

Use PostHog to answer a product decision, not to create an inventory of clicks. The inspected projects do not yet contain a PostHog SDK or live catalog, so every proposal must say whether it is a new implementation or a change to an existing one. PostHog product analytics does not replace operational telemetry: NestJS logs, request ID, traces, metrics and errors must use `@rockdev/telemetry`, never a manual implementation.

## Procedure

1. Write one decision question. Bad: “track checkout”. Good: “which offer/source combinations reach confirmed payment, and where do they abandon?”
2. Read `event-catalog.md`, `property-dictionary.md`, `identity-model.md`, and `pii-policy.md`. Reuse an event only when trigger and meaning match exactly.
3. Define owner, authoritative trigger, properties, identity, groups, and expected volume. Read `implementation-patterns.md` for client/server placement.
4. Define insight before code: funnel/cohort/dashboard, filters, conversion window, owner and action from result.
5. If behavior changes, define PostHog flag, default, rollout population, rollback condition and exposure event.
6. Validate with synthetic account: payload, property types, identity merge, group membership, dashboard inclusion, and no PII.

## Required output

```yaml
question: "..."
decision_owner: "..."
events: []
identity: "..."
groups: []
funnel_or_dashboard: "..."
feature_flag: "... | none"
pii_review: {}
validation: []
```

Use `references/measurement-plans.md` as templates. Read `deprecated-events.md` before retaining a legacy name.

## References

- [Event catalog](references/event-catalog.md) and [property dictionary](references/property-dictionary.md)
- [Implementation patterns](references/implementation-patterns.md) and [measurement plans](references/measurement-plans.md)
- [Identity model](references/identity-model.md), [group model](references/group-model.md), and [PII policy](references/pii-policy.md)
- [Dashboard conventions](references/dashboard-conventions.md) and [deprecated events](references/deprecated-events.md)
- [Telemetry integration](https://github.com/rockfellerfranchising/telemetry/blob/main/README.md)
