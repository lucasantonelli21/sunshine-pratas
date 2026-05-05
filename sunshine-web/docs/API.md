# ERP Financeiro — API Documentation

**Base URL:** `http://localhost:8080/api/v1`  
**Content-Type:** `application/json`  
**Autenticação:** Bearer Token (JWT) — obrigatório em todas as rotas exceto `/auth/login`

---

## Sumário

- [Autenticação](#autenticação)
- [Usuários](#usuários)
- [Produtos](#produtos)
- [Despesas (Expenses)](#despesas)
- [Receitas (Incomes)](#receitas)
- [Clientes (Customers)](#clientes)
- [Fornecedores (Suppliers)](#fornecedores)
- [Referência de Tipos](#referência-de-tipos)
- [Erros Padrão](#erros-padrão)

---

## Autenticação

### Como usar o token

Após o login, inclua o token em **todas** as requisições:

```
Authorization: Bearer <token>
```

---

### `POST /auth/login`

Autentica o usuário e retorna um JWT.

**Não requer token.**

**Request Body**
```json
{
  "email": "admin@empresa.com",
  "password": "minhasenha"
}
```

| Campo      | Tipo   | Obrigatório | Descrição           |
|------------|--------|-------------|---------------------|
| `email`    | string | sim         | E-mail válido       |
| `password` | string | sim         | Senha do usuário    |

**Response `200 OK`**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "type": "Bearer",
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "João Silva",
  "email": "admin@empresa.com",
  "role": "ADMIN"
}
```

**Erros possíveis**
| Status | Motivo                              |
|--------|-------------------------------------|
| `400`  | Campos inválidos / senha incorreta  |
| `422`  | Falha de validação nos campos       |

---

## Usuários

### `GET /users`

Retorna todos os usuários.

**Response `200 OK`**
```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "João Silva",
    "email": "joao@empresa.com",
    "role": "ADMIN",
    "active": true,
    "createdAt": "2026-04-29T10:00:00",
    "updatedAt": "2026-04-29T10:00:00"
  }
]
```

---

### `GET /users/{id}`

Retorna um usuário pelo ID.

**Path Params**
| Param | Tipo | Descrição   |
|-------|------|-------------|
| `id`  | UUID | ID do usuário |

**Response `200 OK`** — mesmo objeto acima.

**Erros possíveis**
| Status | Motivo          |
|--------|-----------------|
| `404`  | Usuário não encontrado |

---

### `POST /users`

Cria um novo usuário.

**Request Body**
```json
{
  "name": "Maria Souza",
  "email": "maria@empresa.com",
  "password": "senha123",
  "role": "USER"
}
```

| Campo      | Tipo     | Obrigatório | Regras              |
|------------|----------|-------------|---------------------|
| `name`     | string   | sim         | Não vazio           |
| `email`    | string   | sim         | Formato e-mail, único |
| `password` | string   | sim         | Mínimo 6 caracteres |
| `role`     | UserRole | sim         | `ADMIN` `MANAGER` `USER` |

**Response `201 Created`** — objeto do usuário criado (sem password).  
Header `Location: /api/v1/users/{id}`

---

### `PUT /users/{id}`

Atualiza um usuário existente.

**Request Body** — mesmo schema do POST.

**Response `200 OK`** — objeto atualizado.

---

### `DELETE /users/{id}`

Desativa o usuário (soft delete — não remove do banco).

**Response `204 No Content`**

---

## Produtos

### `GET /products`

Retorna todos os produtos (ativos e inativos).

**Response `200 OK`**
```json
[
  {
    "id": "uuid",
    "name": "Notebook Dell",
    "description": "Intel i7, 16GB RAM",
    "sku": "NB-DELL-001",
    "price": 4500.00,
    "stock": 10,
    "category": "ELECTRONICS",
    "active": true,
    "createdAt": "2026-04-29T10:00:00",
    "updatedAt": "2026-04-29T10:00:00"
  }
]
```

---

### `GET /products/active`

Retorna apenas produtos com `active: true`.

**Response `200 OK`** — mesmo schema acima.

---

### `GET /products/{id}`

Retorna produto pelo ID.

---

### `GET /products/sku/{sku}`

Retorna produto pelo SKU.

**Path Params**
| Param | Tipo   | Descrição |
|-------|--------|-----------|
| `sku` | string | SKU único do produto |

---

### `POST /products`

Cria um produto.

**Request Body**
```json
{
  "name": "Notebook Dell",
  "description": "Intel i7, 16GB RAM",
  "sku": "NB-DELL-001",
  "price": 4500.00,
  "stock": 10,
  "category": "ELECTRONICS"
}
```

| Campo         | Tipo            | Obrigatório | Regras          |
|---------------|-----------------|-------------|-----------------|
| `name`        | string          | sim         | Não vazio       |
| `description` | string          | não         |                 |
| `sku`         | string          | sim         | Único           |
| `price`       | number (decimal)| sim         | Maior que 0     |
| `stock`       | integer         | sim         | Maior ou igual a 0 |
| `category`    | ProductCategory | sim         | Ver tipos       |

**Response `201 Created`**

---

### `PUT /products/{id}`

Atualiza um produto. **Request Body** igual ao POST.

**Response `200 OK`**

---

### `DELETE /products/{id}`

Desativa o produto (soft delete).

**Response `204 No Content`**

---

## Despesas

### `GET /expenses`

Retorna todas as despesas.

**Response `200 OK`**
```json
[
  {
    "id": "uuid",
    "description": "Aluguel do escritório",
    "amount": 2500.00,
    "dueDate": "2026-05-10",
    "paidAt": null,
    "status": "PENDING",
    "paymentMethod": null,
    "category": "Aluguel",
    "notes": "Vencimento todo dia 10",
    "userId": "uuid",
    "userName": "João Silva",
    "createdAt": "2026-04-29T10:00:00",
    "updatedAt": "2026-04-29T10:00:00"
  }
]
```

---

### `GET /expenses/{id}`

Retorna uma despesa pelo ID.

---

### `GET /expenses/user/{userId}`

Retorna todas as despesas de um usuário específico.

**Path Params**
| Param    | Tipo | Descrição       |
|----------|------|-----------------|
| `userId` | UUID | ID do usuário   |

---

### `POST /expenses`

Cria uma despesa.

**Request Body**
```json
{
  "description": "Aluguel do escritório",
  "amount": 2500.00,
  "dueDate": "2026-05-10",
  "paymentMethod": "BANK_TRANSFER",
  "category": "Aluguel",
  "notes": "Vencimento todo dia 10",
  "userId": "uuid-do-usuario"
}
```

| Campo           | Tipo          | Obrigatório | Regras      |
|-----------------|---------------|-------------|-------------|
| `description`   | string        | sim         | Não vazio   |
| `amount`        | number        | sim         | Maior que 0 |
| `dueDate`       | date (YYYY-MM-DD) | sim     |             |
| `paymentMethod` | PaymentMethod | não         | Ver tipos   |
| `category`      | string        | não         |             |
| `notes`         | string        | não         |             |
| `userId`        | UUID          | sim         | Usuário existente |

**Response `201 Created`**

---

### `PUT /expenses/{id}`

Atualiza uma despesa. Não é possível alterar despesas com status `PAID`.

**Request Body** — mesmo schema do POST.

**Response `200 OK`**

---

### `PATCH /expenses/{id}/pay`

Marca a despesa como **paga**. Define `status: PAID` e `paidAt` com a data/hora atual.

**Sem body.**

**Response `200 OK`** — objeto atualizado com `status: "PAID"` e `paidAt` preenchido.

**Erros possíveis**
| Status | Motivo                        |
|--------|-------------------------------|
| `400`  | Despesa já estava paga        |

---

### `DELETE /expenses/{id}`

Remove a despesa permanentemente.

**Response `204 No Content`**

---

## Receitas

### `GET /incomes`

Retorna todas as receitas.

**Response `200 OK`**
```json
[
  {
    "id": "uuid",
    "description": "Venda produto X",
    "amount": 1500.00,
    "expectedDate": "2026-05-01",
    "receivedAt": null,
    "status": "PENDING",
    "paymentMethod": "PIX",
    "source": "Cliente ABC",
    "category": "Vendas",
    "notes": null,
    "userId": "uuid",
    "userName": "Maria Souza",
    "createdAt": "2026-04-29T10:00:00",
    "updatedAt": "2026-04-29T10:00:00"
  }
]
```

---

### `GET /incomes/{id}`

Retorna uma receita pelo ID.

---

### `GET /incomes/user/{userId}`

Retorna todas as receitas de um usuário.

---

### `POST /incomes`

Cria uma receita.

**Request Body**
```json
{
  "description": "Venda produto X",
  "amount": 1500.00,
  "expectedDate": "2026-05-01",
  "paymentMethod": "PIX",
  "source": "Cliente ABC",
  "category": "Vendas",
  "notes": null,
  "userId": "uuid-do-usuario"
}
```

| Campo           | Tipo          | Obrigatório | Regras      |
|-----------------|---------------|-------------|-------------|
| `description`   | string        | sim         | Não vazio   |
| `amount`        | number        | sim         | Maior que 0 |
| `expectedDate`  | date (YYYY-MM-DD) | sim     |             |
| `paymentMethod` | PaymentMethod | não         | Ver tipos   |
| `source`        | string        | não         | Origem da receita |
| `category`      | string        | não         |             |
| `notes`         | string        | não         |             |
| `userId`        | UUID          | sim         | Usuário existente |

**Response `201 Created`**

---

### `PUT /incomes/{id}`

Atualiza uma receita. Não é possível alterar receitas com status `RECEIVED`.

**Request Body** — mesmo schema do POST.

**Response `200 OK`**

---

### `PATCH /incomes/{id}/receive`

Marca a receita como **recebida**. Define `status: RECEIVED` e `receivedAt` com a data/hora atual.

**Sem body.**

**Response `200 OK`** — objeto atualizado.

**Erros possíveis**
| Status | Motivo                        |
|--------|-------------------------------|
| `400`  | Receita já estava recebida    |

---

### `DELETE /incomes/{id}`

Remove a receita permanentemente.

**Response `204 No Content`**

---

## Clientes

### `GET /customers`

Retorna todos os clientes (ativos e inativos).

**Response `200 OK`**
```json
[
  {
    "id": "uuid",
    "name": "Empresa Alpha Ltda",
    "email": "contato@alpha.com",
    "phone": "(11) 3000-0000",
    "mobile": "(11) 91234-5678",
    "document": "12.345.678/0001-99",
    "documentType": "CNPJ",
    "address": {
      "street": "Av. Paulista",
      "number": "1000",
      "complement": "Sala 201",
      "neighborhood": "Bela Vista",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310-100",
      "country": "BR"
    },
    "notes": null,
    "active": true,
    "createdAt": "2026-04-29T10:00:00",
    "updatedAt": "2026-04-29T10:00:00"
  }
]
```

---

### `GET /customers/active`

Retorna apenas clientes ativos.

---

### `GET /customers/{id}`

Retorna um cliente pelo ID.

---

### `GET /customers/search?name={name}`

Busca clientes pelo nome (case-insensitive, busca parcial).

**Query Params**
| Param  | Tipo   | Obrigatório | Exemplo     |
|--------|--------|-------------|-------------|
| `name` | string | sim         | `?name=Alpha` |

**Response `200 OK`** — lista de clientes.

---

### `POST /customers`

Cria um cliente.

**Request Body**
```json
{
  "name": "Empresa Alpha Ltda",
  "email": "contato@alpha.com",
  "phone": "(11) 3000-0000",
  "mobile": "(11) 91234-5678",
  "document": "12.345.678/0001-99",
  "documentType": "CNPJ",
  "address": {
    "street": "Av. Paulista",
    "number": "1000",
    "complement": "Sala 201",
    "neighborhood": "Bela Vista",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01310-100",
    "country": "BR"
  },
  "notes": null
}
```

| Campo          | Tipo         | Obrigatório | Regras       |
|----------------|--------------|-------------|--------------|
| `name`         | string       | sim         | Não vazio    |
| `email`        | string       | não         | Formato e-mail |
| `phone`        | string       | não         |              |
| `mobile`       | string       | não         |              |
| `document`     | string       | sim         | CPF ou CNPJ, único |
| `documentType` | DocumentType | sim         | `CPF` `CNPJ` |
| `address`      | Address      | não         | Objeto endereço |
| `notes`        | string       | não         |              |

**Objeto `address`** (todos opcionais):

| Campo          | Tipo   | Descrição             |
|----------------|--------|-----------------------|
| `street`       | string | Logradouro            |
| `number`       | string | Número                |
| `complement`   | string | Complemento           |
| `neighborhood` | string | Bairro                |
| `city`         | string | Cidade                |
| `state`        | string | UF (2 letras)         |
| `zipCode`      | string | CEP                   |
| `country`      | string | Padrão `BR`           |

**Response `201 Created`**

---

### `PUT /customers/{id}`

Atualiza um cliente. **Request Body** igual ao POST.

**Response `200 OK`**

---

### `DELETE /customers/{id}`

Desativa o cliente (soft delete).

**Response `204 No Content`**

---

## Fornecedores

### `GET /suppliers`

Retorna todos os fornecedores.

**Response `200 OK`**
```json
[
  {
    "id": "uuid",
    "name": "Distribuidora Beta S.A.",
    "tradeName": "Beta Distribuidora",
    "email": "vendas@beta.com",
    "phone": "(11) 4000-0000",
    "document": "98.765.432/0001-11",
    "documentType": "CNPJ",
    "contactName": "Carlos Mendes",
    "contactEmail": "carlos@beta.com",
    "contactPhone": "(11) 99876-5432",
    "address": {
      "street": "Rua das Indústrias",
      "number": "500",
      "complement": null,
      "neighborhood": "Distrito Industrial",
      "city": "Guarulhos",
      "state": "SP",
      "zipCode": "07000-000",
      "country": "BR"
    },
    "paymentTerms": "30/60/90 dias",
    "notes": null,
    "active": true,
    "createdAt": "2026-04-29T10:00:00",
    "updatedAt": "2026-04-29T10:00:00"
  }
]
```

---

### `GET /suppliers/active`

Retorna apenas fornecedores ativos.

---

### `GET /suppliers/{id}`

Retorna um fornecedor pelo ID.

---

### `GET /suppliers/search?name={name}`

Busca fornecedores pelo nome (case-insensitive, parcial).

---

### `POST /suppliers`

Cria um fornecedor.

**Request Body**
```json
{
  "name": "Distribuidora Beta S.A.",
  "tradeName": "Beta Distribuidora",
  "email": "vendas@beta.com",
  "phone": "(11) 4000-0000",
  "document": "98.765.432/0001-11",
  "documentType": "CNPJ",
  "contactName": "Carlos Mendes",
  "contactEmail": "carlos@beta.com",
  "contactPhone": "(11) 99876-5432",
  "address": {
    "street": "Rua das Indústrias",
    "number": "500",
    "neighborhood": "Distrito Industrial",
    "city": "Guarulhos",
    "state": "SP",
    "zipCode": "07000-000"
  },
  "paymentTerms": "30/60/90 dias",
  "notes": null
}
```

| Campo          | Tipo         | Obrigatório | Regras         |
|----------------|--------------|-------------|----------------|
| `name`         | string       | sim         | Razão social   |
| `tradeName`    | string       | não         | Nome fantasia  |
| `email`        | string       | não         | Formato e-mail |
| `phone`        | string       | não         |                |
| `document`     | string       | sim         | CPF ou CNPJ, único |
| `documentType` | DocumentType | sim         | `CPF` `CNPJ`   |
| `contactName`  | string       | não         | Nome do contato |
| `contactEmail` | string       | não         | E-mail do contato |
| `contactPhone` | string       | não         | Telefone do contato |
| `address`      | Address      | não         | Ver objeto acima |
| `paymentTerms` | string       | não         | Condições de pagamento |
| `notes`        | string       | não         |                |

**Response `201 Created`**

---

### `PUT /suppliers/{id}`

Atualiza um fornecedor. **Request Body** igual ao POST.

**Response `200 OK`**

---

### `DELETE /suppliers/{id}`

Desativa o fornecedor (soft delete).

**Response `204 No Content`**

---

## Referência de Tipos

### `UserRole`
| Valor     | Descrição        |
|-----------|------------------|
| `ADMIN`   | Administrador    |
| `MANAGER` | Gerente          |
| `USER`    | Usuário padrão   |

### `ProductCategory`
| Valor               | Descrição              |
|---------------------|------------------------|
| `ELECTRONICS`       | Eletrônicos            |
| `CLOTHING`          | Vestuário              |
| `FOOD_AND_BEVERAGE` | Alimentação e bebidas  |
| `HEALTH_AND_BEAUTY` | Saúde e beleza         |
| `HOME_AND_FURNITURE`| Casa e móveis          |
| `OFFICE_SUPPLIES`   | Material de escritório |
| `RAW_MATERIAL`      | Matéria-prima          |
| `SERVICE`           | Serviço                |
| `OTHER`             | Outros                 |

### `PaymentMethod`
| Valor           | Descrição          |
|-----------------|--------------------|
| `CASH`          | Dinheiro           |
| `CREDIT_CARD`   | Cartão de crédito  |
| `DEBIT_CARD`    | Cartão de débito   |
| `BANK_TRANSFER` | Transferência bancária |
| `PIX`           | Pix                |
| `CHECK`         | Cheque             |
| `OTHER`         | Outro              |

### `ExpenseStatus`
| Valor       | Descrição  |
|-------------|------------|
| `PENDING`   | Pendente   |
| `PAID`      | Pago       |
| `OVERDUE`   | Vencido    |
| `CANCELLED` | Cancelado  |

### `IncomeStatus`
| Valor       | Descrição  |
|-------------|------------|
| `PENDING`   | Pendente   |
| `RECEIVED`  | Recebido   |
| `OVERDUE`   | Vencido    |
| `CANCELLED` | Cancelado  |

### `DocumentType`
| Valor  | Descrição                      |
|--------|--------------------------------|
| `CPF`  | Pessoa Física (11 dígitos)     |
| `CNPJ` | Pessoa Jurídica (14 dígitos)   |

---

## Erros Padrão

Todos os erros seguem o mesmo formato:

```json
{
  "timestamp": "2026-04-29T14:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "User not found with id: 3fa85f64...",
  "path": "/api/v1/users/3fa85f64..."
}
```

| Status | Significado                                     |
|--------|-------------------------------------------------|
| `400`  | Bad Request — regra de negócio violada          |
| `401`  | Unauthorized — token ausente ou inválido        |
| `403`  | Forbidden — sem permissão para o recurso        |
| `404`  | Not Found — recurso não encontrado              |
| `422`  | Unprocessable Entity — falha de validação dos campos |
| `500`  | Internal Server Error — erro inesperado no servidor |

---

## Exemplo de fluxo completo (JavaScript/fetch)

```js
// 1. Login
const { token } = await fetch('http://localhost:8080/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@empresa.com', password: 'senha123' })
}).then(r => r.json());

// 2. Usar token nas demais chamadas
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

// 3. Listar clientes
const customers = await fetch('http://localhost:8080/api/v1/customers', { headers })
  .then(r => r.json());

// 4. Criar despesa
const expense = await fetch('http://localhost:8080/api/v1/expenses', {
  method: 'POST',
  headers,
  body: JSON.stringify({
    description: 'Aluguel',
    amount: 2500.00,
    dueDate: '2026-05-10',
    paymentMethod: 'BANK_TRANSFER',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
}).then(r => r.json());

// 5. Marcar despesa como paga
await fetch(`http://localhost:8080/api/v1/expenses/${expense.id}/pay`, {
  method: 'PATCH',
  headers
});
```
