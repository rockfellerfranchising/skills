# Provider mapping rules

Keep one explicit map per provider and version. Map from canonical `data` to provider fields, never the reverse inside domain code. Known boundaries include CRM ingestion/API keys, RockPlus sync, Joy checkout, Meta/Evolution WhatsApp, and external lead webhooks.

Document required fields, transformations, provider identifiers, nullable fields, and response mapping. Treat provider spelling quirks as adapter-only compatibility details.
