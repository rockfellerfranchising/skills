# Members RBAC baseline

Observed system roles are `admin`, `comercial`, `member`, and `professor`. `member` represents a course customer; the others are staff roles. Custom roles are backed by explicit permission keys.

| Area | Relevant permissions | Scope behavior |
| --- | --- | --- |
| CRM leads | `crm.lead.read`, `crm.lead.read.own`, create/update/delete/assign | `comercial` may be limited to assigned leads; verify `canUserAccess` at resource level. |
| Staff users | `user.*`, `user.role.assign`, `user.role.assign.admin` | role changes must be authorized and audited. |
| Members | `member.*` | course access must be enforced server-side. |
| Content | `material.manage`, `product.manage` | admin routes additionally use role guards. |
| Automation/channels | `automation.manage`, `channel_template.manage` | keys and provider configuration are privileged. |

This is a Members-specific baseline, not a school/franchise permission matrix. A new system must define its own resource-to-role mapping.
