<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'amount' => (float) $this->amount,
            'date' => $this->date?->toDateString(),
            'type' => $this->type->value,
            'typeLabel' => $this->type->label(),
            'status' => $this->status->value,
            'statusLabel' => $this->status->label(),
            'paymentMethod' => $this->payment_method?->value,
            'paymentMethodLabel' => $this->payment_method?->label(),
            'category' => $this->category,
            'notes' => $this->notes,
            'user' => new UserResource($this->whenLoaded('user')),
            'createdAt' => $this->created_at?->toISOString(),
        ];
    }
}
