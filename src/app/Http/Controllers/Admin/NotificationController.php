<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NotificationRequest;
use App\Models\Notification;
use App\Repositories\NotificationRepository;
use Inertia\Inertia;

class NotificationController extends Controller
{
    protected $notification;

    public function __construct(NotificationRepository $notification)
    {
         $this->notification = $notification;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $notifications=  $this->notification->getAll();
        return Inertia::render('Notification/Index', compact('notifications'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return Inertia::render('Notification/Create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(NotificationRequest $request)
    {
        return $notification = $this->notification->create($request);

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
        $notification = $this->notification->getById($id);

         return view('notification.show', compact('notification'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $notification = $this->notification->getById($id);

         return view('notification.edit', compact('notification'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(NotificationRequest $request, $id)
    {
        $notification=$this->notification->update($id, $request->all());
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
        $this->notification->delete($id);
        return back();

    }
}
