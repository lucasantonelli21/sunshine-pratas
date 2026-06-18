# Sunshine Pratas

Sistema de gestão para joalheria — controle de produtos, clientes, fornecedores e transações financeiras.

## Stack

| Camada    | Tecnologia          |
|-----------|---------------------|
| Frontend  | Angular 21          |
| Backend   | Laravel 11 (PHP 8.4)|
| Banco     | PostgreSQL 16       |
| Auth      | JWT (tymon/jwt-auth)|

## Estrutura do repositório

```
sunshine-pratas/
├── api/          # API Laravel
└── sunshine-web/ # Frontend Angular
```

## Backend — api

### Padrão de projeto

```
HTTP Request
    │
    ▼
Controller          (thin — só orquestra)
    │
    ▼
FormRequest         (validação e autorização de entrada)
    │
    ▼
Action              (uma classe, uma responsabilidade)
    │
    ▼
Eloquent Model      (queries otimizadas com scopes)
    │
    ▼
API Resource        (transformação da saída em camelCase)
```

### Estrutura de pastas

```
app/
├── Actions/            # Lógica de negócio (CreateProductAction, SettleTransactionAction…)
├── Enums/              # PHP 8.1 enums com label() em pt-BR
├── Http/
│   ├── Controllers/    # Controllers finos — delegam para Actions
│   ├── Requests/       # Form Requests por entidade
│   └── Resources/      # API Resources (camelCase para o JS)
├── Models/             # Eloquent com UUIDs, casts, scopes de busca
└── Policies/           # Autorização por modelo
```

### Rodando

```bash
cd api
composer install
cp .env.example .env          # configurar DB_* e JWT_SECRET
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed    # cria o admin padrão
php artisan serve --port=8080
```

Usuário padrão: `admin@sunshine.com` / `admin123`

### Endpoints principais

| Método   | Rota                                  | Descrição                    |
|----------|---------------------------------------|------------------------------|
| POST     | /api/auth/login                       | Login — retorna JWT          |
| POST     | /api/auth/logout                      | Logout                       |
| GET/PUT  | /api/profile                          | Perfil do usuário logado     |
| CRUD     | /api/users                            | Usuários (admin)             |
| CRUD     | /api/customers                        | Clientes                     |
| CRUD     | /api/products                         | Produtos                     |
| GET      | /api/products/all                     | Todos os produtos (admin)    |
| PATCH    | /api/products/{id}/activate           | Ativar produto               |
| PATCH    | /api/products/{id}/deactivate         | Desativar produto            |
| CRUD     | /api/suppliers                        | Fornecedores                 |
| CRUD     | /api/transactions                     | Transações financeiras       |
| PATCH    | /api/transactions/{id}/settle         | Marcar transação como liquidada |

Todas as rotas (exceto login e listagem pública de produtos) exigem `Authorization: Bearer <token>`.

---

## Frontend — sunshine-web

### Estrutura de pastas

```
src/app/
├── core/
│   ├── auth/           # AuthService, AuthGuard
│   ├── entities/       # Definições genéricas de CRUD (entity.definitions.ts)
│   ├── http/           # Interceptor JWT
│   ├── models/         # Interfaces TypeScript por domínio
│   │   ├── auth.model.ts
│   │   ├── user.model.ts
│   │   ├── customer.model.ts
│   │   ├── product.model.ts
│   │   ├── supplier.model.ts
│   │   └── transaction.model.ts
│   └── services/       # Serviços tipados por entidade
│       ├── api.service.ts          # Base com wrapper {data}
│       ├── user.service.ts
│       ├── customer.service.ts
│       ├── product.service.ts
│       ├── supplier.service.ts
│       ├── transaction.service.ts
│       └── profile.service.ts
├── pages/
│   ├── login/
│   ├── profile/
│   └── entity-list/    # CRUD genérico usado por todas as entidades
└── shared/
    └── components/     # sidebar, empty-state, icon
```

### Rodando

```bash
cd sunshine-web
npm install
npm start               # http://localhost:4200
```
