<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    //User Area
        //User notification area
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

        //User Items Area
            //User Items Fetcher
            public function getuserIndividualItems(Request $req){
                $getUserItems = DB::table('trackings as t')
                ->select('i.article','i.description','un.created_at','it.id')
                ->join('inventory_tracking as it','t.id','=','it.tracking_id')
                ->join('users_notification as un','un.trackings_id','=','t.id')
                ->join('inventories as i','it.inventory_id','=','i.id')
                ->where('t.received_by',$req->input('user_id'))
                ->where('un.confirmation','accepted')
                ->whereNot('i.property_id',1)
                ->get();
                
                return response()->json(['itemsData'=>$getUserItems]);
            }

            //User Items Data Fetcher
            public function getItemRequestData(Request $req){
                $getUserItemsData = DB::table('inventory_tracking as it')
                ->select('')
                ->join('trackings as t','t.id','it.tracking_id')
                ->join('user_items as ui','it.inventory_id','=','ui.inventory_id')
                ->join('inventories as i','i.id','=','it.inventory_id')
                ->where('it.id',$req->input('it_id'))
                ->first();
                
                var_dump($getUserItemsData);
            }
}
