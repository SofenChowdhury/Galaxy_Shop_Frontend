<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\ProductRepository;


class ProductController extends Controller
{
    //
    protected $product;

    public function __construct(ProductRepository $product)
    {
        $this->product = $product;
    }

    public function index()
    {
         return response()->json(['status'=>true, 'products'=>$this->product->getProduct()]);
    }

    public function productDescription($slug)
    {
        $product=Product::with(['category'=>function($query){
            $query->select('id' ,'name','slug');
        }])->with('galleries', 'attributes.attributeOptions','varitantProdcts.variantValues.attributeOption')->where('slug', $slug)->where('status',1)->first();
        return response()->json(['status'=>true, 'product'=>$product]);
    }
}
