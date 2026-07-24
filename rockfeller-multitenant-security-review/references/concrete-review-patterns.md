# Padrões concretos de revisão

## IDOR em lead do CRM

**Caminho esperado:** `@RequireAccess('lead')` → `AccessGuard` → `AccessPolicies.assertLead` → `CrmLeadsRepository.canUserAccess`.

**Falha:** endpoint novo chama `findById(id)` ou retorna `findByPhone`/`findByEmail` antes de aplicar a policy. Um comercial com UUID/telefone de lead de outro responsável consegue observá-lo.

**Teste:** dois comerciais, dois leads atribuídos separadamente; o primeiro chama detalhe, lookup, timeline e exportação do segundo; esperar 403/404 conforme contrato.

## Cache com visibilidade errada

**Falha:** chave `lead:<id>` guarda campos de admin e é reutilizada para comercial. Autorizar antes de gravar não resolve consumidores posteriores.

**Correção:** cachear só dados invariantes e reautorizar, ou incluir todas as dimensões de visibilidade na chave. Nunca usar role fornecido pelo cliente.

## Export e job

**Falha:** job recebe só `exportId`, worker gera sem refazer carteira e download aceita qualquer autenticado.

**Correção:** persistir requester/filtros/expiração; validar ownership na geração e no download; auditar geração, retry e download sem registrar linhas do arquivo.

## Webhook público

**Falha:** `@Public()` sem chave/assinatura, deduplicação ou schema cria eventos/SDR repetidos.

**Correção:** verificar raw body, segredo, tamanho e schema; deduplicar por ID confiável; persistir aceitação antes de enfileirar; consumidor idempotente.

## Feature de escola/franquia

Sem `schoolId`/membership canônico, o finding é `design gap`: definir contexto autenticado, membership, filtros, cache/job/export e testes antes da entrega. Não alegar IDOR atual sem caminho explorável.
