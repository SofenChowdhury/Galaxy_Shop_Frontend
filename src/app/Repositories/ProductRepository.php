<?php
namespace App\Repositories;

use App\Models\Product;
use App\Models\Category;
use App\Classes\FileUpload;
use Illuminate\Support\Str;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class ProductRepository implements BaseRepository{

     protected  $model;
     protected $file;
     
     public function __construct(Product $model , FileUpload $fileUpload)
     {
        $this->model=$model;
        $this->file = $fileUpload;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::where('product_id','=', null)->latest()->paginate(20);
     }

     public function getPageTen(){
        return $this->model::paginate(10);
      }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::with('category','series')->find($id);
     }   

     /**
     * resource create
     * @param $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){
       $product =$this->model;
       $request->validate([
            "title"    => "required",
            "stock"    => "required",
            "category_name"    => "required",
            "series_name"    => "required",
            "regular_price"    => "required",
            "specifications" => "required",
            "details" => "required",
        ]);
  
  
        if($request->discount_price !=""){
            $request->validate([
              "discount_start_time" => "required",
              "discount_end_time"  => "required",
              
          ]);
        }
        

       if ($request->thumbnail ==NULL) {
          $request->validate([
            "thumbnail"    => "required|image:mime:jpg,png,jpeg,webp",
           
        ]);
      }

       $category=Category::where('name', $request->category_name)->select('id')->first();
       $series= Series::where('title', $request->series_name)->select('id')->first();

  
        $product=  new Product();
        $product->user_id=Auth::user()->id;
        $product->uuid=Str::uuid();
        $product->title=$request->title;
        $product->sku= Str::random(3).substr(time(), 6,8).Str::random(3);
        $product->slug=Str::slug($request->title);
        $product->series_id=$series->id;
        $product->category_id= $category? $category->id :null;
        $product->stock=$request->stock;
        $product->max_order_qty=$request->max_order_qty;
        $product->specifications=$request->specifications;
        $product->details=$request->details;
        $product->photo=$this->file->base64ImgUpload($request->thumbnail , $file="" , $folder='thumbnails');
        $product->regular_price=$request->regular_price;
        if($request->discount_price!=""){
          $product->discount_price=$request->discount_price;

          if(!empty($request->discount_start_time)) {
            $product->discount_start_time = date('Y-m-d H:i:s', strtotime($request->discount_start_time));
          }
          if (!empty($request->discount_end_time)) {
            $product->discount_end_time = date('Y-m-d H:i:s', strtotime($request->discount_end_time));
          }
        
         }
        $product->featured=$request->featured;
        $product->best=$request->best;
        $product->top=$request->top;
        $product->status=$request->status;
        $product->save();

     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){

          $request->validate([
            "title"    => "required",
            "stock"    => "required",
            "series_name"    => "required",
            "category_name"    => "required",
            "regular_price"    => "required",
            "specifications" => "required",
            "details" => "required",
          ]);


          $series= Series::where('title', $request->series_name)->select('id')->first();
          $category=Category::where('name', $request->category_name)->select('id')->first();
          $product= $this->getById($id);
  
          if($request->discount_price !=""){
              $request->validate([
                "discount_start_time" => "required",
                "discount_end_time"  => "required",
                
            ]);
          }
           
          $fileName="";
          if (substr($request->thumbnail, 0, 22) == 'data:image/jpg;base64,'  ||  substr($request->thumbnail, 0, 22) =="data:image/png;base64," || substr($request->thumbnail, 0, 22) =="data:image/webp;base64" || substr($request->thumbnail, 0, 22) =="data:image/jpeg;base64")
          {
              if ($request->thumbnail !=NULL) {
                  $fileName=$this->file->base64ImgUpload($request->thumbnail , $file=$product->photo,$folder="thumbnails");
              }
          }else{
            $product->photo=$fileName ?  $fileName :  $product->photo;
          }
      
        $product->user_id=Auth::user()->id;
        $product->uuid=Str::uuid();
        $product->title=$request->title;
        $product->sku= Str::random(3).substr(time(), 6,8).Str::random(3);
        $product->slug=Str::slug($request->title);
        $product->category_id=$category->id;
        $product->series_id=$series->id;
        $product->stock=$request->stock;
        $product->max_order_qty=$request->max_order_qty;
        $product->specifications=$request->specifications;
        $product->details=$request->details;
        $product->photo=$fileName ?  $fileName :  $product->photo;
        $product->regular_price=$request->regular_price;

        if($request->discount_price!=""){
          $product->discount_price=$request->discount_price;

          if(!empty($request->discount_start_time)) {
            $product->discount_start_time = date('Y-m-d H:i:s', strtotime($request->discount_start_time));
          }
          if (!empty($request->discount_end_time)) {
            $product->discount_end_time = date('Y-m-d H:i:s', strtotime($request->discount_end_time));
          }
        
         }
        $product->featured=$request->featured;
        $product->best=$request->best;
        $product->top=$request->top;
        $product->status=$request->status;
        $product->update();
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

     public function getProduct($limit=null)
     {
         if($limit==null){
          return $this->model::where('status',1)->where('product_id','=', null)->select('id','title','slug','regular_price','discount_price','photo','discount_start_time','discount_end_time')->latest()->paginate(12);
         }else{
           return $this->model::where('status',1)->where('product_id','=', null)->select('id','title','slug','regular_price','discount_price','photo','discount_start_time','discount_end_time')->limit($limit)->latest()->get();
         }
     }


     public function popularProduct($limit=null)
     {
         if($limit==null){
          return $this->model::where('status',1)->where('product_id','=', null)->select('id','title','slug','regular_price','discount_price','photo','discount_start_time','discount_end_time')->where('best',1)->latest()->paginate(12);
         }else{
           return $this->model::where('status',1)->where('product_id','=', null)->select('id','title','slug','regular_price','discount_price','photo','discount_start_time','discount_end_time')->where('best',1)->latest()->limit($limit)->get();
         }
     }

     public function featuredProduct($limit=null)
     {
         if($limit==null){
          return $this->model::where('status',1)->where('product_id','=', null)->select('id','title','slug','regular_price','discount_price','photo','discount_start_time','discount_end_time')->where('featured',1)->latest()->paginate(12);
         }else{
           return $this->model::where('status',1)->where('product_id','=', null)->select('id','title','slug','regular_price','discount_price','photo','discount_start_time','discount_end_time')->where('featured',1)->latest()->limit($limit)->get();
         }
     }











}
