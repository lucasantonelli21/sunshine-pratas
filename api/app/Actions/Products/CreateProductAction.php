<?php

namespace App\Actions\Products;

use App\Http\Requests\Products\CreateProductRequest;
use App\Models\Product;

class CreateProductAction
{
    public function execute(CreateProductRequest $request): Product
    {
        $product = Product::create($request->safe()->except('images'));

        if ($request->filled('images')) {
            $product->images()->createMany(
                collect($request->images)
                    ->map(fn($img, $idx) => [
                        'url' => $img['url'],
                        'order' => $img['order'] ?? $idx,
                    ])
                    ->all()
            );
        }

        return $product->load('images');
    }
}
