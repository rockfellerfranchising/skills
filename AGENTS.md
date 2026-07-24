# AGENTS.md

## Propósito do repositório

Este repositório mantém skills internas da Rockfeller. Cada skill é um pacote de instruções operacionais para agentes de código, com conhecimento específico que deve ser reutilizado entre produtos.

O trabalho aqui altera orientação para outros agentes. Priorize precisão, contexto verificável e regras que possam ser aplicadas sem interpretação ambígua.

## Princípios

1. Baseie toda regra interna em evidência de repositórios, contratos ou decisão explícita. Marque lacunas como lacunas; não invente uma política corporativa.
2. Mantenha `SKILL.md` curto e procedural. Mova políticas, tabelas e exemplos extensos para `references/`.
3. Não transforme um sinal estático em certeza. Scripts de revisão devem apontar hipóteses e exigir inspeção do fluxo real.
4. Preserve compatibilidade com contratos publicados. Skills podem orientar migração, mas não devem ordenar quebra silenciosa de APIs ou webhooks legados.
5. Nunca inclua segredo, PII real, URL privada, token ou payload operacional completo em uma skill ou teste.

## Estrutura obrigatória

Cada skill fica na raiz, com nome em kebab-case:

```text
rockfeller-<nome>/
  SKILL.md
  agents/openai.yaml
  references/
  scripts/                 # somente quando houver automação determinística útil
```

- `SKILL.md` deve ter frontmatter com apenas `name` e `description`.
- A descrição precisa dizer claramente o que a skill faz e quais pedidos a acionam.
- Toda referência precisa ser ligada diretamente do `SKILL.md`; evite cadeias profundas de documentação.
- Use `agents/openai.yaml` para `display_name`, `short_description` e `default_prompt`.

## Criar ou mudar uma skill

1. Leia o README, esta instrução e as skills vizinhas antes de editar.
2. Identifique o gatilho, entrada, fluxo, saída e os fatos internos que a skill precisa conhecer.
3. Para uma skill nova, use o inicializador oficial; não monte arquivos de boilerplate manualmente:

   ```bash
   python3 /home/almeida/.codex/skills/.system/skill-creator/scripts/init_skill.py <nome> --path . --resources references
   ```

4. Use `scripts/` apenas para verificações repetíveis ou frágeis. Teste o script contra artefato real ou fixture representativa.
5. Se alterar o nome ou a disponibilidade de uma skill, atualize `../cli/src/scaffold/recommended-skills.ts` e seus testes no mesmo ciclo.
6. Valide todas as skills alteradas antes de encerrar:

   ```bash
   python3 /home/almeida/.codex/skills/.system/skill-creator/scripts/quick_validate.py <pasta-da-skill>
   ```

## Padrões editoriais

- Escreva documentação de produto e instruções internas em português brasileiro claro.
- Use código, nomes técnicos e contratos em inglês quando essa for a convenção do ecossistema.
- Prefira verbos imperativos, tabelas pequenas e exemplos minimamente suficientes.
- Evite README dentro de uma skill, changelog por skill, guias duplicados e texto que explique conceitos genéricos já conhecidos por um agente.
- Quando uma regra for específica de um produto, nomeie o produto e a fonte; não a generalize para toda a Rockfeller.

## Qualidade e entrega

Antes de entregar uma alteração:

- execute o validador das skills modificadas;
- execute scripts novos ou alterados;
- rode `git diff --check`;
- se mudar a CLI, rode os testes focados e o typecheck quando as dependências estiverem instaladas;
- informe o que mudou, quais fontes internas embasaram a mudança e qualquer limitação de validação.

## Code review graph

- Este repositório mantém `.code-review-graph/` como memória estrutural local. Não versione o banco do grafo.
- Ao trabalhar em um projeto Rockfeller que tenha code-review-graph, use suas ferramentas MCP de contexto mínimo, busca semântica, impacto e testes antes de `rg`/leitura ampla.
- O grafo é local-first e indexa símbolos, imports e chamadas para reduzir contexto e orientar revisão; atualize-o depois de mudanças estruturais conforme a instalação do projeto.

## Segurança

- Não copie bases, dumps, tickets privados ou dados de alunos, leads, colaboradores e franquias para este repositório.
- Nunca documente token, chave de webhook ou credencial em exemplos executáveis.
- Descreva vulnerabilidades com o mínimo necessário para correção e siga [SECURITY.md](SECURITY.md) para reporte responsável.
