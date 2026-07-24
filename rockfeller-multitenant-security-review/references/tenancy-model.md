# Tenancy model status

The inspected Members, Leveling, and Expansion LP repositories do not currently define a shared `tenantId`, `schoolId`, school membership, or franchise-scoped authorization model. Do not fabricate one in a review.

When a feature claims school or franchise isolation, require an explicit decision for:

- authoritative tenant and school identifiers and their source in the authenticated server context;
- membership relation for staff, teacher, student, and franchise users;
- database filters and composite uniqueness/indexes;
- cache keys, job payloads, exports, storage prefixes, and webhook correlation.

Until that model exists, evaluate the implemented boundary: authenticated user ownership, CRM responsible assignment, integration key, session, or public route. Report the absence as `design gap: tenancy model missing`, with the feature that would require it.
