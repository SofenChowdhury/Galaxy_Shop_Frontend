<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class CustomerRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(User $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
          return $this->model::with('company', 'shop')->paginate(10);
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::with('company', 'shop')->find($id);
     }   

     /**
     * resource create
     * @param $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){
          $customer = $this->model;
          $customer->name = $request->name;
          $customer->uuid = Str::uuid();
          $customer->email = $request->email;
          $customer->phone = $request->phone;
          $customer->company_id = $request->company_id;
          $customer->shop_id = $request->shop_id;
          $customer->password = Hash::make($request->password);
          $customer->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $customer = $this->getById($id);
          $customer->name = $request->name;
          $customer->email = $request->email;
          $customer->phone = $request->phone;
          $customer->company_id = $request->company_id;
          $customer->shop_id = $request->shop_id;
          // $customer->password = $request->password !==""? Hash::make($request->password): $customer->password;
          $customer->update();
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
