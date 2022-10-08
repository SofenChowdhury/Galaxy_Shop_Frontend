<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Http\Requests\SliderRequest;
use App\Repositories\SliderRepository;
use Illuminate\Support\Facades\Redirect;

class SliderController extends Controller
{
    protected $slider;
  

    public function __construct(SliderRepository $slider)
    {
         $this->slider = $slider;
        
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $sliders=  $this->slider->getAll();
        return Inertia::render('Slider/Index' , compact('sliders'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return Inertia::render('Slider/Create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(SliderRequest $request)
    {     
        
        $this->slider->create($request);
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
        $slider = $this->slider->getById($id);

         return view('slider.show', compact('slider'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $slider = $this->slider->getById($id);
         return Inertia::render('Slider/Create', compact('slider'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(SliderRequest $request)
    {
        $slider=$this->slider->update($request->id, $request);
        return Redirect::route('sliders.index');
        // return Inertia::redirect('Slider/Index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->slider->delete($id);
        return back();

    }
}
