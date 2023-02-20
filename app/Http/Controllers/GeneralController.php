<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeneralController extends Controller
{
    public function getPendingAcceptedRequests(Request $req){
        $pendingCount = DB::table('user_returned_items')
        ->where('confirmation','Pending')
        ->where('user_id',$req->input('user_id'))
        ->count();

        $acceptedCount = DB::table('user_returned_items')
        ->where('confirmation','Accepted')
        ->where('user_id',$req->input('user_id'))
        ->count();

        return response()->json(['pending'=> $pendingCount,'accepted'=>$acceptedCount]);
    }
}
