<?php

namespace App\Http\Requests\Products;

use App\Enums\ProductGender;
use App\Enums\ProductMaterial;
use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CreateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1000'],
            'price' => ['required', 'numeric', 'min:0.01'],
            'type' => ['required', new Enum(ProductType::class)],
            'gender' => ['required', new Enum(ProductGender::class)],
            'material' => ['required', new Enum(ProductMaterial::class)],
            'stock' => ['required', 'integer', 'min:0'],
            'images' => ['nullable', 'array'],
            'images.*.url' => ['nullable', 'string', 'max:500'],
            'images.*.path' => ['nullable', 'string', 'max:500'],
            'images.*.order' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do produto é obrigatório.',
            'price.required' => 'O preço é obrigatório.',
            'price.min' => 'O preço deve ser maior que zero.',
            'type.required' => 'O tipo do produto é obrigatório.',
            'gender.required' => 'O gênero é obrigatório.',
            'material.required' => 'O material é obrigatório.',
            'stock.required' => 'O estoque é obrigatório.',
            'stock.min' => 'O estoque não pode ser negativo.',
        ];
    }
}
