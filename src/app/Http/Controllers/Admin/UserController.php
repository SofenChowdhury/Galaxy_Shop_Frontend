<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    protected $user;
    public function __construct(UserRepository $user)
    {
        $this->admin = $user;
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
        return Inertia::render('Admin/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'phone' => 'required|string|max:11|unique:admins',
            'password' => ['required', 'confirmed'],
        ]);        
        $admins = $request->all();
        $admins = $this->admin->create($admins);
        if (!empty($admins)) {
            return Redirect::route('admins.index')->with('success', 'User Successfully Created');
        }else{
            return Redirect::route('admins.create');
        }

        
    }

    public function edit()
    {
        $admins = $this->admin->getAll();
        return Inertia::render('Admin/edit', compact('admins'));
    }

    public function update()
    {
        $admins = $this->admin->getAll();
        return Inertia::render('Admin/Admins', compact('admins'));
    }

    public function destroy()
    {
        $admins = $this->admin->getAll();
        return Inertia::render('Admin/Admins', compact('admins'));
    }
}
