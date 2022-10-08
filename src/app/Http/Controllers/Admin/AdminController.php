<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\AdminRepository;
use App\Repositories\CompanyRepository;
use App\Repositories\RoleRepository;
use Illuminate\Support\Facades\Redirect;

class AdminController extends Controller
{
    protected $admin;
    protected $role;
    protected $company;
    public function __construct(AdminRepository $admin, RoleRepository $role, CompanyRepository $company )
    {
        $this->admin = $admin;
        $this->role = $role;
        $this->company = $company;
    }
    
    public function index()
    {
        $admins = $this->admin->getAll();
        return Inertia::render('Admin/Index', compact('admins'));
    }

    public function show()
    {
        $admins = $this->admin->getAll();
        return Inertia::render('Admin/Show', compact('admins'));
    }

    public function create()
    {
        $roles=  $this->role->getAll();
        $companies=  $this->company->getAll();
        return Inertia::render('Admin/Create', compact('roles', 'companies'));
    }

    public function store(Request $request)
    {
        $admins = $this->admin->create($request);
        if (!empty($admins)) {
            return Redirect::route('admins.index')->with('success', 'User Successfully Created');
        }else{
            return Redirect::route('admins.create');
        }        
    }

    public function edit($id)
    {
        $admin = $this->admin->getById($id);
        $roles =  $this->role->getAll();
        $companies=  $this->company->getAll();

        $adminRoles = $admin->roles->pluck('id');
        return Inertia::render('Admin/Create', compact('admin', 'roles', 'companies' ,'adminRoles'));
    }

    public function update(Request $request)
    {
        $this->admin->update($request->id, $request);
        return Redirect::route('admins.index');
    }

    public function destroy()
    {
        $admins = $this->admin->getAll();
        return Inertia::render('Admin/Admins', compact('admins'));
    }

    public function changePassword()
    {
        return Inertia::render('Admin/ChangePassword');
    }

    public function StoreChangePassword(Request $request)
    {
        $request->validate([
            'password' => 'required|confirmed|min:8'
        ]);
        $user = auth()->user();
        $this->admin->changePassword($user->id, $request);
        return Inertia::render('Admin/ChangePassword', ['message' => "Your Password has been successfully updated"]);
    }

    public function userProfile()
    {
        $user = auth()->user();
        return Inertia::render('Admin/UserProfile', compact('user'));
    }

    public function storeUserProfile(Request $request)
    {        
        $this->admin->updateProfile($request);
        return back()->with('message', 'Your Profile has been successfully updated');
    }
}
