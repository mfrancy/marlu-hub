# ADR-002: Disponibilidade automática no catálogo

- **Status:** Aceita
- **Data:** 2026-10-15

## Contexto

O catálogo deve complementar as revistas oficiais de Natura e O Boticário mostrando
somente produtos que a revendedora possui e pode entregar imediatamente.

## Decisão

A disponibilidade será derivada automaticamente da quantidade em estoque:

- estoque maior que zero: produto disponível e visível no catálogo;
- estoque igual a zero: produto indisponível e oculto no catálogo.

Não haverá exceção manual para exibir produtos sem estoque ou sob encomenda.

O catálogo exibirá preço de venda e informações descritivas, mas não exibirá preço de
compra nem quantidade exata em estoque.

O contato será feito por link do WhatsApp com mensagem pré-preenchida, sem integração
com a API oficial e sem envio automático.

## Consequências

- Vendas e ajustes de estoque podem alterar automaticamente a visibilidade pública.
- Não é necessário manter um estado manual de disponibilidade para o MVP.
- Produtos sob encomenda ficam fora do catálogo do MarluHub.
- O telefone da revendedora deve ser configurável de forma segura, embora o número
  definido para o escopo atual seja `11970431430`.

