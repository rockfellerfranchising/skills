# Retry policy

Use a bounded timeout for every outbound call. Retry transient network errors, 408, 429, and 5xx with exponential backoff and jitter; honor `Retry-After`. Do not retry validation, authentication, signature, or other permanent 4xx errors.

Persist or enqueue work before retrying when delivery must survive process restart. Use a deterministic idempotency key and a dead-letter record after the bounded attempt budget. Replay must be deliberate, auditable, and idempotent.
