# Identity model

Identify an authenticated user with the stable application user ID after authentication succeeds. Use anonymous capture before login and alias/identify according to the PostHog SDK's supported merge flow. Do not use email or phone as the PostHog distinct ID. Server-side confirmation events must use the same application identity where available.
