<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Specification extends Model
{
   use HasFactory;



    public function specificationPrefix()
    {
       return $this->belongsTo(SpecificationPrefix::class);
    }
}

