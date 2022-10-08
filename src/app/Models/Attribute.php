<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
   /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
   protected $fillable = [ 'name'];



    public function product()
    {
       return $this->belongsTo(Product::class);
    }
     //
    public function attributeOptions()
    {
        return $this->hasMany(AttributeOption::class);
    }
}
