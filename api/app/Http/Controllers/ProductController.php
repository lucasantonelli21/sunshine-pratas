<?php

namespace App\Http\Controllers;

use App\Actions\Products\CreateProductAction;
use App\Actions\Products\UpdateProductAction;
use App\Http\Requests\Products\CreateProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $products = Product::with('images')
            ->active()
            ->search($request->query('search'))
            ->orderBy('name')
            ->get();

        return ProductResource::collection($products);
    }

    public function all(Request $request): AnonymousResourceCollection
    {
        $this->authorize('create', Product::class);

        $products = Product::with('images')
            ->search($request->query('search'))
            ->orderBy('name')
            ->get();

        return ProductResource::collection($products);
    }

    public function store(CreateProductRequest $request, CreateProductAction $action): JsonResponse
    {
        $this->authorize('create', Product::class);

        return response()->json(new ProductResource($action->execute($request)), 201);
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product->load('images'));
    }

    public function update(UpdateProductRequest $request, Product $product, UpdateProductAction $action): ProductResource
    {
        $this->authorize('update', $product);

        return new ProductResource($action->execute($product, $request));
    }

    public function activate(Product $product): ProductResource
    {
        $this->authorize('update', $product);

        $product->update(['is_active' => true]);

        return new ProductResource($product->fresh('images'));
    }

    public function deactivate(Product $product): ProductResource
    {
        $this->authorize('update', $product);

        $product->update(['is_active' => false]);

        return new ProductResource($product->fresh('images'));
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->authorize('delete', $product);

        $product->delete();

        return response()->json(null, 204);
    }
}
