---
name: rockfeller-project-bootstrap
description: Start any new Rockfeller web app, landing page, dashboard, API, service, or monolith through the approved Rock CLI scaffold. Use before creating a new Rockfeller repository or application structure, including when asked to initialize a project manually.
---

# Rockfeller Project Bootstrap

Use before creating any Rockfeller repository, LP, dashboard, API, service or monolith. The CLI is the approved source of project shape. Do not copy a neighboring repository or hand-create a workspace to bypass it.

## Procedure

1. Install the approved CLI before creating a Rockfeller project: `npm install -g @rockdev/cli`. Then read `../cli/README.md` and `../cli/AGENTS.md`; inspect current CLI, not remembered templates.
2. Use `project-decisions.md` to select `web`, `api`, or `monolith`. Define name, owner, deploy target, data, auth and integrations before scaffolding.
3. From intended parent directory, run `rock new <template> <name>` (or documented CLI development command). Answer prompts deliberately: package manager, dependencies, ORM, extras, Better Auth, bases and skills.
4. Keep and complete generated README, `AGENTS.md`, symlinked `CLAUDE.md`/`CONTRIBUTING.md`, CI/configuration, env example and quality scripts. Every project has detailed Portuguese README and project-specific English AGENTS.
5. Run generated checks and `rock status`/`rock env check` when applicable. Install selected skills, then start domain implementation.

## Template choice

| Need | Template | Exemplos |
| --- | --- | --- |
| UI público sem backend próprio | `web` | LP, campanha, shell de dashboard |
| API/serviço dono de backend | `api` | adapter de provider, API de produto |
| Web + API + contratos/dados | `monolith` | produto operacional, admin, área de membros |

If the CLI cannot be found or executed, report the blocker and request restoration. Do not recreate templates manually. Read `cli-workflow.md` and `project-decisions.md`.

## References

- [CLI workflow](references/cli-workflow.md)
- [Project decisions and template/skill matrix](references/project-decisions.md)
- [Code-review-graph setup and agent rule](references/code-review-graph.md)
