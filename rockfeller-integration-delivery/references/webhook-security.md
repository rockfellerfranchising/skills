# Webhook security

Verify a provider signature over the raw body using constant-time comparison, timestamp freshness, and configured secret. If a provider supports only API keys, store a hash and fail closed on missing/revoked keys. Validate content type and body size, acknowledge only after durable acceptance, deduplicate by event identity, and do not log raw payloads with PII.
