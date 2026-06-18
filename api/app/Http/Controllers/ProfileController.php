<?php

namespace App\Http\Controllers;

use App\Actions\Users\UpdateProfileAction;
use App\Http\Requests\Users\UpdateProfileRequest;
use App\Http\Resources\UserResource;

class ProfileController extends Controller
{
    public function show(): UserResource
    {
        return new UserResource(auth()->user());
    }

    public function update(UpdateProfileRequest $request, UpdateProfileAction $action): UserResource
    {
        return new UserResource($action->execute(auth()->user(), $request));
    }
}
