<?php

namespace App\Actions\Customers;

use App\Http\Requests\Customers\UpdateCustomerRequest;
use App\Models\Customer;

class UpdateCustomerAction
{
    public function execute(Customer $customer, UpdateCustomerRequest $request): Customer
    {
        $customer->update($request->validated());

        return $customer->fresh();
    }
}
