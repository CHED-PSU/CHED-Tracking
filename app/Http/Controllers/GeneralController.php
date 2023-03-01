<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeneralController extends Controller
{
    //User Pending
    public function getPendingAcceptedRequests(Request $req){
        $pendingCount = DB::table('user_returned_items')
        ->where('confirmation','pending')
        ->count();

        $acceptedCount = DB::table('user_returned_items')
        ->where('confirmation','accepted')
        ->count();

        return response()->json(['pending'=> $pendingCount,'accepted'=>$acceptedCount]);
    }

    //Admin Dashboard
    public function getAdminDashboardData(Request $req){
        $totalUsers = DB::table('users')
        ->count();

        $recentIssuance = DB::table('trackings as t')
        ->select('t.tracking_id','u1.firstname as ufirstname','u1.surname as uSurname','t.date_received','u2.firstname as rfirstname','u2.surname as rSurname')
        ->join('users as u1','u1.id','=','t.issued_by')
        ->join('users as u2','u2.id','=','t.received_by')
        ->get();

        $countDonated = 1;
        // $countDonated = DB::table('unserviceable_items')
        // ->select('unserviceable_status')
        // ->where('unserviceable_status', 1)
        // ->count();

        $countDestructed = 4;
        // $countDestructed = DB::table('unserviceable_items')
        // ->select('unserviceable_status')
        // ->where('unserviceable_status', 2)
        // ->count();

        $countSold = 3;
        // $countSold = DB::table('unserviceable_items')
        // ->select('unserviceable_status')
        // ->where('unserviceable_status', 3)
        // ->count();

        return response()->json(['total_users'=>$totalUsers,'recent_issuance' => $recentIssuance, 'countDonated'=>$countDonated, 'countDestructed'=>$countDestructed, 'countSold'=>$countSold]);
    }

    //Admin Logs
        //Admin User Data Fetcher
            public function getUserLists(){
                $userList = DB::table('users')
                ->select('users.firstname','users.surname','users.designation','r.name','users.id','users.designation')
                ->join('roles as r','r.id','=','users.role_id')
                ->where('deleted_at',null)
                ->get();

                return response()->json(['user_lists' => $userList]);
            }
    //admin return items
        //admin user fetcher
            public function getUsers(){
                $getUsers = DB::table('users')
                ->where('deleted_at',null)
                ->get();

                return response()->json(['users' =>$getUsers]);
            }
}
