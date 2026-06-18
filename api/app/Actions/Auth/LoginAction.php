<?php

namespace App\Actions\Auth;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginAction
{
    public function execute(LoginRequest $request): array
    {
        $token = JWTAuth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ]);

        if (!$token) {
            throw new AuthenticationException('Credenciais inválidas.');
        }

        $user = auth()->user();

        return [
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'user' => $user,
        ];
    }
}
