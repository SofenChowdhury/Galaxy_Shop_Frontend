<?php

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Repositories\AdminRepository;
use App\Repositories\OrderRepository;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\ShopController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\SeriesController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CampaignController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboadController;
use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\SpecificationController;
use App\Http\Controllers\Admin\AttributePrefixController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::group(['middleware' => ['auth', 'verified']], function()
{
    Route::get('users',[ UserController::class , 'index'])->name('users');
    Route::get('dashboard',[DashboadController::class,'index'])->name('dashboard');
    Route::resource('roles', RoleController::class);
    Route::resource('companies', CompanyController::class);
    Route::resource('permissions', PermissionController::class);
    Route::resource('admins', AdminController::class); 
    Route::get('user-profile', [AdminController::class ,'userProfile'])->name('user.profile'); 
    Route::post('user-profile', [AdminController::class ,'storeUserProfile'])->name('update.user.profile'); 
    Route::get('change-password', [AdminController::class ,'changePassword'])->name('change.password'); 
    Route::post('change-password', [AdminController::class ,'StoreChangePassword'])->name('store.change.password'); 
    Route::resource('shops', ShopController::class);
    Route::post('admins-update',[ AdminController::class ,'update'])->name('admins.update'); 
    Route::resource('categories', CategoryController::class); 
    Route::resource('sliders', SliderController::class); 
    Route::resource('series', SeriesController::class); 
    Route::post('slider-update', [SliderController::class, 'update'])->name('sliders.update'); 
    Route::resource('products', ProductController::class);
    Route::post('product-update', [ProductController::class,'productUpdate'])->name('product.update');
   

    Route::get('gallery-add/{id}',[ ProductController::class , 'galleryAdd'])->name('gallery.add');
    Route::post('gallery-store',[ ProductController::class , 'galleryStore'])->name('gallery.store');
    Route::post('gallery-update',[ ProductController::class , 'galleryUpdate'])->name('gallery.update');
    Route::get('gallery-delete/{id}',[ ProductController::class , 'galleryDelete'])->name('gallery.detele');

    ///variant product

    Route::post('update-variant',[ ProductController::class , 'variantUpdate'])->name('variant.update');
    Route::get('variant/{id}',[ ProductController::class , 'varitantForm'])->name('variant.add');
    Route::get('variant-delete/{id}',[ ProductController::class , 'varitantDelete'])->name('variant.delete');


    Route::resource('orders', OrderController::class); 
    // Route::resource('orders', OrderController::class);
    Route::post('update-order-status', [OrderController::class, 'update'])->name('update.order');
    Route::get('order-payment/{id}', [OrderController::class, 'orderPayment'])->name('order.payment');
    Route::resource('coupons', CouponController::class);
    Route::resource('customers', CustomerController::class); 
    Route::post('customer-update', [CustomerController::class, 'update'])->name('customer.update');
    Route::resource('notifications', NotificationController::class);
    Route::resource('campaigns', CampaignController::class); 

    Route::get('attribute/{product_id}', [AttributeController::class,'index'])->name('attribute.add'); 
    Route::post('attribute-add', [AttributeController::class,'store'])->name('attribute.store'); 
    // Route::post('attribute-update', [AttributeController::class,'update'])->name('attribute.update'); 
    // Route::resource('attributes', AttributeController::class); 
});




require __DIR__.'/auth.php';
