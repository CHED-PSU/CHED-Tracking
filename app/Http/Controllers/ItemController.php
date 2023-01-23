<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    public function getNotifSecListItems(Request $req){ 

        $items = DB::table('users_notification as un')
        ->select('it.quantity','it.eul','i.description','i.article as unit','i.property_no as inventory_no','i.id')
        ->join('trackings as t','un.trackings_id','=','t.id')
        ->where('un.trackings_id',$req->input('listId'))
        ->join('inventory_tracking as it','it.tracking_id','=','t.id')
        ->join('inventories as i', 'i.id', '=','it.inventory_id')
        ->get();

        return response()->json(['items' => $items]);
    }
}
