<?php

namespace App\Actions\Products;

use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\Product;

class UpdateProductAction
{
    public function execute(Product $product, UpdateProductRequest $request): Product
    {
        $product->update($request->safe()->except('images'));

        if ($request->has('images')) {
            $product->images()->delete();

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
        }

        return $product->fresh('images');
    }
}
