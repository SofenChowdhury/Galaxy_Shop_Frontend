<?php
namespace App\Repositories;

use Spatie\Permission\Models\Role;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class RoleRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Role $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
          return $this->model::with('permissions')->get();
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

          $role =$this->model;

          $role->name=$request->name;
          $role->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $role= $this->getById($id);

          $role->name=$request->name;
          $role->update();
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
