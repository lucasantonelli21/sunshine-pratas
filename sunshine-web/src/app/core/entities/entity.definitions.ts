import { EntityDefinition, SelectOption } from './entity.models';

const roleOptions: SelectOption[] = [
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'MANAGER', label: 'Gerente' },
  { value: 'USER', label: 'Usuario' },
];

const productTypeOptions: SelectOption[] = [
  { value: 'Brinco', label: 'Brinco' },
  { value: 'Colar', label: 'Colar' },
  { value: 'Pulseira', label: 'Pulseira' },
  { value: 'Anel', label: 'Anel' },
  { value: 'Tornozeleira', label: 'Tornozeleira' },
  { value: 'Alianca', label: 'Alianca' },
  { value: 'Piercing', label: 'Piercing' },
  { value: 'Pingente', label: 'Pingente' },
  { value: 'Corrente', label: 'Corrente' },
];

const productGenderOptions: SelectOption[] = [
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Unissex', label: 'Unissex' },
];

const productMaterialOptions: SelectOption[] = [
  { value: 'Prata925', label: 'Prata 925' },
  { value: 'Prata950', label: 'Prata 950' },
  { value: 'BanhadoOuro18k', label: 'Banhado ouro 18k' },
  { value: 'BanhadoOuro24k', label: 'Banhado ouro 24k' },
  { value: 'BanhadoPrata', label: 'Banhado prata' },
  { value: 'BanhadoRodio', label: 'Banhado rodio' },
  { value: 'AcoInoxidavel', label: 'Aco inoxidavel' },
];

const paymentMethodOptions: SelectOption[] = [
  { value: '', label: 'Nao informado' },
  { value: 'Cash', label: 'Dinheiro' },
  { value: 'CreditCard', label: 'Cartao de credito' },
  { value: 'DebitCard', label: 'Cartao de debito' },
  { value: 'BankTransfer', label: 'Transferencia bancaria' },
  { value: 'Pix', label: 'Pix' },
  { value: 'Check', label: 'Cheque' },
  { value: 'Other', label: 'Outro' },
];

const transactionTypeOptions: SelectOption[] = [
  { value: 'Income', label: 'Receita' },
  { value: 'Expense', label: 'Despesa' },
];

const documentTypeOptions: SelectOption[] = [
  { value: 'CPF', label: 'CPF' },
  { value: 'CNPJ', label: 'CNPJ' },
];

const addressFields = [
  { key: 'address.street', label: 'Logradouro', type: 'text' as const },
  { key: 'address.number', label: 'Numero', type: 'text' as const },
  { key: 'address.complement', label: 'Complemento', type: 'text' as const },
  { key: 'address.neighborhood', label: 'Bairro', type: 'text' as const },
  { key: 'address.city', label: 'Cidade', type: 'text' as const },
  { key: 'address.state', label: 'UF', type: 'text' as const, minLength: 2 },
  { key: 'address.zipCode', label: 'CEP', type: 'text' as const },
  { key: 'address.country', label: 'Pais', type: 'text' as const },
];

