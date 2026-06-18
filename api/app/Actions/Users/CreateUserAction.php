<?php

namespace App\Actions\Users;

use App\Http\Requests\Users\CreateUserRequest;
use App\Models\User;

class CreateUserAction
{
    public function execute(CreateUserRequest $request): User
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role,
        ]);
    }
}
