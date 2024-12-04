<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
     //fja za registraciju
     public function register(Request $request)
     {
         $validator=Validator::make($request->all(),[
             'name'=>'required|string',
             'email'=>'required|string|email|unique:users',
             'password'=>'required|string'
         ]);
 
         if($validator->fails()){
             return response()->json($validator->errors());
         }
 
         $user=User::create([
             'name'=>$request->name,
             'email'=>$request->email,
             'password'=>Hash::make($request->password)
         ]);
 
         $token=$user->createToken('auth_token')->plainTextToken;
         
         return response()->json([
             'Poruka' => 'Uspesna registracija!',
             'user'=>$user,
             'access_token' => $token,
             'token_type' => 'Bearer',
         ]);
     }
 
     //fja za logovanje na app
     public function login(Request $request)
     {
         $validator = Validator::make($request->all(), [
             'email' => 'required|email',
             'password' => 'required|string',
         ]);
 
         if ($validator->fails()) {
             return response()->json(['Error:', $validator->errors()]);
         }
 
         if(!Auth::attempt($request->only('email','password'))){
             return response()->json(['Poruka'=>'Parametri za prijavu su pogrseni. Pokusajte ponovo.'], 401);
         }
 
         $user = User::where('email', $request['email']) -> firstOrFail();
 
         $token = $user->createToken('auth_token')->plainTextToken;
 
         return response()->json([
             'Poruka' => 'Hello, ' . $user->name . ' Uspesna prijava, dobrodosli!',
             'access_token' => $token,
             'token_type' => 'Bearer',
             'is_admin' => $user->is_admin,
             'user_id' => $user->id,
         ]);
     }
 
     //fja za logout
     public function logout(Request $request)
     {
         $request->user()->tokens()->delete();
         return response()->json(['Poruka'=> 'Uspesno ste se odjavili sa aplikacije.']);
     }
}
