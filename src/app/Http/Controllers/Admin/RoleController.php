<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Requests\RoleRequest;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Repositories\RoleRepository;
use Illuminate\Support\Facades\Redirect;

class RoleController extends Controller
{
    protected $role;

    public function __construct(RoleRepository $role)
    {
         $this->role = $role;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $roles=  $this->role->getAll();
        return Inertia::render('Role/Index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return Inertia::render('Role/Create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(RoleRequest $request)
    {
        $role = $this->role->create($request->all());
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
        $role = $this->role->getById($id);
        return Inertia::render('Role/Show', compact('role'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $role = $this->role->getById($id);
        return Inertia::render('Role/Create', compact('role'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(RoleRequest $request, $id)
    {
        $role=$this->role->update($id, $request->all());
        return Redirect::route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $this->role->delete($id);
        return Redirect::route('roles.index');

    }
}
