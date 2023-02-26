<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request){
        // var_dump($request->input('data'));
        $data = $request->input('data');

        $validate = DB::table('users')->where('username', $data['username'])->first();

        if($validate === null){
            $response = [
                'Authenticated' => 'Username not found.',
            ];

            return response()->json($response);
        }else{
            if(Hash::check($data['password'], $validate->password)){
                $roles = DB::table('roles')->select('name')->where('id', $validate->role_id)->first();
                $userDestination = "";
                if($roles->name == 'Requestor'){
                    $userDestination= '/user';
                }else if($roles->name == 'Inventory Custodian'){
                    $userDestination= '/admin';
                }
                session()->regenerate();
                session()->put('name',$validate->firstname );
                session()->put('role', $roles);
                session()->put('user_id', $validate->id);

                $response = [
                    'status' => 200,
                    'message' =>'Successfuly logged in.',
                    'destinations' => $userDestination,
                    'Authenticated' => 'true',
                    'name' => $validate->firstname . ' ' . $validate->surname,
                    'role' => $roles->name,
                    'id'   => $validate->id
                ];

                return response()->json($response);

            }else{
                $response = [
                    'Authenticated' => 'Password is incorrect.',
                ];
                return response()->json($response);
            }
        }
    }
}
