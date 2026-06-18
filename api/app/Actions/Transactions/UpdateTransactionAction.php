<?php

namespace App\Actions\Transactions;

use App\Http\Requests\Transactions\UpdateTransactionRequest;
use App\Models\Transaction;

class UpdateTransactionAction
{
    public function execute(Transaction $transaction, UpdateTransactionRequest $request): Transaction
    {
        $transaction->update($request->validated());

        return $transaction->fresh();
    }
}
