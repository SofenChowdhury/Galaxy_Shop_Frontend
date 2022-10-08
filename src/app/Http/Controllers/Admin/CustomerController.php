<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Customer;
use App\Mail\OrderPlaced;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Repositories\ShopsRepository;
use App\Http\Requests\CustomerRequest;
use App\Repositories\CompanyRepository;
use App\Repositories\CustomerRepository;
use Illuminate\Support\Facades\Redirect;

class CustomerController extends Controller
{
    protected $customer;
    protected $company;
    protected $shop;

    public function __construct(CustomerRepository $customer, CompanyRepository $company, ShopsRepository $shop)
    {
         $this->customer = $customer;
         $this->company = $company;
         $this->shop = $shop;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $customers =  $this->customer->getAll();
        $companies = $this->company->getAll();
        $shops = $this->shop->getAll();
        return Inertia::render('Customer/Index', compact('customers', 'companies', 'shops'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        $companies = $this->company->getAll();
        $shops = $this->shop->getAll();
        return Inertia::render('Customer/Create', compact('companies', 'shops'));
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $this->customer->create($request);
        return Redirect::route('customers.index');

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
        $customer = $this->customer->getById($id);

         return view('customer.show', compact('customer'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $customer = $this->customer->getById($id);
        $companies = $this->company->getAll();
        $shops = $this->shop->getAll();
        return Inertia::render('Customer/Create', compact('customer', 'companies', 'shops'));
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
        $customer=$this->customer->update($request->id, $request);
        return Redirect::route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->customer->delete($id);
        return back();

    }
}
