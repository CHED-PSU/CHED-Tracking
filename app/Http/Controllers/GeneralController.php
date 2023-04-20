<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\PersonalAccessToken;

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

        $getdata = DB::table('test_data')
            ->limit(12)
            ->orderBy('year', 'desc')
            ->get();

        $recentIssuance = DB::table('trackings as t')
            ->select('t.tracking_id', 'u1.firstname as ufirstname', 'u2.id as rID', 'u1.id as uID', 'u1.surname as uSurname', 'u1.suffix as uSuffix', 't.created_at', 'u2.img as rImg', 'u2.firstname as rfirstname', 'u2.surname as rSurname', 'u2.suffix as rSuffix',)
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->orderBy('t.created_at', 'DESC')
            ->get();

        $countDonated = DB::table('unserviceable_items')
            ->select('status')
            ->where('status', 'donated')
            ->count();

        $countDestructed = DB::table('unserviceable_items')
            ->select('status')
            ->where('status', 'destructed')
            ->count();

        $countSold = DB::table('unserviceable_items')
            ->select('status')
            ->where('status', 'sold')
            ->count();

        $pendingCount = DB::table('user_returned_items')
            ->where('confirmation', 'pending')
            ->count();

        $acceptedCount = DB::table('user_returned_items')
            ->where('confirmation', 'accepted')
            ->count();


        return response()->json(['data' => $getdata, 'pending' => $pendingCount, 'accepted' => $acceptedCount, 'total_users' => $totalUsers, 'recent_issuance' => $recentIssuance, 'countDonated' => $countDonated, 'countDestructed' => $countDestructed, 'countSold' => $countSold]);
    }

    //Admin Logs
    //Admin User Data Fetcher
    public function getUserLists()
    {
        $userList = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'users.role_id', 'r.name', 'users.id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->get();

        $userListJO = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'users.role_id', 'r.name', 'users.id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->where('users.role_id', 5)
            ->get();
        return response()->json(['user_lists' => $userList, 'user_lists_jo' => $userListJO]);
    }
    public function getUserListsICS()
    {
        $userList = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'users.role_id', 'r.name', 'users.id as id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->get();

        $totalPrices = [];

        foreach ($userList as $user) {
            $subQuery = DB::table('inventory_trackings as it')
                ->select(DB::raw("SUM(pri.price * 1) as total"), 'it.trackings_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->groupBy('it.trackings_id');

            $result = DB::table('trackings as t')
                ->joinSub($subQuery, 'subData', function ($join) {
                    $join->on('t.id', '=', 'subData.trackings_id');
                })
                ->where('t.received_by', $user->id)
                ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
                ->where('ui.description', 'ICS')
                ->where('ui.confirmation', 'accepted')
                ->get();

            $totalPrice = 0;

            foreach ($result as $item) {
                $totalPrice += $item->total;
            }

            $totalPrices[$user->id] = $totalPrice;
        }

        return response()->json(['user_lists' => $userList, 'total_price' => $totalPrices]);
    }
    public function getUserListsPAR()
    {
        $userList = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'users.role_id', 'r.name', 'users.id as id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->get();

        $totalPrices = [];

        foreach ($userList as $user) {
            $subQuery = DB::table('inventory_trackings as it')
                ->select(DB::raw("SUM(pri.price * 1) as total"), 'it.trackings_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->groupBy('it.trackings_id');

            $result = DB::table('trackings as t')
                ->joinSub($subQuery, 'subData', function ($join) {
                    $join->on('t.id', '=', 'subData.trackings_id');
                })
                ->where('t.received_by', $user->id)
                ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
                ->where('ui.description', 'PAR')
                ->where('ui.confirmation', 'accepted')
                ->get();

            $totalPrice = 0;

            foreach ($result as $item) {
                $totalPrice += $item->total;
            }

            $totalPrices[$user->id] = $totalPrice;
        }

        return response()->json(['user_lists' => $userList, 'total_price' => $totalPrices]);
    }
    public function getUserListsIIR()
    {
        $userList = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'users.role_id', 'r.name', 'users.id as id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->get();

        $totalPrices = [];

        foreach ($userList as $user) {
            $subQuery = DB::table('inventory_trackings as it')
                ->select(DB::raw("SUM(pri.price * 1) as total"), 'it.trackings_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->groupBy('it.trackings_id');

            $result = DB::table('trackings as t')
                ->joinSub($subQuery, 'subData', function ($join) {
                    $join->on('t.id', '=', 'subData.trackings_id');
                })
                ->where('t.received_by', $user->id)
                ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
                ->where(function ($query) {
                    $query->orWhere('ui.description', 'ICS')
                        ->orWhere('ui.description', 'PAR');
                })
                ->where('ui.confirmation', 'accepted')
                ->get();

            $totalPrice = 0;

            foreach ($result as $item) {
                $totalPrice += $item->total;
            }

            $totalPrices[$user->id] = $totalPrice;
        }

        return response()->json(['user_lists' => $userList, 'total_price' => $totalPrices]);
    }
    public function getUserListsIIC()
    {
        $userList = DB::table('users')
            ->select('users.prefix', 'users.img', 'users.firstname', 'users.middlename', 'users.surname', 'users.suffix', 'users.designation', 'users.role_id', 'r.name', 'users.id as id')
            ->join('roles as r', 'r.id', '=', 'users.role_id')
            ->get();

        $totalPrices = [];

        foreach ($userList as $user) {
            $subQuery = DB::table('inventory_trackings as it')
                ->select(DB::raw("SUM(pri.price * 1) as total"), 'it.trackings_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->groupBy('it.trackings_id');

            $result = DB::table('trackings as t')
                ->joinSub($subQuery, 'subData', function ($join) {
                    $join->on('t.id', '=', 'subData.trackings_id');
                })
                ->where('t.received_by', $user->id)
                ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
                ->where('ui.description', 'ICS')
                ->where('ui.confirmation', 'accepted')
                ->get();

            $totalPrice = 0;

            foreach ($result as $item) {
                $totalPrice += $item->total;
            }

            $totalPrices[$user->id] = $totalPrice;
        }

        return response()->json(['user_lists' => $userList, 'total_price' => $totalPrices]);
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

    public function getUnread(Request $req)
    {
        $count = DB::table('users_notification')
            ->where('to_user_id', $req->input('id'))
            ->where('ns_id', 2)
            ->count();

        if ($count > 0) {
            return response()->json(['read' => true]);
        } else {
            return response()->json(['read' => false]);
        }
    }

    public function getAdminUnread(Request $req)
    {
        $count = DB::table('admin_notification')
            ->where('ns_id', 2)
            ->count();

        if ($count > 0) {
            return response()->json(['read' => true]);
        } else {
            return response()->json(['read' => false]);
        }
    }

    //Logout Delete Token
    public function logoutToken(Request $request)
    {
        $token = PersonalAccessToken::findToken($request->bearerToken());
        session()->forget('name');
        session()->forget('role');
        session()->forget('user_id');

        if ($token) {
            $token->delete();
            return response()->json(['status' => true]);
        } else {
            return response()->json(['status' => false]);
        }
    }
}
