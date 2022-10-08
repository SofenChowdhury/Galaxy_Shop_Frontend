<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\AdminRepository;
use App\Repositories\ShopsRepository;
use App\Repositories\ThanaRepository;
use App\Repositories\CompanyRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\DistrictRepository;
use App\Repositories\DivisionRepository;
use Illuminate\Support\Facades\Redirect;

class ShopController extends Controller
{

    protected $shop;
    protected $company;
    protected $admin;
    protected $customer;

    public function __construct(ShopsRepository $shop, CompanyRepository $company, AdminRepository $admin, CustomerRepository $customer)
    {
         $this->shop = $shop;
         $this->company = $company;
         $this->admin = $admin;
         $this->customer = $customer;
        
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shops = $this->shop->getPaginateAll();
        $companies = $this->company->getAll();
        return Inertia::render('Shop/Index' , compact('shops', 'companies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $companies = $this->company->getAll();
        $admins = $this->admin->getAll();
        return Inertia::render('Shop/Create' , compact('companies', 'admins'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request = array_merge($request->all(), ['uuid' => Str::uuid()]);
        $this->shop->create($request);
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($uuid)
    {
        $companies = $this->company->getAll();
        $admins = $this->admin->getAll();
        $divisions = $this->division->getAll();
        $districts = $this->district->getAll();
        $thanas = $this->thana->getAll();
        $shop = $this->shop->getByUuid($uuid);
        // return $shop;
        return Inertia::render('Shop/Edit' , compact('companies', 'admins', 'divisions', 'districts', 'thanas', 'shop'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        return $request;
        return $this->shop->update($request->id, $request);
        return Redirect::route('shops.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
