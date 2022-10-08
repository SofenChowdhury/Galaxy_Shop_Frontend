<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
   use HasFactory;
   /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
    protected $fillable=['category_id','name','slug','sku','user_id','lifting_price','regular_price','discount_price','stock','max_order_qty','best','top','latest','details','specifications','photo','status'];

    public function galleries()
    {
         return $this->hasMany(Gallery::class);
    }

     public function category()
     {
          return $this->belongsTo(Category::class);
     }

     public function attributes()
      {
           return $this->hasMany(Attribute::class);
      }

     public function varitantProdcts()
     {
          return $this->hasMany($this, 'product_id');
     }
   

     public function variantValues()
     {
          return $this->hasMany(ProductVariantValue::class ,'product_variant_id' ,'id');
     }

    public function series()
    {
        return $this->belongsTo(Series::class);
    }


}
