<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
   /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
   protected $fillable = [ 'name'];
}
