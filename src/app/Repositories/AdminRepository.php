<?php
namespace App\Repositories;

use App\Classes\FileUpload;
use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Mahabub\CrudGenerator\Contracts\BaseRepository;
use Spatie\Permission\Traits\HasRoles;

class AdminRepository implements BaseRepository{
   
     protected  $model;
     protected  $file;
     
     public function __construct(Admin $model, FileUpload $file)
     {
        $this->model = $model;
        $this->file = $file;
     }

     /**
      * all resource get
      * @return Collection
      */
     public function getAll(){
         return $this->model::with('roles')->get();
     }
     
     /**
     *  specified resource get .
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function getById(int $id){
          return $this->model::with('roles')->find($id);
     }   

     /**
     * resource create
     * @param $request
     * @return \Illuminate\Http\Response
     */

     public function create($request){   
          try {
               $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|string|email|max:255|unique:admins',
                    'phone' => 'required|string|max:11|unique:admins',
                    'password' => ['required', 'confirmed'],
               ]); 
               $admin = $this->model;          
               $admin->name = $request->name;
               $admin->uuid = Str::uuid();
               $admin->email = $request->email;
               $admin->phone = $request->phone;
               $admin->company_id = $request->company_id;
               $admin->password = Hash::make($request->password);
               $admin->status = $request->status;
               $admin->save();
               $admin->assignRole($request->admin_roles);
               return $admin;
          } catch (\Throwable $th) {
               dd($th->getMessage());
          }
          
     }  

    /**
      * specified resource update
      *
      * @param int $id
      * @param $request
      * @return \Illuminate\Http\Response
      */

     public function update( int $id, $request){
          $admin= $this->getById($id);
          $request->validate([
               'name' => 'required|string|max:255',
               'email' => 'required|unique:admins,email,'.$admin->id ,
               'phone' => 'required|max:11|unique:admins,phone,'.$admin->id,
               
          ]);

          $admin= $this->getById($id);
          $admin->name = $request->name;
          $admin->email = $request->email;
          $admin->phone = $request->phone;
          $admin->status = $request->status;
          $admin->company_id = $request->company_id;
          $admin->company_id = $request->company_id;
          $admin->update();
          $admin->syncRoles([$request->role_id]);
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

     public function changePassword(int $id, $request)
     {
          $request->validate([
               'password' => 'required|confirmed|min:8'
          ]);
          // return $request->all();
          $admin= $this->getById($id);
          $admin->password = Hash::make($request->password);
          $admin->update();
     }

     public function updateProfile($request)
     {
          $user = auth()->user();
          $request->validate([
               'name' => 'required',
               'title' => 'required',
               'phone' => 'required'
          ]);
          // return $request->all();
          $admin = $this->getById($user->id);
          $admin->name = $request->name;
          $admin->phone = $request->phone;
          $admin->title = $request->title;
          $photo= $this->file->uploadFile($request, $fieldname="picture" ,$file=$admin->photo,$folder="admin/profile");
          $admin->photo = $photo?  $photo: $admin->photo;
          $admin->update();
     }
}
