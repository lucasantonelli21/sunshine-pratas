<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => (float) $this->price,
            'type' => $this->type->value,
            'typeLabel' => $this->type->label(),
            'gender' => $this->gender->value,
            'genderLabel' => $this->gender->label(),
            'material' => $this->material->value,
            'materialLabel' => $this->material->label(),
            'stock' => $this->stock,
            'isActive' => $this->is_active,
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
            'createdAt' => $this->created_at?->toISOString(),
        ];
    }
}
