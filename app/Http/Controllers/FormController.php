<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormController extends Controller
{
    //notification Area
    public function getNotificationItems(Request $request){
        $NotificationItems = DB::table('users_notification as un')
        ->select('un.description','u.firstname','u.surname','un.created_at','un.ns_id')
        ->join('trackings as t', 'un.trackings_id','=','t.id')
        ->join('users as u', 't.issued_by','=','u.id')
        ->get();


        return response()->json([
            'data' => $NotificationItems
        ]);
    }
}
