# Patterns requiring review

- repository lookup by resource ID with no ownership/scope assertion;
- cache key based only on resource ID when content differs by authorization context;
- queue payload or worker reload that loses the initiating actor/scope;
- export created under one user and downloaded by another without ownership check;
- `@Public()` route without rate limit, signature, or integration-key verification;
- raw webhook/media payloads logged or forwarded unnecessarily;
- trust in a client-supplied role, tenant, school, or user ID.

These are review hypotheses. Verify the path before reporting a vulnerability.
