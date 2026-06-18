<?php

namespace App\Enums;

enum ProductGender: string
{
    case Feminino = 'feminino';
    case Masculino = 'masculino';
    case Unissex = 'unissex';

    public function label(): string
    {
        return match($this) {
            self::Feminino => 'Feminino',
            self::Masculino => 'Masculino',
            self::Unissex => 'Unissex',
        };
    }
}
