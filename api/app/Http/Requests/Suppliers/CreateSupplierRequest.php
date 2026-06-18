<?php

namespace App\Http\Requests\Suppliers;

use Illuminate\Foundation\Http\FormRequest;

class CreateSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'trade_name' => ['nullable', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'document' => ['required', 'string', 'max:18', 'unique:suppliers,document'],
            'document_type' => ['required', 'in:CPF,CNPJ'],
            'contact_name' => ['nullable', 'string', 'max:100'],
            'contact_email' => ['nullable', 'email', 'max:255'],
            'contact_phone' => ['nullable', 'string', 'max:20'],
            'address_street' => ['nullable', 'string', 'max:200'],
            'address_number' => ['nullable', 'string', 'max:20'],
            'address_complement' => ['nullable', 'string', 'max:100'],
            'address_neighborhood' => ['nullable', 'string', 'max:100'],
            'address_city' => ['nullable', 'string', 'max:100'],
            'address_state' => ['nullable', 'string', 'size:2'],
            'address_zip_code' => ['nullable', 'string', 'max:9'],
            'address_country' => ['nullable', 'string', 'max:50'],
            'payment_terms' => ['nullable', 'string', 'max:200'],
            'notes' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do fornecedor é obrigatório.',
            'document.required' => 'O documento (CPF/CNPJ) é obrigatório.',
            'document.unique' => 'Este documento já está cadastrado.',
            'document_type.required' => 'O tipo do documento é obrigatório.',
            'document_type.in' => 'O tipo do documento deve ser CPF ou CNPJ.',
        ];
    }
}
