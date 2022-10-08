<?php
namespace App\Repositories;

use Mahabub\CrudGenerator\Contracts\BaseRepository;
use App\Models\Coupon;

class CouponRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Coupon $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::all();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::find($id);
     }   

     /**
     * resource create
     * @param $request
     * @return \Illuminate\Http\Response
     */

     public function create( $request){
          // return $request;
          $coupon = new $this->model;
          $startDateTime = date('Y-m-d H:i:s', strtotime($request->start_date.' '.$request->start_time));
          $endDateTime =  date('Y-m-d H:i:s', strtotime($request->end_date.' '.$request->end_time));
          $request->user_id !="" ? $request->user_id : NULL;
          $coupon->code = $request->code;
          $coupon->type = $request->coupon_type;
          $coupon->price_value = $request->price_value;
          $coupon->max_usable = $request->max_usable;
          $coupon->min_cart_value = $request->min_cart_value;
          $coupon->times = $request->times;
          $coupon->start_date = $startDateTime;
          $coupon->end_date = $endDateTime;
          $coupon->note = $request->note !=""? $request->note: NULL;
          // return $coupon;
          $coupon->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $coupon= $this->getById($id);

          $coupon->name=$request->name;
          $coupon->update();
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
