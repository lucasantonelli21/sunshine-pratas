<?php

namespace App\Models;

use App\Enums\ProductGender;
use App\Enums\ProductMaterial;
use App\Enums\ProductType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'description',
        'price',
        'type',
        'gender',
        'material',
        'stock',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
        'stock' => 0,
    ];

    protected function casts(): array
    {
        return [
            'type' => ProductType::class,
            'gender' => ProductGender::class,
            'material' => ProductMaterial::class,
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeSearch($query, ?string $search)
    {
        if (!$search) return $query;

        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }
}
