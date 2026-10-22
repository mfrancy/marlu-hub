# ADR-003: Histórico de vendas, pagamentos e devoluções

- **Status:** Aceita
- **Data:** 2026-10-15

## Contexto

O sistema deve substituir registros em cadernos e permitir acompanhar vendas à vista e
parceladas sem perder o histórico quando produtos ou valores forem alterados.

## Decisão

Uma venda preservará, em cada item, o nome e o preço unitário no momento da venda.
O total será calculado a partir dos itens. Vendas podem ser editadas e canceladas,
mas pagamentos já realizados não serão apagados.

Parcelas terão vencimento e situação própria (`Pendente`, `Paga` ou `Atrasada`).
Pagamentos devem registrar a data efetiva, atualizar o saldo devedor e permitir
consultar valores por vencimento.

Cancelamentos mantêm a venda com status `Cancelada`, devolvem as quantidades ao
estoque e impedem a continuidade de cobranças futuras. Valores pagos que excederem o
valor final devido serão tratados como devoluções separadas, com status `Pendente` ou
`Devolvido`, datas, método e observações.

## Consequências

- O histórico de vendas não dependerá do cadastro atual do produto.
- Alterações de venda exigem recalcular itens, estoque, parcelas e saldo sem remover
  recebimentos existentes.
- O tratamento financeiro permanece manual; não haverá integração bancária.
- O modelo de domínio precisará diferenciar pagamento recebido de devolução ao cliente.

