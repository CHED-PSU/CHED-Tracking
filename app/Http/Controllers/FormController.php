<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormController extends Controller
{
    //notification Area
        //notification Items
        public function getNotificationItems(Request $request){
            $NotificationItems = DB::table('users_notification as un')
            ->select('un.description','u.firstname','u.surname','un.created_at','un.ns_id','un.np_id','t.id')
            ->join('trackings as t', 'un.trackings_id','=','t.id')
            ->join('users as u', 't.issued_by','=','u.id')
            ->where('t.received_by',$request->input('id'))
            ->get();


            return response()->json([
                'data' => $NotificationItems
            ]);
        }

        //notification form details
        public function getFormDetails(Request $req){
            $form_details = DB::table('trackings as t')
            ->select('u1.firstname as u1name','u1.surname as u1surname','u1.designation as u1designation','r1.name as u1role','u2.firstname as u2name','u2.surname as u2surname','u2.designation as u2designation','r2.name as u2role','t.assign_no')
            ->join('users as u1','u1.id','=','t.issued_by')
            ->join('users as u2','u2.id','=','t.received_by')
            ->join('roles as r1','r1.id','=','u1.role_id')
            ->join('roles as r2','r2.id','=','u2.role_id')
            ->where('t.id',$req->input('listId'))
            ->first();

            $confirmation = DB::table('users_notification')
            ->select('confirmation')
            ->where('trackings_id',$req->input('listId'))
            ->first();

            return response()->json(['form_details' => $form_details, 'confirmation'=> $confirmation]);
        }

    
}
