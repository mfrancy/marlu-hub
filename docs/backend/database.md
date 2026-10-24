# Banco de Dados

## Tecnologia

- PostgreSQL
- Entity Framework Core

---

## Entidades previstas

- Product
- Category
- Brand
- Customer
- Sale
- SaleItem
- User

---

## Relacionamentos

Customer
│
└── Sales
      │
      └── SaleItems
                │
                └── Product
                        │
                        ├── Brand
                        └── Category

---

## Migrations

Todas as alterações estruturais do banco serão realizadas através do Entity Framework Core Migrations.

---

## Convenções

- Chaves primárias utilizando Guid.
- Nomes de tabelas no singular.
- Relacionamentos configurados via Fluent API quando necessário.
- Consultas de leitura devem usar `AsNoTracking` quando não houver alteração da
  entidade.
- O acesso ao banco deve ocorrer através dos repositórios do módulo, mantendo o
  `DbContext` na camada `Data`.
- Conexões utilizam tentativas automáticas para falhas transitórias do PostgreSQL.