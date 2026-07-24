# Initial event catalog

This is a proposed baseline; no PostHog implementation was found in the inspected repositories.

| Event | Owner | Trigger | Core properties |
| --- | --- | --- | --- |
| `lesson.viewed` | members | lesson page becomes available | `lesson_id`, `course_id`, `source` |
| `lesson.started` | members | playback starts | `lesson_id`, `course_id`, `source` |
| `checkout.started` | checkout | checkout begins | `offer_id`, `source` |
| `checkout.completed` | checkout | payment/order confirmed | `offer_id`, `provider` |
| `lead.submitted` | acquisition | server accepts lead | `source`, `form_variant` |
| `placement.started` | leveling | session created | `entrypoint` |
| `placement.completed` | leveling | result persisted | `level`, `completion_reason` |

Names are lowercase dot-separated past tense. Add an owner and schema before use.
