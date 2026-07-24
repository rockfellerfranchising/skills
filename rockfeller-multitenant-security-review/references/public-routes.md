# Public route policy

Public means unauthenticated user session is not required; it never means unvalidated or unprotected.

Allowed examples: health checks, public checkout/lead initiation, magic-link entry, and provider webhooks. Each public mutation needs input validation, size limits, rate limiting or provider verification, safe errors, and no secret in browser code. Webhooks additionally need signature or scoped API-key verification, replay/idempotency handling, and a minimal audit trail.