export const ENTITY_DEFINITIONS: EntityDefinition[] = [
  {
    id: 'users',
    icon: 'users',
    title: 'Usuarios',
    singular: 'Usuario',
    path: 'usuarios',
    listPath: '/users',
    createPath: '/users',
    updatePath: (id) => `/users/${id}`,
    deletePath: (id) => `/users/${id}`,
    tableFields: ['name', 'email', 'role', 'active', 'createdAt'],
    fields: [
      { key: 'name', label: 'Nome', type: 'text', required: true, table: true },
      { key: 'email', label: 'Email', type: 'email', required: true, table: true },
      { key: 'password', label: 'Senha', type: 'password', required: true, minLength: 6, hideOnEdit: true },
      { key: 'role', label: 'Perfil', type: 'select', required: true, options: roleOptions, table: true },
    ],
  },
  {
    id: 'products',
    icon: 'gem',
    title: 'Produtos',
    singular: 'Produto',
    path: 'produtos',
    listPath: '/products',
    createPath: '/products',
    updatePath: (id) => `/products/${id}`,
    deletePath: (id) => `/products/${id}`,
    tableFields: ['name', 'type', 'material', 'price', 'stock', 'isActive'],
    fields: [
      { key: 'name', label: 'Nome', type: 'text', required: true, table: true },
      { key: 'description', label: 'Descricao', type: 'textarea', wide: true },
      { key: 'price', label: 'Preco', type: 'number', required: true, min: 0.01, table: true },
      { key: 'stock', label: 'Estoque', type: 'number', required: true, min: 0, table: true },
      { key: 'type', label: 'Tipo', type: 'select', required: true, options: productTypeOptions, table: true },
      { key: 'gender', label: 'Genero', type: 'select', required: true, options: productGenderOptions },
      { key: 'material', label: 'Material', type: 'select', required: true, options: productMaterialOptions, table: true },
    ],
  },
  {
    id: 'transactions',
    icon: 'receipt',
    title: 'Transacoes',
    singular: 'Transacao',
    path: 'transacoes',
    listPath: '/transactions',
    createPath: '/transactions',
    updatePath: (id) => `/transactions/${id}`,
    deletePath: (id) => `/transactions/${id}`,
    tableFields: ['description', 'type', 'amount', 'date', 'status', 'paymentMethod'],
    fields: [
      { key: 'description', label: 'Descricao', type: 'text', required: true, table: true },
      { key: 'type', label: 'Tipo', type: 'select', required: true, options: transactionTypeOptions, table: true },
      { key: 'amount', label: 'Valor', type: 'number', required: true, min: 0.01, table: true },
      { key: 'date', label: 'Data', type: 'date', required: true, table: true },
      { key: 'paymentMethod', label: 'Metodo de pagamento', type: 'select', options: paymentMethodOptions, table: true },
      { key: 'category', label: 'Categoria', type: 'text' },
      { key: 'notes', label: 'Observacoes', type: 'textarea', wide: true },
    ],
    actions: [
      {
        label: 'Marcar liquidada',
        endpointSuffix: '/settle',
        method: 'PATCH',
        visibleWhen: (record) => record['status'] !== 'Settled',
      },
    ],
  },
  {
    id: 'customers',
    icon: 'contact',
    title: 'Clientes',
    singular: 'Cliente',
    path: 'clientes',
    listPath: '/customers',
    createPath: '/customers',
    updatePath: (id) => `/customers/${id}`,
    deletePath: (id) => `/customers/${id}`,
    tableFields: ['name', 'email', 'phone', 'cpf'],
    fields: [
      { key: 'name', label: 'Nome', type: 'text', required: true, table: true },
      { key: 'email', label: 'Email', type: 'email', table: true },
      { key: 'phone', label: 'Telefone', type: 'text', table: true },
      { key: 'cpf', label: 'CPF', type: 'text', required: true, table: true },
    ],
  },
  {
    id: 'suppliers',
    icon: 'truck',
    title: 'Fornecedores',
    singular: 'Fornecedor',
    path: 'fornecedores',
    listPath: '/suppliers',
    createPath: '/suppliers',
    updatePath: (id) => `/suppliers/${id}`,
    deletePath: (id) => `/suppliers/${id}`,
    tableFields: ['name', 'tradeName', 'email', 'phone', 'document', 'isActive'],
    fields: [
      { key: 'name', label: 'Razao social', type: 'text', required: true, table: true },
      { key: 'tradeName', label: 'Nome fantasia', type: 'text', table: true },
      { key: 'email', label: 'Email', type: 'email', table: true },
      { key: 'phone', label: 'Telefone', type: 'text', table: true },
      { key: 'document', label: 'Documento', type: 'text', required: true, table: true },
      { key: 'documentType', label: 'Tipo do documento', type: 'select', required: true, options: documentTypeOptions },
      { key: 'contactName', label: 'Contato', type: 'text' },
      { key: 'contactEmail', label: 'Email do contato', type: 'email' },
      { key: 'contactPhone', label: 'Telefone do contato', type: 'text' },
      ...addressFields,
      { key: 'paymentTerms', label: 'Condicoes de pagamento', type: 'text', wide: true },
      { key: 'notes', label: 'Observacoes', type: 'textarea', wide: true },
    ],
  },
];

export const entityByPath = new Map(ENTITY_DEFINITIONS.map((definition) => [definition.path, definition]));
