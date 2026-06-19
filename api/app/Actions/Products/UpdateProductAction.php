<?php

namespace App\Actions\Products;

use App\Http\Requests\Products\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class UpdateProductAction
{
    public function execute(Product $product, UpdateProductRequest $request): Product
    {
        $product->update($request->safe()->except('images'));

        if ($request->has('images')) {
            $paths = $product->images()->whereNotNull('path')->pluck('path');
            $product->images()->delete();
            $paths->each(fn($path) => Storage::disk('public')->delete($path));

            if ($request->filled('images')) {
                $product->images()->createMany(
                    collect($request->images)
                        ->map(fn($img, $idx) => [
                            'url'   => $img['url'] ?? null,
                            'path'  => $img['path'] ?? null,
                            'order' => $img['order'] ?? $idx,
                        ])
                        ->all()
                );
            }
        }

        return $product->fresh('images');
    }
}
