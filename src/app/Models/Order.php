<?php

namespace App\Models;

use App\Models\User;
use App\Models\Payment;
use App\Models\Product;
use App\Models\OrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
   /**
    * The attributes that are mass assignable.
    *
    * @var string[]
    */
   // protected $fillable = [ 'id'];
   protected $guarded = ['id'];

   public function orderItem()
   {
       return $this->hasMany(OrderItem::class);
   }
   public function orderItems()
   {
      return $this->hasMany(OrderItem::class);
   }
   public function payments()
   {
      return $this->hasMany(Payment::class);
   }

   public function user()
   {
      return $this->belongsTo(User::class,'user_id','id');
   }

   public function histories()
   {
      return $this->hasMany(OrderHistory::class);
   }


   public function  scopeUserInfo($query)
      {
          return  $query->addSelect([
                'name' => User::select('name')->whereColumn('id', 'orders.user_id'),
            ]);
      }

}
