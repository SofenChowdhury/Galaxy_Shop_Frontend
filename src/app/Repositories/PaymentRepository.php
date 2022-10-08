<?php
namespace App\Repositories;

use Mahabub\CrudGenerator\Contracts\BaseRepository;
use App\Models\Payment;

class PaymentRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Payment $model)
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

     public function create($request){

          $payment =$this->model;

          $payment->name = $request->name;
          $payment->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id,$request){

          $payment= $this->getById($id);

          $payment->name=$request->name;
          $payment->update();
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
