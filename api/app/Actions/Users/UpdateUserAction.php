<?php

namespace App\Actions\Users;

use App\Http\Requests\Users\UpdateUserRequest;
use App\Models\User;

class UpdateUserAction
{
    public function execute(User $user, UpdateUserRequest $request): User
    {
        $data = $request->only(['name', 'email', 'role']);

        if ($request->filled('password')) {
            $data['password'] = $request->password;
        }

        $user->update($data);

        return $user->fresh();
    }
}
