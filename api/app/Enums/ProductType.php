<?php

namespace App\Enums;

enum ProductType: string
{
    case Brinco = 'brinco';
    case Colar = 'colar';
    case Pulseira = 'pulseira';
    case Anel = 'anel';
    case Tornozeleira = 'tornozeleira';
    case Alianca = 'alianca';
    case Piercing = 'piercing';
    case Pingente = 'pingente';
    case Corrente = 'corrente';

    public function label(): string
    {
        return match($this) {
            self::Brinco => 'Brinco',
            self::Colar => 'Colar',
            self::Pulseira => 'Pulseira',
            self::Anel => 'Anel',
            self::Tornozeleira => 'Tornozeleira',
            self::Alianca => 'Aliança',
            self::Piercing => 'Piercing',
            self::Pingente => 'Pingente',
            self::Corrente => 'Corrente',
        };
    }
}
