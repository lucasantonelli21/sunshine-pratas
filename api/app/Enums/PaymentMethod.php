<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case Cash = 'cash';
    case CreditCard = 'credit_card';
    case DebitCard = 'debit_card';
    case BankTransfer = 'bank_transfer';
    case Pix = 'pix';
    case Check = 'check';
    case Other = 'other';

    public function label(): string
    {
        return match($this) {
            self::Cash => 'Dinheiro',
            self::CreditCard => 'Cartão de Crédito',
            self::DebitCard => 'Cartão de Débito',
            self::BankTransfer => 'Transferência Bancária',
            self::Pix => 'Pix',
            self::Check => 'Cheque',
            self::Other => 'Outro',
        };
    }
}
