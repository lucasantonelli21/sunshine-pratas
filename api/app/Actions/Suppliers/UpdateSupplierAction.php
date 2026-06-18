<?php

namespace App\Actions\Suppliers;

use App\Http\Requests\Suppliers\UpdateSupplierRequest;
use App\Models\Supplier;

class UpdateSupplierAction
{
    public function execute(Supplier $supplier, UpdateSupplierRequest $request): Supplier
    {
        $supplier->update($request->validated());

        return $supplier->fresh();
    }
}
