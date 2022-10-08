<?php
namespace App\Repositories;

use App\Models\Slider;
use App\Classes\FileUpload;
use Illuminate\Support\Str;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class SliderRepository implements BaseRepository{

     protected  $model;
     protected  $file;
     
     public function __construct(Slider $model,FileUpload $fileUpload )
     {
        $this->model=$model;
        $this->file = $fileUpload;
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
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){

          // $request->validate([
          //     "name"    => "required",
          //     "image"    => "required|image|mime:jpg,png,jpeg,webp",
          // ]);

          $slider = new $this->model;
          $slider->name = $request->name;
          $slider->slug = Str::slug($request->name);
          $slider->image = $this->file->uploadFile($request, $fieldname="image" ,$file="",$folder="sliders");
          $slider->position = $request->position;
          $slider->status = $request->status;
          $slider->created_at = date('Y-m-d G:i:s', strtotime(now()));
          $slider->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $request->validate([
               "name"    => "required",
              
           ]);
           
          $slider= $this->getById($id);
          $image= $this->file->uploadFile($request, $fieldname="image" ,$file=$slider->image,$folder="sliders");
          $slider->name=$request->name;
          $slider->image=$image? $image: $slider->image;
          $slider->position = $request->position;
          $slider->status = $request->status;
          $slider->update();
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
