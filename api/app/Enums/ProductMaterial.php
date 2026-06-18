<?php

namespace App\Enums;

enum ProductMaterial: string
{
    case Prata925 = 'prata_925';
    case Prata950 = 'prata_950';
    case Ouro18k = 'ouro_18k';
    case Ouro24k = 'ouro_24k';
    case Rodio = 'rodio';
    case Inoxidavel = 'inoxidavel';

    public function label(): string
    {
        return match($this) {
            self::Prata925 => 'Prata 925',
            self::Prata950 => 'Prata 950',
            self::Ouro18k => 'Ouro 18k',
            self::Ouro24k => 'Ouro 24k',
            self::Rodio => 'Ródio',
            self::Inoxidavel => 'Inoxidável',
        };
    }
}
