# Sensitive data

Never expose or log raw values unnecessarily. Treat as sensitive: names, email, phone, CPF, address, payment/order data, authentication codes and tokens, WhatsApp messages/media, audio, transcripts, placement results, CRM history, and user/session identifiers when combined with identity.

Minimize data sent to analytics, queues, exports, providers, and error logs. Mask secrets and use opaque IDs where the recipient does not need identity. Require explicit product/legal approval before adding a new PII recipient.
