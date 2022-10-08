<?php
namespace App\Repositories;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class OrderRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Order $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
          return Cache::remember('orders', 60, function() {
               return $this->model::latest()->paginate(20);
           });
           
          
     }

     /**
      * all resource get
      * @return Collection
      */
      public function getLatest(){
          return $this->model::take(20)->get();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::with(['orderItem', 'orderItem.itemInfo', 'user.company', 'user.shop'])
          ->where('id', $id)->first();
     }  

     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getShowById(int $id){
          return $this->model::with(['orderItem', 'orderItem.itemInfo', 'user.company', 'user.shop', 'histories.admin', 'payments'])
          ->where('id', $id)->first();
     }

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create( $request){

          $order =$this->model;
          $order->name = $request->name;
          $order->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id,  $request){
          $order = $this->model->find($id);
          if ($order->order_status == 'delivered') {
               return false;
          }elseif ($order->order_status == 'declined') {
               return false;
          }
          $order->order_status = $request['title'];
          return $order->update();
     } 
        
     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function delete($id){
       return $this->getById($id)->delete();
     }
}
