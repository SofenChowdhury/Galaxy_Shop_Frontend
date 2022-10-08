<?php
namespace App\Repositories;

use App\Models\Shop;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class ShopsRepository implements BaseRepository{

     protected  $model;
     protected  $file;
     
     public function __construct(Shop $model)
     {
        $this->model=$model;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getPaginateAll(){
         return $this->model::with(['company', 'users'])
         ->paginate(10);
     }
     
     public function getAll(){
          return $this->model::with(['company', 'users'])
          ->get();
     }

     public function getPageTen(){
          return $this->model::with(['company', 'users'])
          ->paginate(10);
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
     *  specified resource get .
     *
     * @param  string  $uuid
     * @return \Illuminate\Http\Response
     */

     
     public function getByUuid($uuid){
          return $this->model::where('uuid', $uuid)->first();
     }

      /**
     *  specified resource get .
     *
     * @param  string  $company_code
     * @return \Illuminate\Http\Response
     */

     
     public function getByDistrictID($district_id = NULL){
          if (!empty($district_id)) {
               return $this->model::where('district_id', $district_id)->get();
          }else{
               return $this->getAll();
          }          
     }

       public function getBThanaID($thana_id = NULL){
          if (!empty($thana_id)) {
               return $this->model::where('thana_id', $thana_id)->get();
          }else{
               return $this->getAll();
          }          
     }



     /**
     *  specified resource get .
     *
     * @param  string  $company_code
     * @return \Illuminate\Http\Response
     */

     
     public function getByThanaID($thana_id = NULL){
          if (!empty($thana_id)) {
               return $this->model::where('thana_id', $thana_id)->get();
          }else{
               return $this->getAll();
          }          
     }

     /**
     *  specified resource get .
     *
     * @param  string  $company_code
     * @return \Illuminate\Http\Response
     */

     
     public function getByCompanyID($company_id = NULL){
          if (!empty($company_id)) {
               return $this->model::where('company_id', $company_id)->get();
          }else{
               return $this->getAll();
          }          
     }

      /**
     *  specified resource get .
     *
     * @param  string  $company_code
     * @return \Illuminate\Http\Response
     */

     
     public function getByAdminID($admin_id = NULL){
          if (!empty($admin_id)) {
               return $this->model::where('admin_id', $admin_id)->get();
          }else{
               return $this->getAll();
          }
     }

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){
          $shop = $this->model;
          $shop->create($request);
     }  

    /**
      * specified resource update
      *
      * @param string $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update($uuid, $request){
          return $request;

          $request->validate([
               "title"    => "required",
              
           ]);
           
          $shop = $this->getByUuid($uuid);
          $shop->update($request);
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

     public function getSlider($limit=null)
     {
         if($limit!=null){
               return $this->model::where('status',1)->latest()->get();
          }else{
               return $this->model::where('status',1)->latest()->limit($limit)->get();
          }
     }
}
