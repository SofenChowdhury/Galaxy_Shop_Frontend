<?php
namespace App\Repositories;

use App\Models\Series;
use Illuminate\Support\Str;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class SeriesRepository implements BaseRepository{

     protected  $model;
     protected  $file;
     
     public function __construct(Series $model)
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
          $series = $this->model;
          $series->title = $request->title;
          $series->uuid = Str::uuid();
          $series->slug = Str::slug($request->title);
          $series->save();
     }  

    /**
      * specified resource update
      *
      * @param string $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update($uuid, $request){

          $request->validate([
               "title"    => "required",
              
           ]);
           
          $series = $this->getByUuid($uuid);
          $series->title = $request->title;
          $series->status = $request->status !=""? $request->status:$series->status;
          $series->update();
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

     public function getSlider($limit=null)
     {
         if($limit!=null){
               return $this->model::where('status',1)->latest()->get();
          }else{
               return $this->model::where('status',1)->latest()->limit($limit)->get();
          }
     }
}
