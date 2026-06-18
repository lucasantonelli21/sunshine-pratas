import { EntityDefinition, SelectOption } from './entity.models';

const roleOptions: SelectOption[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'user', label: 'Usuário' },
];

const productTypeOptions: SelectOption[] = [
  { value: 'brinco', label: 'Brinco' },
  { value: 'colar', label: 'Colar' },
  { value: 'pulseira', label: 'Pulseira' },
  { value: 'anel', label: 'Anel' },
  { value: 'tornozeleira', label: 'Tornozeleira' },
  { value: 'alianca', label: 'Aliança' },
  { value: 'piercing', label: 'Piercing' },
  { value: 'pingente', label: 'Pingente' },
  { value: 'corrente', label: 'Corrente' },
];

const productGenderOptions: SelectOption[] = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'unissex', label: 'Unissex' },
];

const productMaterialOptions: SelectOption[] = [
  { value: 'prata_925', label: 'Prata 925' },
  { value: 'prata_950', label: 'Prata 950' },
  { value: 'ouro_18k', label: 'Ouro 18k' },
  { value: 'ouro_24k', label: 'Ouro 24k' },
  { value: 'rodio', label: 'Ródio' },
  { value: 'inoxidavel', label: 'Inoxidável' },
];

const paymentMethodOptions: SelectOption[] = [
  { value: '', label: 'Não informado' },
  { value: 'cash', label: 'Dinheiro' },
  { value: 'credit_card', label: 'Cartão de crédito' },
  { value: 'debit_card', label: 'Cartão de débito' },
  { value: 'bank_transfer', label: 'Transferência bancária' },
  { value: 'pix', label: 'Pix' },
  { value: 'check', label: 'Cheque' },
  { value: 'other', label: 'Outro' },
];

const transactionTypeOptions: SelectOption[] = [
  { value: 'income', label: 'Receita' },
  { value: 'expense', label: 'Despesa' },
];

const documentTypeOptions: SelectOption[] = [
  { value: 'CPF', label: 'CPF' },
  { value: 'CNPJ', label: 'CNPJ' },
];

export const ENTITY_DEFINITIONS: EntityDefinition[] = [
  {
    id: 'users',
    icon: 'users',
    title: 'Usuários',
    singular: 'Usuário',
    path: 'usuarios',
    listPath: '/users',
    createPath: '/users',
    updatePath: (id) => `/users/${id}`,
    deletePath: (id) => `/users/${id}`,
    tableFields: ['name', 'email', 'roleLabel'],
    fields: [
      { key: 'name', label: 'Nome', type: 'text', required: true, table: true },
      { key: 'email', label: 'E-mail', type: 'email', required: true, table: true },
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
    listPath: '/products/all',
    createPath: '/products',
    updatePath: (id) => `/products/${id}`,
    deletePath: (id) => `/products/${id}`,
    tableFields: ['name', 'typeLabel', 'materialLabel', 'price', 'stock', 'isActive'],
    fields: [
      { key: 'name', label: 'Nome', type: 'text', required: true, table: true },
      { key: 'description', label: 'Descrição', type: 'textarea', wide: true },
      { key: 'price', label: 'Preço (R$)', type: 'number', required: true, min: 0.01, table: true },
      { key: 'stock', label: 'Estoque', type: 'number', required: true, min: 0, table: true },
      { key: 'type', label: 'Tipo', type: 'select', required: true, options: productTypeOptions, table: true },
      { key: 'gender', label: 'Gênero', type: 'select', required: true, options: productGenderOptions },
      { key: 'material', label: 'Material', type: 'select', required: true, options: productMaterialOptions, table: true },
    ],
    actions: [
      {
        label: 'Ativar',
        endpointSuffix: '/activate',
        method: 'PATCH',
        visibleWhen: (record) => record['isActive'] === false,
      },
      {
        label: 'Desativar',
        endpointSuffix: '/deactivate',
        method: 'PATCH',
        visibleWhen: (record) => record['isActive'] === true,
      },
    ],
  },
  {
    id: 'transactions',
    icon: 'receipt',
    title: 'Transações',
    singular: 'Transação',
    path: 'transacoes',
    listPath: '/transactions',
    createPath: '/transactions',
    updatePath: (id) => `/transactions/${id}`,
    deletePath: (id) => `/transactions/${id}`,
    tableFields: ['description', 'typeLabel', 'amount', 'date', 'statusLabel', 'paymentMethodLabel'],
    fields: [
      { key: 'description', label: 'Descrição', type: 'text', required: true, table: true },
      { key: 'type', label: 'Tipo', type: 'select', required: true, options: transactionTypeOptions, table: true },
      { key: 'amount', label: 'Valor (R$)', type: 'number', required: true, min: 0.01, table: true },
      { key: 'date', label: 'Data', type: 'date', required: true, table: true },
      { key: 'payment_method', label: 'Método de pagamento', type: 'select', options: paymentMethodOptions, table: true },
      { key: 'category', label: 'Categoria', type: 'text' },
      { key: 'notes', label: 'Observações', type: 'textarea', wide: true },
    ],
    actions: [
      {
        label: 'Marcar como liquidada',
        endpointSuffix: '/settle',
        method: 'PATCH',
        visibleWhen: (record) => record['status'] === 'pending',
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
      { key: 'email', label: 'E-mail', type: 'email', table: true },
      { key: 'phone', label: 'Telefone', type: 'text', table: true },
      { key: 'cpf', label: 'CPF', type: 'text', table: true },
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
      { key: 'name', label: 'Razão social', type: 'text', required: true, table: true },
      { key: 'trade_name', label: 'Nome fantasia', type: 'text', table: true },
      { key: 'email', label: 'E-mail', type: 'email', table: true },
      { key: 'phone', label: 'Telefone', type: 'text', table: true },
      { key: 'document', label: 'Documento', type: 'text', required: true, table: true },
      { key: 'document_type', label: 'Tipo do documento', type: 'select', required: true, options: documentTypeOptions },
      { key: 'contact_name', label: 'Nome do contato', type: 'text' },
      { key: 'contact_email', label: 'E-mail do contato', type: 'email' },
      { key: 'contact_phone', label: 'Telefone do contato', type: 'text' },
      { key: 'address_street', label: 'Logradouro', type: 'text' },
      { key: 'address_number', label: 'Número', type: 'text' },
      { key: 'address_complement', label: 'Complemento', type: 'text' },
      { key: 'address_neighborhood', label: 'Bairro', type: 'text' },
      { key: 'address_city', label: 'Cidade', type: 'text' },
      { key: 'address_state', label: 'UF', type: 'text', minLength: 2 },
      { key: 'address_zip_code', label: 'CEP', type: 'text' },
      { key: 'address_country', label: 'País', type: 'text' },
      { key: 'payment_terms', label: 'Condições de pagamento', type: 'text', wide: true },
      { key: 'notes', label: 'Observações', type: 'textarea', wide: true },
    ],
  },
];

export const entityByPath = new Map(ENTITY_DEFINITIONS.map((def) => [def.path, def]));
