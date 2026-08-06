# Arquitetura Backend

## Objetivo

O backend do MarluHub será desenvolvido utilizando **ASP.NET Core Web API** com foco em organização, escalabilidade e facilidade de manutenção.

A arquitetura será implementada de forma incremental conforme a evolução do projeto.

---

## Fluxo da aplicação

```text
Angular
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Entity Framework Core
    │
    ▼
PostgreSQL
```

---

## Estrutura do projeto

```text
backend/
│
├── src/
│   └── MarluHub.Api/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Entities/
│       ├── Exceptions/
│       ├── Interfaces/
│       ├── Mappings/
│       ├── Repositories/
│       ├── Services/
│       ├── Validators/
│       ├── Program.cs
│       └── appsettings.json
│
└── tests/
```

---

## Responsabilidade das camadas

### Controllers

Recebem requisições HTTP e retornam respostas.

Não devem conter regras de negócio.

---

### Services

Responsáveis pelas regras de negócio.

---

### Repositories

Responsáveis pelo acesso aos dados.

---

### Data

Contém o DbContext, Migrations e configurações do Entity Framework.

---

### Entities

Representam as entidades persistidas no banco de dados.

---

### DTOs

Objetos utilizados para entrada e saída de dados da API.

---

### Interfaces

Contratos utilizados por Services e Repositories.

---

### Mappings

Conversão entre DTOs e Entities.

---

### Validators

Validação utilizando FluentValidation.

---

### Exceptions

Exceções customizadas da aplicação.

---

## Evolução

A arquitetura será implementada gradualmente conforme novos conceitos forem aprendidos.

Inicialmente serão utilizadas apenas as camadas necessárias para o MVP.