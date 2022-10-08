<?php
namespace App\Repositories;

use App\Models\Category;
use Illuminate\Support\Str;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class CategoryRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Category $model)
     {
        $this->model = $model;
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
     *  specified resource get .
     *
     * @param  string  $uuid
     * @return \Illuminate\Http\Response
     */

     
    public function getByUuid($uuid){
          return $this->model::where('uuid', $uuid)->first();
     } 

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){

          $category = $this->model;

          $category->name =$request->name;
          $category->slug = Str::slug($request->name);
          $category->uuid = Str::uuid();
          $category->status =$request->status == ""? 1:0;
          $category->save();
          return $category;
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update($uuid, $request){

          $category= $this->getByUuid($uuid);

          $category->name=$request->name;
          $category->slug = Str::slug($request->name);
          $category->update();
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


      public function categories()
      {
          return  $this->model::where('status', 1)->get();
      }



}
