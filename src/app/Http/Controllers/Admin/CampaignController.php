<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CampaignRequest;
use App\Models\Campaign;
use App\Repositories\CampaignRepository;
use Inertia\Inertia;

class CampaignController extends Controller
{
    protected $campaign;

    public function __construct(CampaignRepository $campaign)
    {
         $this->campaign = $campaign;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $campaigns=  $this->campaign->getAll();
        return Inertia::render('Campaign/Index', compact('campaigns'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        return Inertia::render('Campaign/Create');
    }


   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(CampaignRequest $request)
    {
        $campaign = $this->campaign->create($request->all());

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
        $campaign = $this->campaign->getById($id);

         return view('campaign.show', compact('campaign'));
    }

   /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function edit($id)
    {
        $campaign = $this->campaign->getById($id);

         return view('campaign.edit', compact('campaign'));
    }

   /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(CampaignRequest $request, $id)
    {
        $campaign=$this->campaign->update($id, $request->all());
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
        $this->campaign->delete($id);
        return back();

    }
}
