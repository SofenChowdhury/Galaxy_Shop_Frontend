<?php

namespace App\Models;

use App\Models\AttributeOption;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductVariantValue extends Model
{
    use HasFactory;

    public function attributeOption()
    {
         return $this->belongsTo(AttributeOption::class,'attribute_option_id','id');
    }
}
