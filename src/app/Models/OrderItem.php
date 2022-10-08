<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [ 'title'];

    public function itemInfo()
    {
        return $this->belongsTo(Product::class, 'product_id', 'id')->select('id', 'sku', 'title', 'slug');
    }
}
