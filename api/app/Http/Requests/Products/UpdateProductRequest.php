<?php

namespace App\Http\Requests\Products;

use App\Enums\ProductGender;
use App\Enums\ProductMaterial;
use App\Enums\ProductType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:150'],
            'description' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'price' => ['sometimes', 'numeric', 'min:0.01'],
            'type' => ['sometimes', new Enum(ProductType::class)],
            'gender' => ['sometimes', new Enum(ProductGender::class)],
            'material' => ['sometimes', new Enum(ProductMaterial::class)],
            'stock' => ['sometimes', 'integer', 'min:0'],
            'images' => ['nullable', 'array'],
            'images.*.url' => ['required_with:images', 'string', 'max:500'],
            'images.*.order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
