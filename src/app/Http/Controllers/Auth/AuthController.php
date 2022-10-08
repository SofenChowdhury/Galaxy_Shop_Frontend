<?php
namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Classes\SmsSender;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','store','sendingOtp','me']]);
    }
    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $validator= Validator::make($request->all(),[
            'email'=>'required',
            'password'=>['required'],
        ]);
   
        if($validator->fails()){
            return response()->json(['status' =>false ,'message' =>$validator->errors()->first()]);
        }
        $credentials = $request->only('email', 'password');

        if ($token = $this->guard()->attempt($credentials)) {
           $user = User::where('id', $this->guard()->user()->id)->first();
           if(empty($user->shop_id)){
                $this->guard()->logout();
                return response()->json(['status' =>false ,'message' => "Your account is not activated yet, please contact with administrator"]);
            }
           $user->update();
            return $this->respondWithToken($token);
        }
        return response()->json(['status'=>false,'message' =>'Your credential dose not match']);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {

        try {
            if($this->guard()->user() !=""){
                return response()->json([
                    'status'=>true, 
                    'user'=>$this->guard()->user()
                ]);
            }else{
                return response()->json([
                    'status'=>false, 
                    'message'=>"Unauthorized"
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status'=>false, 
                'message'=>"Unauthorized"
            ]);
        }
       
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();
        return response()->json([
            'status' =>true,
            'message' => 'Successfully logged out'
        
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validator= Validator::make($request->all(),[
            'name'=>'required',
            'email'=>'required|unique:users',
            'phone'=>'required|unique:users',
            'password'=>['required','confirmed'],
        ]);
        if($validator->fails()){
            return response()->json(['status' =>false ,'message' =>$validator->errors()->first()]);
        }
        User::create([
            'uuid' => Str::uuid(),
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);
        $credentials = $request->only('email', 'password');

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return response()->json([ 'status'=>false , 'message' => 'Unauthorized']);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60000,
            'status' => true,
            'message'=>'Login has been Successfully',
            'user' => $this->guard()->user()
        ]);
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
}
