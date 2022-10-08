<?php
namespace App\Repositories;


use App\Models\OrderHistory;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class OrderHistoryRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(OrderHistory $model)
     {
        $this->model = $model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
          return $this->model::paginate(20);
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
          return $this->model::with(['user', 'order'])
          ->where('id', $id)->first();
     }   

      /**
         *  specified resource get .
         *
         * @param  int  $id
         * @return \Illuminate\Http\Response
         */

        public function getByOrderId(int $orderId){
            return $this->model::with(['user', 'order'])
            ->where('order_id', $orderId)->get();
        } 

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

    public function create($request){
        // return $request['admin_id'];
        $orderHistory = $this->model;
        $orderHistory->admin_id   = $request['admin_id'];
        $orderHistory->order_id   = $request['order_id'];
        $orderHistory->title      = $request['title'];
        $orderHistory->sub_title  = NULL;
        $orderHistory->note      = null;
        $orderHistory->save();
    }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id,  $request){
        $orderHistory = $this->model->find($id);
        $orderHistory->title = $request['title'];
        return $orderHistory->update();
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
