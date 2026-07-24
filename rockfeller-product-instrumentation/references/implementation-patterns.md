# Padrões de implementação PostHog

## Onde capturar

| Situação | Ponto | Motivo |
| --- | --- | --- |
| visualização de conteúdo | cliente, após recurso autorizado disponível | intenção real sem render abortado |
| clique/CTA | cliente, no gesto explícito | interação é o fato |
| pagamento, matrícula, entitlement, placement final | servidor, após persistência | evita sucesso falso |
| erro recuperável | cliente, com código seguro | mede fricção sem PII |
| automação | worker, após efeito confirmado | separa tentativa de resultado |

Não capture em componente que renderiza repetidamente sem guard de lifecycle. Para mutação, evento do servidor é fonte de verdade; evento de “iniciado” no cliente é complementar.

## Identidade e flags

Antes de login, use ID anônimo do SDK. Após login, identifique com `users.id`; nunca email, telefone ou CPF como `distinct_id`. Teste merge/alias da jornada pré-login.

Nomeie flags por capacidade/estado, como `checkout_new_flow`. Default seguro é `false` para mudança comportamental. Defina segmento, owner, data de remoção e rollback. Capture exposição somente quando a variante é recebida.

## Exemplo: checkout

Cliente captura `checkout.started` com `offer_id` e `source`. API captura `checkout.completed` depois que pedido/pagamento confirmado é persistido. Permitidos: `offer_id`, `provider`, `payment_method` enum, `source`; proibidos: nome, email, telefone, CPF, payload de provider e dados de cartão.
