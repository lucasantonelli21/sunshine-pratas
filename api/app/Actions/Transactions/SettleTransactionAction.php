<?php

namespace App\Actions\Transactions;

use App\Enums\TransactionStatus;
use App\Models\Transaction;

class SettleTransactionAction
{
    public function execute(Transaction $transaction): Transaction
    {
        $transaction->update(['status' => TransactionStatus::Settled]);

        return $transaction->fresh();
    }
}
