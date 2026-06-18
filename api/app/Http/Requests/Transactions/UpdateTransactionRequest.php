<?php

namespace App\Http\Requests\Transactions;

use App\Enums\PaymentMethod;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class UpdateTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'description' => ['sometimes', 'string', 'max:200'],
            'amount' => ['sometimes', 'numeric', 'min:0.01'],
            'date' => ['sometimes', 'date'],
            'type' => ['sometimes', new Enum(TransactionType::class)],
            'status' => ['sometimes', new Enum(TransactionStatus::class)],
            'payment_method' => ['sometimes', 'nullable', new Enum(PaymentMethod::class)],
            'category' => ['sometimes', 'nullable', 'string', 'max:100'],
            'notes' => ['sometimes', 'nullable', 'string', 'max:500'],
        ];
    }
}
