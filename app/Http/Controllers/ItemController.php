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
                ->select('i.article','i.description','ui.created_at','ui.ui_id')
                ->join('trackings as t','t.id','=','ui.tracking_id')
                ->join('inventory_tracking as it','it.id','=','ui.inventory_tracking_id')
                ->join('inventories as i','i.id','=','it.inventory_id')
                ->where('t.received_by',$req->input('user_id'))
                ->where('ui.item_status','owned')
                ->get();




                return response()->json(['itemsData'=>$getUserItems]);
            }

            //User Items Data Fetcher
            public function getItemRequestData(Request $req){
                $getUserItemsData = DB::table('user_items as ui as ui')
                ->select('ty.abbr as type','i.description as brand','i.property_no','ui.ui_id','ia.price')
                ->join('inventory_tracking as it','it.id','=','ui.inventory_tracking_id')
                ->join('trackings as t','t.id','it.tracking_id')
                ->join('inventories as i','i.id','=','it.inventory_id')
                ->join('types as ty','ty.id','=','i.type_id')
                ->join('iar_inventory as ia','ia.inventory_id','=','it.inventory_id')
                ->where('ui_id',$req->input('ui_id'))
                ->first();

                // var_dump($getUserItemsData);
                return response()->json([
                    'itemData'=>$getUserItemsData
                ]);
            }

            public function returnItemsToAdmin(Request $req){

                $returned_items = DB::table('user_returned_items')
                ->insertGetId([
                    'ui_id' => $req->input('data')['ui_id'],
                    'user_id' => $req->input('user_id'),
                    'defect' => $req->input('data')['defect'],
                    'status' => $req->input('data')['reason'],
                    'confirmation' => 'Pending'
                ]);

                DB::table('user_items as ui')
                ->where('ui.ui_id',$req->input('data')['ui_id'])
                ->update([
                    'item_status' => 'Requested to be return'
                ]);

                DB::table('admin_notification')->insert([
                    'user_returned_items_id' => $returned_items,
                    'user_id'      => $req->input('user_id'),
                    'ns_id' => 2,
                    'np_id' => 4,
                    'confirmation' => 'Pending',
                    'description'  => 'has requested to return an item'
                ]);

                return response()->json(['success' => 'success']);

            }

    //Admin Area
        //Pending Items Fetcher
            public function getPendingitems(Request $req){
                $getPendingItems = DB::table('user_returned_items as uri')
                ->select('i.article','i.description','uri.uri_id','ia.price','uri.created_at','uri.defect','t.assign_no')
                ->join('user_items as ui','ui.ui_id','=','uri.ui_id')
                ->join('inventory_tracking as it','it.id','=','ui.inventory_tracking_id')
                ->join('inventories as i','i.id','=','it.inventory_id')
                ->join('iar_inventory as ia','ia.inventory_id','=','i.id')
                ->join('trackings as t','t.id','=','it.tracking_id')
                ->where('uri.confirmation','pending')
                ->get();

                return response()->json(['pending_items' => $getPendingItems]);
            }

        //Returned Items Fetcher
            public function getReturnedItems(){
                $returnedItems = DB::table('user_returned_items as uri')
                ->select('uri.uri_id','i.article','uri.created_at','uri.defect','u.firstname','u.surname','uri.status','u.id')
                ->join('user_items as ui','ui.ui_id','=','uri.ui_id')
                ->join('inventory_tracking as it','it.id','=','ui.inventory_tracking_id')
                ->join('inventories as i','i.id','=','it.inventory_id')
                ->join('users as u','u.id','=','uri.user_id')
                ->where('uri.confirmation','accepted')
                ->get();

                return response()->json(['returnedItems' => $returnedItems]);
            }

            //returned Items Data Fetcher
                public function getAdminReturnedItemsData(Request $req){
                    $getAdminReturnedItemsData = DB::table('user_returned_items as uri')
                    ->select('req.designation as reqD','rec.designation as recD','t.abbr','ia.price','i.article','i.property_no','uri.defect','req.firstname as reqF','req.surname as reqS','rec.firstname as recF','rec.surname as recS','uri.created_at', 'uri.uri_id')
                    ->join('user_items as ui','ui.ui_id','=','uri.ui_id')
                    ->join('inventory_tracking as it','it.id','=','ui.inventory_tracking_id')
                    ->join('inventories as i','i.id','=','it.inventory_id')
                    ->join('users as req','req.id','=','uri.user_id')
                    ->join('users as rec','rec.id','=','uri.received_by')
                    ->join('types as t','t.id','=','i.type_id')
                    ->join('iar_inventory as ia','ia.inventory_id','=','it.inventory_id')
                    ->where('uri.uri_id', $req->input('id'))
                    ->get();

                    $getAdminReturnedItemsInfo = DB::table('returned_items_info as rii')
                    ->where('uri_id', $req->input('id'))
                    ->first();

                    $getUsers = DB::table('users')
                    ->where('deleted_at',null)
                    ->get();

                    return response()->json(['adminReturnedItemsData' => $getAdminReturnedItemsData, 'adminReturnedItemsInfo' => $getAdminReturnedItemsInfo, 'users' => $getUsers]);
                }
            //return items pre save
                public function returnItemsPreSave(Request $req){
                    DB::table('returned_items_info')
                    ->where('uri_id',$req->input('id'))
                    ->update($req->input('data'));
                }
            //return items post save
            public function returnItemsPostSave(Request $req){
                DB::table('returned_items_info')
                ->where('uri_id',$req->input('id'))
                ->update($req->input('data'));
            }

            //return  item change status
            public function returnedItemsChangeStatus(Request $req){
                DB::table('user_returned_items')
                ->where('uri_id',$req->input('id'))
                ->update($req->input('data'));
            }


}
