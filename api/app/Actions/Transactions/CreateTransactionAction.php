<?php

namespace App\Actions\Transactions;

use App\Enums\TransactionStatus;
use App\Http\Requests\Transactions\CreateTransactionRequest;
use App\Models\Transaction;

class CreateTransactionAction
{
    public function execute(CreateTransactionRequest $request): Transaction
    {
        return Transaction::create([
            ...$request->validated(),
            'user_id' => auth()->id(),
            'status' => $request->status ?? TransactionStatus::Pending->value,
        ]);
    }
}
