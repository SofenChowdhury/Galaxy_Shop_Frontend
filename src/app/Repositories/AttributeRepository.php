<?php
namespace App\Repositories;

use App\Models\Product;
use App\Models\Attribute;
use Illuminate\Support\Str;
use App\Models\AttributeOption;
use App\Models\ProductVariantValue;
use Illuminate\Support\Facades\Auth;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class AttributeRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Attribute $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::paginate(10);
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

     public function create( $request){
          

          if(isset($request->color)){
               if(!$this->model::where('name', 'color' )->where('product_id' , $request->product_id)->exists()){
                    $attribute = new  $this->model;
                    $attribute->product_id=$request->product_id;
                    $attribute->name='color';
                    $attribute->slug=Str::slug('color');
                    $attribute->save();
                    $this->variantOption($request->color, $attribute->product_id,$attribute->id);
               }
          }
          if(isset($request['size'])){
               if(!$this->model::where('name', 'size' )->where('product_id' , $request->product_id)->exists()){
                    $attribute = new  $this->model;
                    $attribute->product_id=$request->product_id;
                    $attribute->name='size';
                    $attribute->slug=Str::slug('size');
                    $attribute->save();
                    $this->variantOption($request->color, $attribute->product_id,$attribute->id);
                    
               }
          }

       $product=   Product::with('attributes.attributeOptions')->where('id', $request->product_id)->first();

       $super_attributes=[];
        foreach ($product->attributes as  $attributes ) {
            foreach ($attributes->attributeOptions as  $option) {
               $super_attributes[$attributes->name][]= $option->id;
            }
        }
        foreach(array_permutation($super_attributes) as $permutation){
          $this->productVariant($product->id,$permutation);
        }

          return  true;
     }  


     /** ============= product  variant =============
     * Store product variant 
     *
     * @param  array  $permutation
     * @param  int   $id (product id)
     */

    protected function productVariant($id,$permutation)
    {
       $product=  Product::find($id);
         
        if($vproduct=Product::where('attribute_option', implode('-',$permutation))->first()){
         $vproduct->product_id=$id;
         $vproduct->sku= $vproduct->variant_sku;
         $vproduct->uuid= Str::uuid();
         $vproduct->attribute_option= implode('-',$permutation);
         $vproduct->update();
        }else{
         $vproduct= new Product();
         $vproduct->user_id= Auth::user()->id;
         $vproduct->product_id=$id;
         $vproduct->sku= sku_generate();
         $vproduct->uuid= Str::uuid();
         $vproduct->attribute_option= implode('-',$permutation);
         $vproduct->save();

         foreach($permutation as $mutation){
           $voption= AttributeOption::find($mutation);
           $pvariantvalue= new ProductVariantValue();
           $pvariantvalue->product_id= $id;
           $pvariantvalue->attribute_id= $voption->attribute_id;
           $pvariantvalue->attribute_option_id= $voption->id;
           $pvariantvalue->product_id= $vproduct->product_id;
           $pvariantvalue->product_variant_id= $vproduct->id;
           $pvariantvalue->save();
         }
       }

   }
















    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update(int $id,$request){

          $attribute= $this->getById($id);
          $request->validate([
               'name'=> 'required|unique:attributes,name,'.$attribute->id
          ]);
        
          $attribute->name=$request->name;
          $attribute->status=$request->status;
          $attribute->update();
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



       /** ============= variant option =============
     * Store variant option
     *
     * @param  array  $attributes
     * @param  int   $product_id
     * @param  int   $variant_id
     */

    protected function variantOption($attribute,$product_id,$attribute_id)
    {
       foreach ($attribute as  $option) {
         $variantOption= new AttributeOption();
         $variantOption->product_id= $product_id;
         $variantOption->attribute_id= $attribute_id;
         $variantOption->slug= Str::slug($option);
         $variantOption->name= $option;
         $variantOption->save();
       }
    }

}
