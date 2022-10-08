<?php
namespace App\Repositories;

use Mahabub\CrudGenerator\Contracts\BaseRepository;
use App\Models\Notification;

class NotificationRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Notification $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::all();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::find($id);
     }   

     /**
     * resource create
     * @param $request
     * @return \Illuminate\Http\Response
     */

     public function create( $request){
          $notification = $this->model;
          $startDateTime = date('Y-m-d H:i:s', strtotime($request->start_date.' '.$request->start_time));         
          $notification->heading = $request->heading;
          $notification->message = $request->message !=""? $request->message:NULL;
          $notification->link = $request->link !=""? $request->link:NULL;
          $notification->image_url = $request->image_url !=""? $request->image_url:NULL;
          $notification->schedule_time = $startDateTime;
          // return $notification;
          $notification->save();
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id,$request){

          $notification= $this->getById($id);

          $notification->name=$request->name;
          $notification->update();
     } 
        
     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function delete($id){
       return $this->getById($id)->delete();
     }
}
