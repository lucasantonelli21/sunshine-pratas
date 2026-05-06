# Sunshine Pratas — API Documentation

**Base path:** `/api`  
**Content-Type:** `application/json`  
**Autenticacao:** Bearer Token (JWT) — obrigatorio em todas as rotas exceto `/auth/login`  
**Swagger (dev):** `/swagger`

---

## Sumario

- [Autenticacao](#autenticacao)
- [Usuarios](#usuarios)
- [Perfil](#perfil)
- [Produtos](#produtos)
- [Clientes](#clientes)
- [Fornecedores](#fornecedores)
- [Transacoes](#transacoes)
- [Enums](#enums)
- [Erros padrao](#erros-padrao)

---

## Autenticacao

### Como usar o token

Inclua o token em todas as requisicoes autenticadas:

```
Authorization: Bearer <token>
```

### Fluxo (esquete)

```
POST /auth/login
       |
       v
   Token JWT
       |
       v
Authorization: Bearer <token>
```

### `POST /auth/login`

Autentica o usuario e retorna um JWT.

**Nao requer token.**

**Request Body**

```json
{
  "email": "admin@empresa.com",
  "password": "minhasenha"
}
```

**Response `200 OK`**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Joao Silva",
    "email": "admin@empresa.com",
    "role": "Admin",
    "createdAt": "2026-04-29T10:00:00Z"
  }
}
```

---

## Usuarios

### `POST /users` e `POST /users/register`

Cria um novo usuario.

**Auth:** nao obrigatorio.

**Request Body**

```json
{
  "name": "Maria Souza",
  "email": "maria@empresa.com",
  "password": "senha123"
}
```

**Response `201 Created`**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Maria Souza",
  "email": "maria@empresa.com",
  "role": "User",
  "createdAt": "2026-04-29T10:00:00Z"
}
```

### `GET /users/{id}`

Retorna um usuario pelo ID.

**Auth:** obrigatorio.

**Response `200 OK`**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Joao Silva",
  "email": "joao@empresa.com",
  "role": "Admin",
  "createdAt": "2026-04-29T10:00:00Z"
}
```

### `GET /users`

Lista todos os usuarios.

**Auth:** obrigatorio  
**Role:** Admin

### `PUT /users/{id}`

Atualiza dados basicos do usuario.

**Auth:** obrigatorio

**Request Body**

```json
{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

### `DELETE /users/{id}`

Remove o usuario.

**Auth:** obrigatorio  
**Role:** Admin

---

## Perfil

### `GET /profile`

Retorna o usuario autenticado.

**Auth:** obrigatorio

### `PUT /profile`

Atualiza o usuario autenticado.

**Auth:** obrigatorio

**Request Body**

```json
{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

---

## Produtos

### `GET /products`

Lista apenas produtos ativos.

**Auth:** nao obrigatorio.

### `GET /products/all`

Lista todos os produtos (ativos e inativos).

**Auth:** obrigatorio  
**Role:** Admin

### `GET /products/{id}`

Retorna produto pelo ID.

**Auth:** nao obrigatorio.

### `POST /products`

Cria um produto.

**Auth:** obrigatorio  
**Role:** Admin

**Request Body**

```json
{
  "name": "Colar Lua",
  "description": "Colar prata 925",
  "price": 199.9,
  "type": "Colar",
  "gender": "Feminino",
  "material": "Prata925",
  "stock": 10,
  "imageUrls": ["https://.../1.png"]
}
```

### `PUT /products/{id}`

Atualiza um produto.

**Auth:** obrigatorio  
**Role:** Admin

### `PATCH /products/{id}/activate`

Ativa um produto.

**Auth:** obrigatorio  
**Role:** Admin

### `PATCH /products/{id}/deactivate`

Desativa um produto.

**Auth:** obrigatorio  
**Role:** Admin

### `DELETE /products/{id}`

Remove um produto.

**Auth:** obrigatorio  
**Role:** Admin

**Response `200 OK` (produto)**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Colar Lua",
  "description": "Colar prata 925",
  "price": 199.9,
  "type": "Colar",
  "gender": "Feminino",
  "material": "Prata925",
  "stock": 10,
  "isActive": true,
  "images": ["https://.../1.png"],
  "createdAt": "2026-04-29T10:00:00Z"
}
```

---

## Clientes

### `GET /customers`

Lista clientes.

**Auth:** obrigatorio

### `GET /customers/{id}`

Retorna cliente pelo ID.

**Auth:** obrigatorio

### `POST /customers`

Cria um cliente.

**Auth:** obrigatorio

**Request Body**

```json
{
  "name": "Joao Souza",
  "email": "joao@email.com",
  "phone": "+55 11 99999-0000",
  "cpf": "12345678900"
}
```

### `PUT /customers/{id}`

Atualiza cliente.

**Auth:** obrigatorio

**Request Body**

```json
{
  "name": "Joao Souza",
  "email": "joao@email.com",
  "phone": "+55 11 99999-0000"
}
```

### `DELETE /customers/{id}`

Remove cliente.

**Auth:** obrigatorio  
**Role:** Admin

---

## Fornecedores

### `GET /suppliers`

Lista fornecedores.

**Auth:** obrigatorio

### `GET /suppliers/{id}`

Retorna fornecedor pelo ID.

**Auth:** obrigatorio

### `POST /suppliers`

Cria fornecedor.

**Auth:** obrigatorio

**Request Body**

```json
{
  "name": "Fornecedor X",
  "document": "12345678000199",
  "documentType": "CNPJ",
  "tradeName": "Fornecedor X LTDA",
  "email": "contato@fornecedor.com",
  "phone": "+55 11 3333-0000",
  "contactName": "Maria",
  "contactEmail": "maria@fornecedor.com",
  "contactPhone": "+55 11 99999-1111",
  "address": {
    "street": "Rua A",
    "number": "100",
    "complement": "Sala 2",
    "neighborhood": "Centro",
    "city": "Sao Paulo",
    "state": "SP",
    "zipCode": "01000-000",
    "country": "Brasil"
  },
  "paymentTerms": "30 dias",
  "notes": "Fornecedor preferencial"
}
```

### `PUT /suppliers/{id}`

Atualiza fornecedor.

**Auth:** obrigatorio

### `DELETE /suppliers/{id}`

Remove fornecedor.

**Auth:** obrigatorio

---

## Transacoes

### `GET /transactions`

Lista transacoes.

**Auth:** obrigatorio

### `GET /transactions/{id}`

Retorna transacao pelo ID.

**Auth:** obrigatorio

### `POST /transactions`

Cria transacao. O usuario vem do token JWT.

**Auth:** obrigatorio

**Request Body**

```json
{
  "description": "Venda colar",
  "amount": 199.9,
  "date": "2026-05-05T12:00:00Z",
  "type": "Income",
  "paymentMethod": "Pix",
  "category": "Vendas",
  "notes": "Pago a vista"
}
```

### `PUT /transactions/{id}`

Atualiza transacao.

**Auth:** obrigatorio

**Request Body**

```json
{
  "description": "Venda colar",
  "amount": 199.9,
  "date": "2026-05-05T12:00:00Z",
  "paymentMethod": "Pix",
  "category": "Vendas",
  "notes": "Pago a vista"
}
```

### `PATCH /transactions/{id}/settle`

Marca como liquidada.

**Auth:** obrigatorio

### `DELETE /transactions/{id}`

Remove transacao.

**Auth:** obrigatorio

**Response `200 OK` (transacao)**

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "description": "Venda colar",
  "amount": 199.9,
  "date": "2026-05-05T12:00:00Z",
  "type": "Income",
  "status": "Pending",
  "paymentMethod": "Pix",
  "category": "Vendas",
  "notes": "Pago a vista",
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "createdAt": "2026-05-05T12:00:00Z"
}
```

---

## Enums

### UserRole

- Admin
- User

### ProductType

- Brinco
- Colar
- Pulseira
- Anel
- Tornozeleira
- Alianca
- Piercing
- Pingente
- Corrente

### ProductGender

- Feminino
- Masculino
- Unissex

### ProductMaterial

- Prata925
- Prata950
- BanhadoOuro18k
- BanhadoOuro24k
- BanhadoPrata
- BanhadoRodio
- AcoInoxidavel

### TransactionType

- Income
- Expense

### TransactionStatus

- Pending
- Settled

### PaymentMethod

- Cash
- CreditCard
- DebitCard
- BankTransfer
- Pix
- Check
- Other

---

## Erros padrao

Formato de erro:

```json
{
  "error": "Mensagem de erro"
}
```

Status retornados pelo middleware:

- `400` erro de dominio
- `404` nao encontrado
- `409` conflito
- `500` erro interno
