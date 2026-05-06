# Sunshine Pratas

Documentacao da aplicacao com foco em arquitetura, padroes e API.

## Visao geral

Aplicacao web (Angular) consumindo uma API em ASP.NET Core. A API segue uma arquitetura em camadas com separacao clara entre apresentacao, aplicacao, dominio e infraestrutura.

## Arquitetura (esquete)

```
+-----------------------------+
| sunshine-web (Angular)      |
+--------------+--------------+
							 |
							 v
+-----------------------------+
| sunshine-api (ASP.NET Core) |
+--------------+--------------+
							 |
							 v
+-----------------------------+
| Application (casos de uso)  |
+--------------+--------------+
							 |
							 v
+-----------------------------+
| Domain (entidades, VOs)     |
+--------------+--------------+
							 |
							 v
+-----------------------------+
| Infrastructure (EF, repos)  |
+-----------------------------+
```

## Camadas e responsabilidades

- Api: controllers, autenticacao, middlewares e configuracoes. Ponto de entrada HTTP. Veja [sunshine-api/src/Api/Program.cs](sunshine-api/src/Api/Program.cs) e [sunshine-api/src/Api/Middlewares/ExceptionHandlingMiddleware.cs](sunshine-api/src/Api/Middlewares/ExceptionHandlingMiddleware.cs).
- Application: regras de orquestracao e servicos de casos de uso, com DTOs e interfaces. Veja [sunshine-api/src/Application/DependencyInjection.cs](sunshine-api/src/Application/DependencyInjection.cs).
- Domain: entidades e value objects com invariantes. Exemplo em [sunshine-api/src/Domain/Entities/Customer.cs](sunshine-api/src/Domain/Entities/Customer.cs).
- Infrastructure: persistencia, repositorios, seguranca e integracoes. Registros em [sunshine-api/src/Infrastructure/DependencyInjection.cs](sunshine-api/src/Infrastructure/DependencyInjection.cs).

## Fluxo de requisicao (esquete)

```
HTTP
	|
	v
Controller -> Service -> Repository -> DbContext -> SQL Server
	^               |
	|               v
Middleware <---- Domain
```

## Padroes e principios utilizados

- Separacao de camadas (Api, Application, Domain, Infrastructure) com dependencia apontando para dentro (Domain isolado).
- Dependency Injection com registros centralizados por camada. Veja [sunshine-api/src/Application/DependencyInjection.cs](sunshine-api/src/Application/DependencyInjection.cs) e [sunshine-api/src/Infrastructure/DependencyInjection.cs](sunshine-api/src/Infrastructure/DependencyInjection.cs).
- Repository e Unit of Work para persistencia e transacoes. Interfaces em [sunshine-api/src/Domain/Repositories](sunshine-api/src/Domain/Repositories) e implementacoes em [sunshine-api/src/Infrastructure/Repositories](sunshine-api/src/Infrastructure/Repositories).
- Service Layer para casos de uso por contexto (Users, Products, Transactions, etc.).
- DTOs para contratos de entrada e saida dos endpoints. Exemplos em [sunshine-api/src/Application/Users/DTOs](sunshine-api/src/Application/Users/DTOs).
- Middleware para tratamento uniforme de erros. Veja [sunshine-api/src/Api/Middlewares/ExceptionHandlingMiddleware.cs](sunshine-api/src/Api/Middlewares/ExceptionHandlingMiddleware.cs).
- Principios SOLID aplicados na separacao de responsabilidades e interfaces.

## Documentacao da API

- Endpoints completos em [sunshine-web/docs/API.md](sunshine-web/docs/API.md)
