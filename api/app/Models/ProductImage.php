<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    use HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'url',
        'path',
        'order',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected function url(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->path
                ? Storage::disk('public')->url($this->path)
                : $value,
        );
    }
}
