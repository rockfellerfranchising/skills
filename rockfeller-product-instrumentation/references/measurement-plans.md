# Planos de medição prontos para adaptar

## Aulas: descoberta → início

```yaml
question: "Alunos encontram e iniciam as aulas liberadas?"
events:
  - { name: lesson.viewed, trigger: "aula autorizada disponível", properties: [lesson_id, course_id, source] }
  - { name: lesson.started, trigger: "player inicia", properties: [lesson_id, course_id, source] }
funnel: "lesson.viewed → lesson.started; janela 30 minutos"
```

## LP: envio de lead

```yaml
question: "Qual CTA e variante geram envios aceitos pelo CRM?"
events:
  - { name: lead.form_started, trigger: "primeira interação", properties: [source, form_variant] }
  - { name: lead.submitted, trigger: "route handler confirma aceite", properties: [source, form_variant] }
funnel: "lead.form_started → lead.submitted; mesma sessão"
```

Nunca capture conteúdo de formulário, cidade, investimento, telefone, email ou nome.

## Nivelamento: conclusão

```yaml
question: "Onde participantes abandonam e quais sessões terminam?"
events:
  - { name: placement.started, trigger: "sessão persistida", properties: [entrypoint] }
  - { name: placement.completed, trigger: "resultado persistido", properties: [level, completion_reason] }
funnel: "placement.started → placement.completed; janela 24 horas"
```

Não envie áudio, transcript, respostas, evidência de avaliação ou session ID para analytics.
