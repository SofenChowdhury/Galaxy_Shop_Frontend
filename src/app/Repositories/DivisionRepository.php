<?php
namespace App\Repositories;

use App\Models\Division;
use Mahabub\CrudGenerator\Contracts\BaseRepository;

class DivisionRepository implements BaseRepository{

     protected  $model;
     
     public function __construct(Division $model)
     {
        $this->model = $model;
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

     
    public function getByCode($company_code){
        return $this->model::where('company_code', $company_code)->first();
   } 

     /**
     * resource create
     * @param  $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){
          $company = $this->model;
          $company->updateOrCreate($request);
          return $company;
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param  $request
      * @return \Illuminate\Http\Response
      */

     public function update($uuid, $request){
          $company = $this->model->where('uuid', $uuid)->update($request);
          return $company;
          // $company->update($request);
     } 
        
     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function delete($uuid){
       return $this->getByUuid($uuid)->delete();
     }

}
