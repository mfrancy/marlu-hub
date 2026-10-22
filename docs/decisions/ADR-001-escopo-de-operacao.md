# ADR-001: Escopo de uma única operação

- **Status:** Aceita
- **Data:** 2026-10-15

## Contexto

O MarluHub nasceu para resolver as necessidades reais de uma única revendedora de
produtos de beleza e substituir controles manuais de estoque, vendas e clientes.
Não existe objetivo atual de comercializar a aplicação como SaaS.

## Decisão

O sistema será projetado para uma única operação administrativa, com uma única conta
de revendedora. Não serão introduzidos, nesta fase, conceitos de múltiplas empresas,
multi-tenancy, assinaturas ou compartilhamento entre revendedoras.

O catálogo público não exigirá autenticação de clientes.

## Consequências

- O modelo de dados e os fluxos devem permanecer simples e adequados a uma operação.
- Boas práticas de segurança e organização continuam obrigatórias.
- Abstrações para escalabilidade comercial só devem ser adicionadas mediante uma
  necessidade concreta identificada posteriormente.
- Produtos, estoque, vendas, clientes e configurações pertencem à única operação.

