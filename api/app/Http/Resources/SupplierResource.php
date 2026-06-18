<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'tradeName' => $this->trade_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'document' => $this->document,
            'documentType' => $this->document_type,
            'contactName' => $this->contact_name,
            'contactEmail' => $this->contact_email,
            'contactPhone' => $this->contact_phone,
            'address' => [
                'street' => $this->address_street,
                'number' => $this->address_number,
                'complement' => $this->address_complement,
                'neighborhood' => $this->address_neighborhood,
                'city' => $this->address_city,
                'state' => $this->address_state,
                'zipCode' => $this->address_zip_code,
                'country' => $this->address_country,
            ],
            'paymentTerms' => $this->payment_terms,
            'notes' => $this->notes,
            'isActive' => $this->is_active,
            'createdAt' => $this->created_at?->toISOString(),
        ];
    }
}
