<?php

namespace App\Actions\Users;

use App\Http\Requests\Users\UpdateProfileRequest;
use App\Models\User;

class UpdateProfileAction
{
    public function execute(User $user, UpdateProfileRequest $request): User
    {
        $data = $request->only(['name', 'email']);

        if ($request->filled('password')) {
            $data['password'] = $request->password;
        }

        $user->update($data);

        return $user->fresh();
    }
}
