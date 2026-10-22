# Requisitos descobertos

## Objetivo e contexto

O MarluHub é uma aplicação pessoal para uso de uma revendedora de produtos de beleza,
atualmente representada pela operação de revenda de Natura e O Boticário da mãe da
responsável pelo projeto.

O objetivo é substituir controles manuais de estoque, vendas e clientes por uma
ferramenta simples, confiável e fácil de usar. O sistema também terá um catálogo
público de produtos à pronta entrega, com contato via WhatsApp.

O projeto não tem como objetivo atual tornar-se um SaaS ou atender múltiplas empresas
ou revendedoras. Decisões de arquitetura devem ser proporcionais a uma única
operação, sem abstrações ou infraestrutura comercial sem justificativa concreta.

## Usuários e acesso

- Existe uma única conta administrativa da revendedora.
- A conta é criada ou configurada pelo administrador; não haverá cadastro público de
  usuários.
- O catálogo é público e não exige conta ou login do cliente.
- Os dados administrativos pertencem exclusivamente à operação da revendedora e não
  são compartilhados com outras revendedoras.

## Produtos e estoque

Cada produto deve contemplar:

- código;
- nome;
- descrição;
- marca;
- categoria;
- imagem;
- preço de compra;
- preço de venda;
- quantidade em estoque.

Os campos acima foram identificados como necessários; a obrigatoriedade individual
deve ser refinada quando o fluxo de cadastro for detalhado.

Regras confirmadas:

- A quantidade em estoque é contada em unidades inteiras.
- A revendedora pode corrigir manualmente o estoque.
- Vendas acima do estoque são permitidas somente mediante confirmação explícita.
- O catálogo não exibe produtos sob encomenda.
- A disponibilidade é automática:
  - `Disponível` quando o estoque é maior que zero;
  - `Indisponível` quando o estoque é igual a zero.
- Apenas produtos com estoque maior que zero aparecem no catálogo público.
- Produtos que chegam a estoque zero deixam de aparecer automaticamente.
- Não haverá exceção manual para anunciar produto sem estoque.

## Vendas

Uma venda deve conter:

### Obrigatórios

- data e hora, preenchidas automaticamente;
- pelo menos um produto;
- quantidade de cada item;
- preço unitário de cada item, preservado no momento da venda;
- valor total, calculado pelo sistema;
- status de pagamento.

### Opcionais

- cliente associado;
- forma de pagamento;
- observações;
- modalidade de recebimento: entrega ou retirada;
- status da entrega, quando aplicável.

O cliente pode ser associado sem cadastro prévio. Se houver associação, o nome é
obrigatório e o cadastro pode ser reutilizado em vendas futuras. Telefone/WhatsApp e
observações do cliente são opcionais.

O nome e o preço unitário do produto devem ser copiados para o item da venda. Alterações
posteriores no cadastro do produto não podem modificar o histórico.

## Parcelamento e pagamentos

Vendas parceladas devem permitir:

- informar a quantidade de parcelas;
- informar o valor de cada parcela;
- informar a data de vencimento de cada parcela;
- exigir que a soma das parcelas corresponda ao total da venda.

Cada parcela possui situação própria:

- `Pendente`;
- `Paga`;
- `Atrasada`, quando estiver pendente e o vencimento já tiver passado.

O sistema deve permitir registrar a data efetiva do pagamento, atualizar o saldo
devedor e calcular o status geral da venda. Também deve permitir consultar valores a
receber por vencimento e identificar parcelas atrasadas.

## Edição e cancelamento de vendas

Vendas podem ser editadas e canceladas.

Ao editar:

- produtos, quantidades e demais dados podem ser alterados;
- o estoque é ajustado somente pela diferença entre as quantidades anterior e nova;
- total, parcelas e saldo devedor são recalculados quando necessário;
- pagamentos já realizados não são apagados nem desconsiderados.

Ao cancelar:

- as quantidades vendidas retornam ao estoque automaticamente;
- a venda permanece registrada com status `Cancelada`;
- a venda não é excluída permanentemente;
- parcelas futuras não devem continuar sendo cobradas como se a venda estivesse ativa.

Se houver pagamentos realizados e o valor final devido for reduzido, a diferença a
devolver é calculada separadamente. O pagamento recebido nunca deve ser confundido
com uma devolução.

## Devoluções

Uma devolução é registrada separadamente dos pagamentos e contém:

- valor a devolver, obrigatório;
- status `Pendente` ou `Devolvido`;
- data do registro, preenchida automaticamente;
- data efetiva da devolução, preenchida quando concluída;
- método de devolução, como Pix, dinheiro ou transferência, quando aplicável;
- observações opcionais.

Não haverá integração bancária ou processamento automático. O registro é manual.
Devolução pendente não é considerada concluída.

## Catálogo público

O catálogo exibe:

- nome;
- imagem;
- marca;
- categoria;
- descrição;
- preço de venda.

O catálogo não exibe:

- preço de compra;
- quantidade exata em estoque.

Cada produto deve permitir iniciar uma conversa no WhatsApp da revendedora. O número
configurado para o contato é `11970431430`. O sistema deve abrir um link do WhatsApp
com mensagem pré-preenchida, identificando o produto, por exemplo:

> Olá! Tenho interesse no produto [nome do produto] que vi no seu catálogo. Ele ainda
> está disponível?

A cliente deve revisar e enviar a mensagem manualmente. O sistema não enviará mensagens
automaticamente e não usará a API oficial do WhatsApp.

## Ponto de retomada

A próxima pergunta da entrevista é:

> Produtos que já aparecem em vendas poderão ser excluídos permanentemente, ou devem
> permanecer cadastrados e apenas ficar inativos/ocultos para preservar o histórico?

Também permanece pendente o detalhamento do histórico e dos campos obrigatórios dos
ajustes manuais de estoque, cuja pergunta foi adiada durante a sessão.

