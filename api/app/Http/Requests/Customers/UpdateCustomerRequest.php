<?php

namespace App\Http\Requests\Customers;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('customer');

        return [
            'name' => ['sometimes', 'string', 'max:100'],
            'email' => ['sometimes', 'nullable', 'email', 'max:255', "unique:customers,email,{$id}"],
            'phone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'cpf' => ['sometimes', 'nullable', 'string', 'size:11', "unique:customers,cpf,{$id}"],
        ];
    }
}
