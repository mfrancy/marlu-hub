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
│       ├── Configuration/
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

Cada módulo deve expor uma interface em `Interfaces` e uma implementação em
`Repositories`. Services não devem acessar o `DbContext` diretamente.

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

Erros não tratados são registrados no servidor e retornados ao cliente como
`ProblemDetails`, sem expor stack trace, credenciais ou detalhes internos.

## Configuração e segurança

- `ConnectionStrings:DefaultConnection` deve ser fornecida por variável de ambiente,
  user secrets ou outro provedor externo. Nenhuma credencial deve ser versionada.
- `Cors:AllowedOrigins` lista explicitamente as origens confiáveis; curingas e
  origens inválidas não são aceitos.
- A aplicação usa HTTPS, HSTS fora do desenvolvimento e cabeçalhos básicos de
  proteção (`X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy`).
- O endpoint `/health` verifica a conectividade com o PostgreSQL.
- Alterações estruturais no banco devem ser criadas exclusivamente com EF Core
  migrations e aplicadas no pipeline de implantação.

### Desenvolvimento local

No PowerShell, configure os valores sem gravá-los no repositório:

```powershell
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=MarluHub;Username=postgres;Password=<senha>"
$env:ASPNETCORE_ENVIRONMENT = "Development"
dotnet run --project .\backend\src\MarluHub.Api
```

---

## Evolução

A arquitetura será implementada gradualmente conforme novos conceitos forem aprendidos.

Inicialmente serão utilizadas apenas as camadas necessárias para o MVP.