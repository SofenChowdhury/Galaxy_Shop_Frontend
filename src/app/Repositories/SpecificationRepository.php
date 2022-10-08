<?php
namespace App\Repositories;

use Mahabub\CrudGenerator\Contracts\BaseRepository;
use App\Models\Specification;

class SpecificationRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Specification $model)
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

          $specification =$this->model;

          $specification->name=$request->name;
          $specification->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $specification= $this->getById($id);

          $specification->name=$request->name;
          $specification->update();
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
