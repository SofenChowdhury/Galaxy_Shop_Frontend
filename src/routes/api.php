<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\AttributeController;
use App\Http\Controllers\Admin\AttributePrefixController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ProductController as TrimController;
use App\Http\Controllers\Admin\ProductController as GalleryController;
use App\Http\Controllers\Admin\SeriesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => ['api','throttle:60,1'],'prefix' => 'v1/auth'], function ($router) {
    Route::post('login',  [AuthController::class ,'login']);
    Route::post('logout', [AuthController::class ,'logout']);
    Route::post('refresh',[AuthController::class ,'refresh']);
    Route::post('register', [AuthController::class ,'store']);
    Route::post('/send-otp', [AuthController::class ,'sendingOtp']);
    Route::post('/verify-token', [AuthController::class ,'verifyToken']);
    Route::get('profile', [AuthController::class ,'me']);
    Route::post('profile/update-photo', [UserController::class,'userChangePhoto']);
    Route::post('change-password', [UserController::class,'changePassword']);
    Route::post('profile/update', [UserController::class,'userProfileUpdate']);

});

Route::group(['prefix' => 'v1','middleware' => ['jwt.verify', 'throttle:60,1']], function () {
    Route::get('/order-list',[OrderController::class,'userOrder']);
    Route::post('place-order/' , [OrderController::class,'placeOrder']);
    Route::get('show-order/{id}' , [OrderController::class,'orderDetails']);
    Route::post('order-payment' , [PaymentController::class,'orderPayment']);

});

Route::group(['prefix' => 'v1','middleware' => ['throttle:60,1']], function () {
    Route::get('categories' , [CategoryController::class,'index']);
    Route::get('products' , [ProductController::class,'index']);
    Route::get('product/{slug}' , [ProductController::class,'productDescription']);
    Route::get('home' , [HomeController::class,'index']);
    Route::get('districts/{id?}' , [HomeController::class,'district'])->name('districts');
    Route::get('thanas/{id?}',[ HomeController::class , 'thana'])->name('thana');
    Route::get('shops/{thana_id?}',[ HomeController::class , 'shop'])->name('shop');
});

Route::get('gallery-edit/{id}',[ GalleryController::class , 'galleryEdit'])->name('gallery.edit');
Route::get('attribute-edit/{id}',[ AttributeController::class , 'edit'])->name('attribute.edit');
Route::get('trim-edit/{id}',[ TrimController::class , 'trimEdit'])->name('trim.edit');
Route::get('specification-edit/{id}',[ TrimController::class , 'specificationEdit'])->name('specification.edit');
Route::get('specification-edit/{id}',[ TrimController::class , 'specificationEdit'])->name('specification.edit');
Route::get('prefix-edit/{id}',[ AttributePrefixController::class , 'prefixEdit'])->name('prefix.edit');

// Series API
Route::get('series-edit/{id}',[ SeriesController::class , 'seriesEdit'])->name('series.edit');
Route::get('company-show/{id}',[ CompanyController::class , 'show'])->name('company.show');

Route::get('category-edit/{id}',[ CategoryController::class , 'categoryEdit'])->name('category.edit');



