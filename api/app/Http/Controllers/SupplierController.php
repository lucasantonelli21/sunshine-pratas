<?php

namespace App\Http\Controllers;

use App\Actions\Suppliers\CreateSupplierAction;
use App\Actions\Suppliers\UpdateSupplierAction;
use App\Http\Requests\Suppliers\CreateSupplierRequest;
use App\Http\Requests\Suppliers\UpdateSupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SupplierController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $suppliers = Supplier::query()
            ->search($request->query('search'))
            ->orderBy('name')
            ->get();

        return SupplierResource::collection($suppliers);
    }

    public function store(CreateSupplierRequest $request, CreateSupplierAction $action): JsonResponse
    {
        return response()->json(new SupplierResource($action->execute($request)), 201);
    }

    public function show(Supplier $supplier): SupplierResource
    {
        return new SupplierResource($supplier);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier, UpdateSupplierAction $action): SupplierResource
    {
        return new SupplierResource($action->execute($supplier, $request));
    }

    public function destroy(Supplier $supplier): JsonResponse
    {
        $supplier->delete();

        return response()->json(null, 204);
    }
}
