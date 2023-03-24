<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GeneralController extends Controller
{
    //User Pending
    public function getPendingAcceptedRequests(Request $req)
    {
        $pendingCount = DB::table('user_returned_items')
            ->where('confirmation', 'pending')
            ->count();

        $acceptedCount = DB::table('user_returned_items')
            ->where('confirmation', 'accepted')
            ->count();

        return response()->json(['pending' => $pendingCount, 'accepted' => $acceptedCount]);
    }

    public function getPendingAcceptedRequestsById(Request $req)
    {
        $pendingCount = DB::table('user_returned_items as uri')
            ->where('uri.user_id', $req->input('id'))
            ->where('uri.confirmation', 'pending')
            ->count();

        $acceptedCount = DB::table('user_returned_items as uri')
        ->where('uri.user_id', $req->input('id'))
        ->where('uri.confirmation', 'accepted')
            ->count();

        return response()->json(['pending' => $pendingCount, 'accepted' => $acceptedCount]);
    }

    //Admin Dashboard
    public function getAdminDashboardData(Request $req)
    {
        $totalUsers = DB::table('users')
            ->count();

        $recentIssuance = DB::table('trackings as t')
            ->select('t.tracking_id', 'u1.firstname as ufirstname', 'u2.id as rID' ,'u1.id as uID' ,'u1.surname as uSurname','u1.suffix as uSuffix', 't.created_at', 'u2.firstname as rfirstname', 'u2.surname as rSurname', 'u2.suffix as rSuffix',)
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
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

        return response()->json(['total_users' => $totalUsers, 'recent_issuance' => $recentIssuance, 'countDonated' => $countDonated, 'countDestructed' => $countDestructed, 'countSold' => $countSold]);
    }

    //Admin Logs
    //Admin User Data Fetcher
    public function getUserLists()
    {
        $userList = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'r.name', 'users.id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->get();

        return response()->json(['user_lists' => $userList]);
    }
    //admin return items
    //admin user fetcher
    public function getUsers()
    {
        $getUsers = DB::table('users')
            ->where('deleted_at', null)
            ->get();

        return response()->json(['users' => $getUsers]);
    }

    public function getUsersById(Request $req)
    {
        $getUsers = DB::table('users')
            ->where('id', $req->input('id'))
            ->first();

        return response()->json(['users' => $getUsers]);
    }

    public function getUnread(Request $req){
        $count = DB::table('users_notification')
        ->where('to_user_id',$req->input('id'))
        ->count();

        if($count > 0) {
            return response()->json(['read' => true]);
        }else{
            return response()->json(['read' => false]);
        }


    }
}
