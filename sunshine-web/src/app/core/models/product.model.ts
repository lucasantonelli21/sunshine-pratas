export type ProductType =
  | 'brinco' | 'colar' | 'pulseira' | 'anel'
  | 'tornozeleira' | 'alianca' | 'piercing' | 'pingente' | 'corrente';

export type ProductGender = 'feminino' | 'masculino' | 'unissex';

export type ProductMaterial =
  | 'prata_925' | 'prata_950' | 'ouro_18k' | 'ouro_24k' | 'rodio' | 'inoxidavel';

export interface ProductImage {
  id: string;
  url: string;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  type: ProductType;
  typeLabel: string;
  gender: ProductGender;
  genderLabel: string;
  material: ProductMaterial;
  materialLabel: string;
  stock: number;
  isActive: boolean;
  images: ProductImage[];
  createdAt: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string | null;
  price: number;
  type: ProductType;
  gender: ProductGender;
  material: ProductMaterial;
  stock: number;
  images?: Array<{ url?: string; path?: string; order?: number }>;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
