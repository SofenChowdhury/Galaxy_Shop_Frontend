<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ShopsRepository;
use Illuminate\Support\Facades\Cache;
use App\Repositories\ProductRepository;

class DashboadController extends Controller
{
    //
    protected $order;
    protected $shop;
    protected $user;
    protected $product;
    public function __construct(OrderRepository $order, ShopsRepository $shop, UserRepository $user, ProductRepository $product)
    {
         $this->order = $order;
         $this->shop = $shop;
         $this->user = $user;
         $this->product = $product;
    }
    

    public function index(Request $request)
    {      
        $orders = $this->order->getAll();
        $shops = $this->shop->getPageTen();        
        $customers = $this->user->getPageTen();
        $products = $this->product->getPageTen();
        return Inertia::render('Dashboard', compact('orders', 'shops', 'customers', 'products'));
    }
}
