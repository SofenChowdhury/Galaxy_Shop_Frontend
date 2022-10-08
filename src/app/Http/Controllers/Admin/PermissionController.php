<?php
namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use Illuminate\Support\Facades\Redirect;
use App\Repositories\PermissionRepository;
use App\Repositories\RoleRepository;

class PermissionController extends Controller
{
    protected $permission;
    protected $role;

    public function __construct(PermissionRepository $permission, RoleRepository $role)
    {
         $this->permission = $permission;
         $this->role = $role;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $permissions =  $this->permission->getAll();
        return Inertia::render('Permission/Index', compact('permissions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        $roles=  $this->role->getAll();
        return Inertia::render('Permission/Create', compact('roles'));
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(PermissionRequest $request)
    {
        $permission = $this->permission->create($request->all());
        return Redirect::route('permissions.index');

    }

   /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
    */

     public function show($id)
    {
        $permission = $this->permission->getById($id);

         return view('permission.show', compact('permission'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $permission = $this->permission->getById($id);
        $roles=  $this->role->getAll();
        return Inertia::render('Permission/Create', compact('roles', 'permission'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(PermissionRequest $request, $id)
    {
        $permission=$this->permission->update($id, $request->all());
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
        $this->permission->delete($id);
        return back();

    }
}
