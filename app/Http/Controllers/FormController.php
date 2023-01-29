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
                ->select('it.inventory_id')
                ->join('inventory_tracking as it', 'it.tracking_id','=','t.id')
                ->where('t.id',$req->input('listId'))
                ->get();

                
                $user_item_data = [];

                foreach($getItems as $item){
                    $temp_date = [
                        'inventory_id' => $item->inventory_id,
                        'item_status'           => 'owned'
                    ];

                    array_push($user_item_data, $temp_date);
                }
                DB::table('user_items')->insert($user_item_data);

                $acceptIssuedForm = DB::table('users_notification')
                ->where('trackings_id',$req->input('listId'))
                ->update(['confirmation' => 'accepted', 'ns_id'=>1]);

                $data = [
                    'trackings_id' => $req->input('listId'),
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


    
}
