<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Gallery;
use App\Models\Product;
use App\Models\Category;
use App\Toaster\AddsToast;
use App\Classes\FileUpload;
use Illuminate\Support\Str;
use App\Models\colorVariant;
use App\Models\ProductLabel;
use App\Models\Specification;
use App\Models\AttributePrefix;
use App\Models\SpecificationPrefix;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Models\Series;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\Foreach_;

class ProductController extends Controller
{
    use AddsToast;
    protected $product;
    protected $file;

    public function __construct(ProductRepository $product, FileUpload $fileUpload)
    {
         $this->product = $product;
         $this->file = $fileUpload;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $products=  $this->product->getAll();
       
        return Inertia::render('Product/Index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        $categories = Category::get();
        $series = Series::all();
        return Inertia::render('Product/Create', compact('categories','series'));
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(ProductRequest $request)

    {

     
        // $request->validate([
        //     "name"    => "required",
        //     "model"    => "required",
        //     "product_type"    => "required",
        //     "stock"    => "required",
        //     "category_id"    => "required",
        //     "lifting_price"    => "required",
        //     "regular_price"    => "required",
        //     "booking_amount" => "required",
        //     "seat_number" => "required",
        //     "description" => "required",
        //     "details" => "required",
        // ]);
  
  
        //   if($request->discount_price !=""){
        //     $request->validate([
        //       "discount_start_time" => "required",
        //       "discount_end_time"  => "required",
              
        //   ]);
        // }
        //  if($request->is_pre_book ==1 && $request->pre_book_amount==0 && $request->pre_book_amount==""){
        //     $request->validate([
        //       "pre_book_amount" => "required",
        //   ]);
        // }


       $series=  Series::all();
       $product=$this->product->create($request);
       return Redirect::route('products.index', compact('series'));

    }

   /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */

     public function show($id)
    {
        $product = $this->product->getById($id);

         return view('product.show', compact('product'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $series = Series::all();
        $categories = Category::get();
        $product = $this->product->getById($id);

        // dd($product);
        return Inertia::render('Product/Create', compact('categories' , 'product','series'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(ProductRequest $request ,$id)
    {
       
        $product=$this->product->update($request->product_id, $request->all());
        return Redirect::route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->product->delete($id);
        return back();

    }

    public function productUpdate(ProductRequest $request)
    {
        // return $request->thumbnail;
        $product=$this->product->update($request->product_id, $request);
        return Redirect::route('products.index');
    }


    public function specificationEdit($id)
     {
        $specification=Specification::with('specificationPrefix')->where('id', $id )->firstOrFail();
        return response()->json($specification);
     }

     public function specificationUpdate(ProductRequest $request)
     {
         
        $specification=Specification::where('id', $request->id)->where('specification_prefix_id', $request->prefix_id)->firstOrFail();
       
        // $prefix=SpecificationPrefix::where('product_label_id', $request->trim_id)->where('name', $request->prefix_name)->first();
        // return $prefix;
        $request->validate([
            'key'=> 'required|unique:specifications,key,'.$specification->id,
            'value'=> 'required|unique:specifications,value,'.$specification->id
       ]);
     
        $specification->key=$request->key;
        $specification->value=$request->value;
        // $specification->specification_prefix_id=$prefix->id;
        $specification->status=$request->status;
        $specification->update();
        return back();
     }

     public function galleryAdd($id)
     {
        $galleries= Gallery::latest()->where('product_id', $id)->get();
        return Inertia::render('Product/Gallery' , compact('id','galleries'));
     }


    public function galleryStore(ProductRequest $request)
    {       
        if ($request->image !=NULL) {
            $gallery = new Gallery();
            $gallery->product_id= $request->product_id;
            $gallery->image= $this->file->base64ImgUpload($request->image , $file="",$folder="galleries");
            $gallery->color_code= $request->color_code;
            $gallery->save();

            $title="Gallery!";
            $message="Data has been update successfully";
            $type="success";

            AddsToast::addToast($title,$message,$type);

            }else{
        
                $request->validate([
                    'image' => 'required'
                ]);
            
            }
        
           return redirect()->back()->with('success', 'some message');
         
    }

      
     public function  galleryEdit($id)
     {
        $gallery = Gallery::where('id' ,$id)->first();
        return response()->json($gallery);
     }

     
    public function galleryUpdate(ProductRequest $request)
      {
    
        $gallery = Gallery::where('id' ,$request->gallery_id)->first();
        $data=$request->image;
        $fileName="";
        if (substr($data, 0, 22) == 'data:image/jpg;base64,'  ||  substr($data, 0, 22) =="data:image/png;base64"  || substr($data, 0, 22) =="data:image/jpeg;base64")
        {
            if ($request->image !=NULL) {
                $fileName=$this->file->base64ImgUpload($request->image , $file=$gallery->image,$folder="galleries");
            }
        
        }
        $gallery->image=$fileName ?  $fileName :  $gallery->image;
        $gallery->update();
        $title="Gallery!";
        $message="Data has been update successfully";
        $type="success";

        AddsToast::addToast($title,$message,$type);
        return back(); 
      }

       public function galleryDelete($id)
       { 
          $gallery= Gallery::find($id);
           $this->file->fileDelete($folder="galleries",$file= $gallery->image);
           $gallery->delete();
           return back();
         
       }

      public function varitantForm($id)
      {
         $product=  Product::with('attributes.attributeOptions','varitantProdcts.variantValues.attributeOption')->where('id' , $id)->first();
         return Inertia::render('Product/Variant' , compact('id','product'));
      } 


      public function variantUpdate(ProductRequest $request)
      {   

        if(isset($request->variants)){
            foreach ($request->variants as $key => $variant) {
    
                $product=  Product::where('id' , $variant['id'])->first();
                $product->sku=  sku_generate();
                $product->regular_price=  $variant['regular_price'];
                $product->discount_price=  $variant['discount_price'];
                $product->stock=  10;
                $product->save();
            }
        }

        return Redirect::route('products.index');
             
      }


      public function varitantDelete($id)
      {
        $product= Product::where('id' , $id)->first();
        $product->delete();
        return back();
      }

}