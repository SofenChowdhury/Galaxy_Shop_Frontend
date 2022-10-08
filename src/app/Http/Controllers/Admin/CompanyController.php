<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\CompanyRepository;

class CompanyController extends Controller
{
    protected $company;

    public function __construct(CompanyRepository $company)
    {
         $this->company = $company;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies =  $this->company->getAll();
        return Inertia::render('Company/Index', compact('companies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request = array_merge($request->all(), ['uuid' => Str::uuid(), 'slug' => Str::slug($request->name)]);
        $this->company->create($request);
        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $company = $this->company->getByUuid($uuid);
        return response()->json($company);    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $uuid)
    {
        // return $request;
        $data['name'] = $request->name;
        $data['slug'] = Str::slug($request->name);
        $data['company_code'] = $request->company_code;
        $data['contact_person'] = $request->contact_person;
        $data['contact_number'] = $request->contact_number;
        $data['contact_email'] = $request->contact_email;
        $data['contact_address'] = $request->contact_address;
        $data['company_tin'] = $request->company_tin;
        $data['company_bin'] = $request->company_bin;
        $this->company->update($uuid, $data);
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
        //
    }
}
