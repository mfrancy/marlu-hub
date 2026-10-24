# Base técnica do backend

## Contexto

Esta documentação registra a implementação da feature de infraestrutura técnica do
backend do MarluHub. O objetivo é manter uma base segura e reutilizável para os
próximos módulos, sem transformar bibliotecas ou configurações em funcionalidades
de produto.

- **Branch:** `39-mvp1-infraestrutura-tecnica-be`
- **Escopo:** .NET, PostgreSQL, Entity Framework Core, arquitetura incremental,
  configuração, segurança, Swagger, migrations e padrões transversais.

## Arquitetura implementada

O fluxo recomendado para novos módulos é:

```text
Controller -> Service -> Repository -> DbContext -> PostgreSQL
```

As responsabilidades estão separadas da seguinte forma:

- `Controllers`: HTTP, validação de parâmetros e códigos de resposta;
- `Services`: regras de negócio e orquestração;
- `Interfaces`: contratos dos serviços e repositórios;
- `Repositories`: acesso às entidades persistidas;
- `Data`: `DbContext`, migrations e configuração do EF Core;
- `DTOs`: contratos de entrada e saída da API;
- `Entities`: modelos persistidos;
- `Mapping`: conversões com AutoMapper.

O `ProductService` passou a depender de `IProductRepository` e
`IProductService`, servindo como referência para os próximos módulos.

## Segurança e configuração

- A conexão PostgreSQL não contém mais credenciais versionadas.
- `ConnectionStrings__DefaultConnection` deve ser fornecida por variável de ambiente,
  user secrets ou outro provedor externo.
- As origens CORS são configuradas em `Cors:AllowedOrigins` e validadas no início da
  aplicação. Não são permitidos curingas ou origens com caminho/query.
- A aplicação usa HTTPS, HSTS fora do ambiente de desenvolvimento e os cabeçalhos:
  `X-Content-Type-Options`, `X-Frame-Options` e `Referrer-Policy`.
- Exceções não tratadas são registradas no servidor e retornadas como
  `ProblemDetails`, sem stack trace ou detalhes internos.
- O endpoint `/health` verifica a conectividade com o banco.
- Paginação possui limites: `page` positivo e `pageSize` entre 1 e 100.
- Operações assíncronas aceitam `CancellationToken`.

## Entity Framework Core

Foi adicionada `MarluHubContextFactory`, permitindo executar comandos `dotnet ef`
sem iniciar a aplicação:

```powershell
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=MarluHub;Username=postgres;Password=<senha>"
dotnet ef migrations has-pending-model-changes --project .\backend\src\MarluHub.Api
```

Alterações estruturais continuam devendo ser feitas exclusivamente por migrations.
Na implementação desta feature não houve alteração de schema nem necessidade de
criar uma nova migration.

## Ajustes da API de produtos

- `POST /api/products` retorna `201 Created` com `CreatedAtAction`.
- `GET /api/products/{id}` retorna `404` sem expor o identificador no corpo.
- `PUT` usa `UpdateProductDto` próprio.
- Leituras paginadas usam `AsNoTracking` e ordenação determinística.
- O endpoint de demonstração `weatherforecast` foi removido.

## Validações realizadas

- `dotnet restore`: concluído.
- `dotnet build --configuration Release`: concluído sem erros ou warnings.
- `dotnet test`: concluído; a solução ainda não possui projetos de testes.
- `git diff --check`: concluído sem problemas.
- Busca por credenciais hardcoded: nenhum resultado no código-fonte.
- `dotnet ef migrations has-pending-model-changes`: nenhuma alteração pendente.
- Smoke test: a API iniciou corretamente.

O endpoint `/health` retornou `503` durante o smoke test porque a conexão real do
PostgreSQL não estava configurada/disponível naquela execução. Antes do PR, repetir
o teste com uma senha válida:

```powershell
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Port=5432;Database=MarluHub;Username=postgres;Password=<senha>"
dotnet run --project .\backend\src\MarluHub.Api
```

Depois, consultar `http://localhost:5238/health` ou a porta definida pelo processo.
O resultado esperado é HTTP `200` quando o banco estiver acessível.

## Próximo ponto de evolução

Adicionar projetos de testes automatizados à solução, começando por testes unitários
do `ProductService` e testes de integração dos endpoints e do health check. Novos
módulos devem reutilizar os contratos, pipeline de erros, configuração e padrão de
persistência já estabelecidos.
