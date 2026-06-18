<?php

namespace App\Actions\Customers;

use App\Http\Requests\Customers\CreateCustomerRequest;
use App\Models\Customer;

class CreateCustomerAction
{
    public function execute(CreateCustomerRequest $request): Customer
    {
        return Customer::create($request->validated());
    }
}
