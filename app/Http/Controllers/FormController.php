<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormController extends Controller
{   
    //User Area
        //notification Area
            //notification Items
            public function getNotificationItems(Request $request){
                $NotificationItems = DB::table('users_notification as un')
                ->select('un.description','u.firstname','u.surname','un.created_at','un.ns_id','un.np_id','t.id')
                ->join('trackings as t', 'un.trackings_id','=','t.id')
                ->join('users as u', 't.issued_by','=','u.id')
                ->where('t.received_by',$request->input('id'))
                ->where('un.confirmation','TBD')
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

            //accept and decline form from notificiation

            public function acceptIssuedForm(Request $req){

                $getItems = DB::table('trackings as t')
                ->select('it.id')
                ->join('inventory_tracking as it', 'it.tracking_id','=','t.id')
                ->where('t.id',$req->input('listId'))
                ->get();

                
                $user_item_data = [];

                foreach($getItems as $item){
                    $temp_date = [
                        'inventory_id'          => $item->inventory_id,
                        'item_status'           => 'owned',
                        'tracking_id'           => $req->input('listId')
                    ];

                    array_push($user_item_data, $temp_date);
                }
                DB::table('user_items')->insert($user_item_data);

                $acceptIssuedForm = DB::table('users_notification')
                ->where('trackings_id',$req->input('listId'))
                ->update(['confirmation' => 'accepted', 'ns_id'=>1]);

                $data = [
                    'trackings_id' => $req->input('listId'),
                    'user_id'      => $req->input('user_id'),
                    'ns_id'        => 2,
                    'np_id'        => 2,
                    'description'  => 'has accepted the issued Form',
                ];

                $insert_AN = DB::table('admin_notification')
                ->insert($data);
            }

            public function declineIssuedForm(Request $req){
                $acceptIssuedForm = DB::table('users_notification')
                ->where('trackings_id',$req->input('listId'))
                ->update(['confirmation' => 'declined', 'ns_id'=>1]);

                $data = [
                    'trackings_id' => $req->input('listId'),
                    'user_id'      => $req->input('user_id'),
                    'ns_id'        => 2,
                    'np_id'        => 3,
                    'description'  => 'has declined the issued Form',
                ];

                $insert_AN = DB::table('admin_notification')
                ->insert($data);
            }


        //Home Area
            
            //Recent Issuance
            public function HomeData(Request $req){
                $recentIssuance = DB::table('trackings')
                ->select('users.firstname','trackings.assign_no','trackings.created_at')
                ->join('users','users.id','=','trackings.issued_by')
                ->where('received_by', $req->input('user_id'))
                ->get();

                $getTotalItems = DB::table('trackings as t')
                ->join('users_notification as un','t.id','=','un.trackings_id')
                ->join('inventory_tracking as it','it.tracking_id','=','t.id')
                ->where('t.received_by',$req->input('user_id'))
                ->where('un.confirmation','accepted')
                ->count();

                return response()->json(['recentIssuance'=>$recentIssuance,'numberOFItems'=>$getTotalItems]);
            }

        //Logs Area

            //ICS Table
            public function getICS(Request $request)
            {
                $subQuery = DB::table('inventory_tracking as it')->select(DB::raw("SUM(in.price * it.quantity) as total"), 'it.tracking_id')->join('iar_inventory as in', 'in.inventory_id', '=', 'it.inventory_id')->groupBy('it.tracking_id');
                $result = DB::table('trackings as t')
                    ->joinSub($subQuery, 'subData', function ($join) {
                        $join->on('t.id', '=', 'subData.tracking_id');
                    })
                    ->where('t.received_by', $request->input('user_id'))
                    ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
                    ->where('ui.description', 'ICS')
                    ->where('ui.confirmation', 'accepted')
                    // ->groupBy('t.id')
                    ->get();
                    
                    
        
                return response()->json([
                    'allICS' => $result
                ]);
            }

            public function getPAR(Request $request)
            {
                $subQuery = DB::table('inventory_tracking as it')->select(DB::raw("SUM(in.price * it.quantity) as total"), 'it.tracking_id')->join('iar_inventory as in', 'in.inventory_id', '=', 'it.inventory_id')->groupBy('it.tracking_id');
                $result = DB::table('trackings as t')
                    ->joinSub($subQuery, 'subData', function ($join) {
                        $join->on('t.id', '=', 'subData.tracking_id');
                    })
                    ->where('t.received_by', $request->input('user_id'))
                    ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
                    ->where('ui.description', 'PAR')
                    ->where('ui.confirmation', 'accepted')
                    // ->groupBy('t.id')
                    ->get();
                    
                    
        
                return response()->json([
                    'allPAR' => $result
                ]);
            }

            public function getIndividualItems(Request $req){
                $items = DB::table('trackings as t')
                // ->select('ui.ui_id','it.quantity as qty','i.unit','ia.price as amount','i.description','i.property_no as code','it.eul','i.article','ui.item_status as remarks','it.id')
                // ->join('inventory_tracking as it','it.tracking_id','=','t.id')
                // ->join('inventories as i','i.id','=','it.inventory_id')
                // ->join('iar_inventory as ia','ia.inventory_id','=','it.inventory_id')
                ->join('user_items as ui','ui.tracking_id','=','t.id')
                ->where('t.received_by',$req->input('user_id'))
                ->where('ui.item_status','owned')
                ->get();

                return response()->json(['allIndivItems'=>$items]);
            }

    
}
