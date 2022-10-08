<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Classes\FileUpload;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //
       protected $file;

      public function __construct(FileUpload $fileUpload)
      {
           $this->file= $fileUpload;
      }
       
    public function userChangePhoto( Request $request)
    {
         
        $user = User::where('id', $this->guard()->user()->id)->first();

         try {
          
           $profilePhoto=  $this->file->uploadFile($request, $fieldname="photo", $file=$user->photo, $folder="profiles");
            $user->photo= $profilePhoto ? $profilePhoto: $user->photo;
            $user->update();  
            return response()->json([
                "status" => true,
                "message" => "User profile change successfully",
                "photo"=>$user->photo
            ]);
           } catch (\Throwable $th) {
               return response()->json([
                   "status" => false,
                   'message'=>"image uploaded fail"
               ]);
           }
    }

    public function userProfileUpdate(Request $request)
    {
        try {

            $token = JWTAuth::getToken();
            if($token!=""){
               $user = User::where('id', $this->guard()->user()->id)->first();

                if($request->photo !=""){

                    $validator= Validator::make($request->all(),[
                        'name'=>'required',
                        'photo'=>'required|mimes:png,jpg',
                    ]);
        
                    if($validator->fails()){
        
                        return response()->json([
                            'status' =>false ,
                            'message' =>$validator->errors()->first()
                        ]);
                    }

                }else{
                    $validator= Validator::make($request->all(),[
                        'name'=>'required',
                    ]);
        
                    if($validator->fails()){
        
                        return response()->json([
                            'status' =>false ,
                            'message' =>$validator->errors()->first()
                        ]);
                    }
                }

            
                $profilePhoto=  $this->file->uploadFile($request, $fieldname="photo", $file=$user->photo, $folder="profiles");
                $user->name=$request->name;
                $user->photo= $profilePhoto ? $profilePhoto: $user->photo;
                $user->update();
                return response()->json([
                    "status" => true,
                    "message" => "User profile change successfully",
                    "user"=>$user
                ]);

            }else{
                return response()->json([
                    "status" => false,
                    'message'=>"Unauthorized"
                ]);                    
               
            }



        } catch (\Throwable $th) {    
            return response()->json([
                "status" => false,
                'message'=>"image uploaded fail"
            ]);                    
           
        }

    }






      /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard('api');
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\ChangPassword
     */
    public function changePassword(Request $request)
    {
        // return $request->all();
        $token = JWTAuth::getToken();
        if($token!=""){
            $validator= Validator::make($request->all(),[
                'password' => 'required|confirmed|min:8',
            ]);
            if($validator->fails()){
                return response()->json(['status' =>false ,'message' =>$validator->errors()->first()]);
            }

            $user = User::where('id', $this->guard()->user()->id)->first();
            $user->password = Hash::make($request->password);
            $user->update();
            return response()->json([
                "status" => true,
                "message" => "User password change successfully",
                "user"=>$user
            ]);
        }else{
            return response()->json([
                "status" => false,
                'message'=>"Unauthorized"
            ]);                    
            
        }
        
    }

}
