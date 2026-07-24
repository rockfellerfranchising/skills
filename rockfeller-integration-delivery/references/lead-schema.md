# Lead schema

Minimum lead fields are `name`, `phone`, and/or `email`, plus source and consent where applicable. Expansion LP currently sends name, phone, city, investment range, opening timeline, and profile to a server-side CRM webhook. Members CRM ingestion accepts lead identity, event type, optional payload, stage, tags, products, and UTM fields.

Normalize phone and email at the boundary. Do not forward fields not required by the destination. Preserve consent provenance for marketing use.
