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
                $getUserItems = DB::table('user_items as ui')
                ->select('i.article','i.description','ui.created_at')
                ->join('trackings as t','t.id','=','ui.tracking_id')
                // ->join('inventory_tracking as it','it.tracking_id','=','t.id')
                ->join('inventories as i','i.id','=','ui.inventory_id')
                ->where('t.received_by',$req->input('user_id'))
                ->where('ui.item_status','owned')
                ->get();
                
                return response()->json(['itemsData'=>$getUserItems]);
            }

            //User Items Data Fetcher
            public function getItemRequestData(Request $req){
                $getUserItemsData = DB::table('inventory_tracking as it')
                ->select('ty.abbr as type','i.description as brand','i.property_no','it.id','ia.price')
                ->join('trackings as t','t.id','it.tracking_id')
                ->join('user_items as ui','it.inventory_id','=','ui.inventory_id')
                ->join('inventories as i','i.id','=','it.inventory_id')
                ->join('types as ty','ty.id','=','i.type_id')
                ->join('iar_inventory as ia','ia.inventory_id','=','it.inventory_id')
                ->where('it.id',$req->input('it_id'))
                ->first();
                
                return response()->json([
                    'itemData'=>$getUserItemsData
                ]);
            }

            public function returnItemsToAdmin(Request $req){
                $returned_items = DB::table('user_returned_items')
                ->insertGetId([
                    'inventory_tracking_id' => $req->input('data')['inventory_tracking_id'],
                    'defect' => $req->input('data')['defect'],
                    'status' => $req->input('data')['reason'],
                    'confirmation' => 'Pending'
                ]);

                DB::table('user_items as ui')
                ->join('inventory_tracking as it','it.inventory_id','=','ui.inventory_id')
                ->where('it.id',$req->input('data')['inventory_tracking_id'])
                ->update([
                    'item_status' => 'Requested to be return'
                ]);

                DB::table('admin_notification')->insert([
                    'user_returned_items_id' => $returned_items,
                    'ns_id' => 2,
                    'np_id' => 4,
                    'confirmation' => 'Pending',
                    'description'  => 'has requested to return an item'
                ]);

            }
}
