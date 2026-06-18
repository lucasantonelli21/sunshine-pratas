<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@sunshine.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin123'),
                'role' => UserRole::Admin,
            ]
        );
    }
}
