<?php

namespace App\Http\Requests\Suppliers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('supplier');

        return [
            'name' => ['sometimes', 'string', 'max:150'],
            'trade_name' => ['sometimes', 'nullable', 'string', 'max:150'],
            'email' => ['sometimes', 'nullable', 'email', 'max:255'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'document' => ['sometimes', 'string', 'max:18', "unique:suppliers,document,{$id}"],
            'document_type' => ['sometimes', 'in:CPF,CNPJ'],
            'contact_name' => ['sometimes', 'nullable', 'string', 'max:100'],
            'contact_email' => ['sometimes', 'nullable', 'email', 'max:255'],
            'contact_phone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'address_street' => ['sometimes', 'nullable', 'string', 'max:200'],
            'address_number' => ['sometimes', 'nullable', 'string', 'max:20'],
            'address_complement' => ['sometimes', 'nullable', 'string', 'max:100'],
            'address_neighborhood' => ['sometimes', 'nullable', 'string', 'max:100'],
            'address_city' => ['sometimes', 'nullable', 'string', 'max:100'],
            'address_state' => ['sometimes', 'nullable', 'string', 'size:2'],
            'address_zip_code' => ['sometimes', 'nullable', 'string', 'max:9'],
            'address_country' => ['sometimes', 'nullable', 'string', 'max:50'],
            'payment_terms' => ['sometimes', 'nullable', 'string', 'max:200'],
            'notes' => ['sometimes', 'nullable', 'string', 'max:500'],
        ];
    }
}
