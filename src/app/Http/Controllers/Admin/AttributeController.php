<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Attribute;
use Illuminate\Http\Request;
use App\Models\AttributePrefix;
use App\Http\Controllers\Controller;
use App\Http\Requests\AttributeRequest;
use App\Repositories\AttributeRepository;

class AttributeController extends Controller
{
    protected $attribute;

    public function __construct(AttributeRepository $attribute)
    {
        $this->attribute = $attribute;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index($id)
    {
        $attributes=  Attribute::where('product_id', $id)->paginate(15);
        return Inertia::render('Attribute/Index', compact('attributes', 'id','prefixs'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return view('attribute.create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
 
    public function store(Request $request)
    {
        dd($request->all());
        $attribute = $this->attribute->create($request);
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
        $attribute = $this->attribute->getById($id);
         return view('attribute.show', compact('attribute'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $attribute = $this->attribute->getById($id);
        return response()->json($attribute);
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(AttributeRequest $request)
    {

        dd($request->all());
        $attribute=$this->attribute->update($request->id, $request);
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
        $this->attribute->delete($id);
        return back();

    }



   


}
