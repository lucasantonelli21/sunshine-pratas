<?php

namespace App\Enums;

enum TransactionStatus: string
{
    case Pending = 'pending';
    case Settled = 'settled';

    public function label(): string
    {
        return match($this) {
            self::Pending => 'Pendente',
            self::Settled => 'Liquidado',
        };
    }
}
