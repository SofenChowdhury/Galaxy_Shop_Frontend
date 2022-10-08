<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Payment;
use App\Mail\OrderPlaced;
use App\Mail\OrderPlacedB2b;
use App\Mail\OrderPlacedCompany;
use App\Http\Requests\OrderRequest;
use App\Mail\OrderDeclinedCustomer;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Repositories\AdminRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ShopsRepository;
use App\Mail\OrderConfirmationCustomer;
use App\Mail\OrderLogisticApproval;
use App\Repositories\CompanyRepository;
use App\Repositories\OrderHistoryRepository;

class OrderController extends Controller
{
    protected $order;
    protected $company;
    protected $admin;
    protected $shop;
    protected $orderHistory;

    public function __construct(OrderRepository $order, CompanyRepository $company, AdminRepository $admin, ShopsRepository $shop, OrderHistoryRepository $orderHistory)
    {
         $this->order = $order;
         $this->company = $company;
         $this->admin = $admin;
         $this->shop = $shop;
         $this->orderHistory = $orderHistory;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */

    public function index()
    {
        $orders =  $this->order->getAll();
        $companies = $this->company->getAll();
        $admins = $this->admin->getAll();
        $shops = $this->shop->getAll();
        return Inertia::render('Order/Index', compact('orders', 'companies', 'admins', 'shops')); 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return view('order.create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(OrderRequest $request)
    {
        $order = $this->order->create($request->all());

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
        $order = $this->order->getShowById($id);
        return Inertia::render('Order/Show', compact('order'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $order = $this->order->getById($id);

         return view('order.edit', compact('order'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(OrderRequest $request)
    {
        $inputData = [];
        try {
            $inputData['title'] = $request->order_status;
            $this->order->update($request->id, $inputData);
            $inputData['admin_id'] = auth()->user()->id;
            $inputData['order_id'] = $request->id;
            $this->orderHistory->create($inputData);
            $this->sendNotification($request->id);
            return back();
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function orderPayment($id)
    {
        $payments = Payment::where('order_id', $id)->get();
        return  response()->json($payments);
        // return $payments;
        return Inertia::render('Order/Payments', compact('payments'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->order->delete($id);
        return back();
    }

    public function sendNotification($order_id)
    {
        $orderInfo = $this->order->getById((int) $order_id);
        if ($orderInfo->order_status == 'confirmation') {            
            Mail::to($orderInfo->customer_email)->send(new OrderConfirmationCustomer($orderInfo, $orderInfo->orderItem));
        }elseif($orderInfo->order_status == 'declined'){
            Mail::to($orderInfo->customer_email)->send(new OrderDeclinedCustomer($orderInfo, $orderInfo->orderItem));
        }elseif($orderInfo->order_status == 'vendor_confirmation'){
            Mail::to($orderInfo->customer_email)->send(new OrderPlaced($orderInfo, $orderInfo->orderItem));
            Mail::to($orderInfo->user->company->contact_email)->send(new OrderPlacedCompany($orderInfo, $orderInfo->orderItem));
            Mail::to($orderInfo->user->shop->contact_email)->send(new OrderPlacedCompany($orderInfo, $orderInfo->orderItem));
            Mail::to('b2b@fel.com.bd')->send(new OrderPlacedB2b($orderInfo, $orderInfo->orderItem));
        }elseif($orderInfo->order_status == 'processing'){
            Mail::to('b2b.logistrict@fel.com.bd')->send(new OrderLogisticApproval($orderInfo, $orderInfo->orderItem));
        }elseif($orderInfo->order_status == 'delivered'){
            Mail::to($orderInfo->customer_email)->send(new OrderPlaced($orderInfo, $orderInfo->orderItem));
            Mail::to($orderInfo->user->company->contact_email)->send(new OrderPlacedCompany($orderInfo, $orderInfo->orderItem));
            Mail::to($orderInfo->user->shop->contact_email)->send(new OrderPlacedCompany($orderInfo, $orderInfo->orderItem));
            Mail::to('b2b@fel.com.bd')->send(new OrderPlacedB2b($orderInfo, $orderInfo->orderItem));
        }
        
    }
}
