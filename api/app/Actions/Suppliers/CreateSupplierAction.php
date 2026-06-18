<?php

namespace App\Actions\Suppliers;

use App\Http\Requests\Suppliers\CreateSupplierRequest;
use App\Models\Supplier;

class CreateSupplierAction
{
    public function execute(CreateSupplierRequest $request): Supplier
    {
        return Supplier::create($request->validated());
    }
}
