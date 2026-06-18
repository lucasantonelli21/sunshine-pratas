<?php

namespace App\Http\Controllers;

use App\Actions\Customers\CreateCustomerAction;
use App\Actions\Customers\UpdateCustomerAction;
use App\Http\Requests\Customers\CreateCustomerRequest;
use App\Http\Requests\Customers\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CustomerController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $customers = Customer::query()
            ->search($request->query('search'))
            ->orderBy('name')
            ->get();

        return CustomerResource::collection($customers);
    }

    public function store(CreateCustomerRequest $request, CreateCustomerAction $action): JsonResponse
    {
        return response()->json(new CustomerResource($action->execute($request)), 201);
    }

    public function show(Customer $customer): CustomerResource
    {
        return new CustomerResource($customer);
    }

    public function update(UpdateCustomerRequest $request, Customer $customer, UpdateCustomerAction $action): CustomerResource
    {
        return new CustomerResource($action->execute($customer, $request));
    }

    public function destroy(Customer $customer): JsonResponse
    {
        $this->authorize('delete', $customer);

        $customer->delete();

        return response()->json(null, 204);
    }
}
