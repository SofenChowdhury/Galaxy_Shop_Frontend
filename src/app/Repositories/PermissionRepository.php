<?php
namespace App\Repositories;

use Spatie\Permission\Models\Permission;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class PermissionRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Permission $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::with('roles')->get();
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
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){
          $permission = $this->model;
          $permission->name = $request['name'];
          $permission->description = $request['description'];
          $permission->save();
          if (!empty($request['admin_roles'])) {
               $permission->syncRoles($request['admin_roles']);
          }          
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $permission= $this->getById($id);

          $permission->name=$request->name;
          $permission->update();
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
