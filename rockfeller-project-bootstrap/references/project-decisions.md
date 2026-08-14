# Decisões antes do scaffold

## Brief obrigatório

```text
Produto e usuário principal:
Fluxo crítico:
Template escolhido e motivo:
Dados próprios e fonte de verdade:
Rotas públicas e autenticação:
Integrações externas:
Deploy/ambiente:
Critérios de aceite:
Fora de escopo:
```

Evita criar `web` que depois recebe backend improvisado ou monólito para página estática.

## Skills após scaffold

| Template | Skills Rockfeller pré-selecionadas |
| --- | --- |
| web | project-bootstrap, integration-delivery, product-instrumentation |
| api | project-bootstrap, integration-delivery, multitenant-security-review, api-design |
| monolith | todas as seis |

Exemplo: LP com formulário de lead usa integration e instrumentation; API administrativa usa api-design/security-review mesmo sem tenancy implementada.

## Definition of done do scaffold

Antes da primeira feature, confirme README PT-BR completo, AGENTS em inglês com CLAUDE/CONTRIBUTING symlinkados, CI de qualidade, configuração de deploy aplicável e code-review-graph inicializado. Ausência de item aplicável é dívida de scaffold, não tarefa opcional posterior.
