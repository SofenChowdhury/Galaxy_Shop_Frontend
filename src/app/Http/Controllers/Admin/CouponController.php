<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Coupon;
use App\Http\Controllers\Controller;
use App\Http\Requests\CouponRequest;
use App\Repositories\CouponRepository;
use Illuminate\Support\Facades\Redirect;

class CouponController extends Controller
{
    protected $coupon;

    public function __construct(CouponRepository $coupon)
    {
         $this->coupon = $coupon;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $coupons=  $this->coupon->getAll();
        return Inertia::render('Coupon/Index' , compact('coupons'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return Inertia::render('Coupon/Create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(CouponRequest $request)
    {
        return $coupon = $this->coupon->create($request);
    }

   /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */

     public function show($id)
    {
        $coupon = $this->coupon->getById($id);

         return view('coupon.show', compact('coupon'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $coupon = $this->coupon->getById($id);

         return view('coupon.edit', compact('coupon'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(CouponRequest $request, $id)
    {
        $coupon=$this->coupon->update($id, $request->all());
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->coupon->delete($id);
        return back();

    }
}
