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
    public function getNotificationItems(Request $request)
    {
        $NotificationItems = DB::table('users_notification as un')
            ->select('un.description', 'u.firstname', 'u.surname', 'un.created_at', 'un.ns_id', 'un.np_id', 't.id')
            ->join('trackings as t', 'un.trackings_id', '=', 't.id')
            ->join('users as u', 't.issued_by', '=', 'u.id')
            ->where('t.received_by', $request->input('id'))
            ->where('un.confirmation', 'TBD')
            ->get();


        return response()->json([
            'data' => $NotificationItems
        ]);
    }

    //notification form details
    public function getFormDetails(Request $req)
    {
        $form_details = DB::table('trackings as t')
            ->select('u1.firstname as u1name', 'u1.surname as u1surname', 'u1.designation as u1designation', 'r1.name as u1role', 'u2.firstname as u2name', 'u2.surname as u2surname', 'u2.designation as u2designation', 'r2.name as u2role', 't.tracking_id')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('roles as r1', 'r1.id', '=', 'u1.role_id')
            ->join('roles as r2', 'r2.id', '=', 'u2.role_id')
            ->where('t.id', $req->input('listId'))
            ->first();

        $confirmation = DB::table('users_notification')
            ->select('confirmation')
            ->where('trackings_id', $req->input('listId'))
            ->first();

        return response()->json(['form_details' => $form_details, 'confirmation' => $confirmation]);
    }

    //accept and decline form from notificiation

    public function acceptIssuedForm(Request $req)
    {

        $getItems = DB::table('trackings as t')
            ->select('it.id','pri.quantity')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia','ia.id','=','it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->where('t.id', $req->input('listId'))
            ->get();


        $user_item_data = [];

        foreach ($getItems as $item) {
            $temp_date = [
                'inventory_tracking_id'          => $item->id,
                'item_status'           => 'owned',
                'quantity'              => 1
            ];

            array_push($user_item_data, $temp_date);
        }
        DB::table('user_items')->insert($user_item_data);

        $acceptIssuedForm = DB::table('users_notification')
            ->where('trackings_id', $req->input('listId'))
            ->update(['confirmation' => 'accepted', 'ns_id' => 1]);

        $data = [
            'user_id'      => $req->input('user_id'),
            'ns_id'        => 2,
            'np_id'        => 2,
            'confirmation' => 'report',
            'description'  => 'has accepted the issued Form',
        ];

        $insert_AN = DB::table('admin_notification')
            ->insert($data);
    }

    public function declineIssuedForm(Request $req)
    {
        $acceptIssuedForm = DB::table('users_notification')
            ->where('trackings_id', $req->input('listId'))
            ->update(['confirmation' => 'declined', 'ns_id' => 1]);

        $data = [
            'trackings_id' => $req->input('listId'),
            'user_id'      => $req->input('user_id'),
            'ns_id'        => 2,
            'np_id'        => 3,
            'confirmation' => 'report',
            'description'  => 'has declined the issued Form',
        ];

        $insert_AN = DB::table('admin_notification')
            ->insert($data);
    }


    //Home Area

    //Recent Issuance
    public function HomeData(Request $req)
    {
        $recentIssuance = DB::table('trackings')
            ->select('users.firstname', 'users.surname', 'trackings.tracking_id', 'trackings.created_at')
            ->join('users', 'users.id', '=', 'trackings.issued_by')
            ->where('received_by', $req->input('user_id'))
            ->get();

        $getTotalItems = DB::table('trackings as t')
            ->join('users_notification as un', 't.id', '=', 'un.trackings_id')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->where('t.received_by', $req->input('user_id'))
            ->where('un.confirmation', 'accepted')
            ->where('ui.item_status', 'owned')
            ->count();

        return response()->json(['recentIssuance' => $recentIssuance, 'numberOFItems' => $getTotalItems]);
    }

    //Logs Area

    //ICS Table
    public function getICS(Request $request)
    {
        $subQuery = DB::table('inventory_tracking as it')->select(DB::raw("SUM(pri.price * pri.quantity) as total"), 'it.trackings_id')->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');
        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
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

    //ICS table

    public function getIcsDetails(Request $req)
    {
        $getItems = DB::table('trackings as t')
            ->select('pri.quantity', 'pu.name as unit', 'pri.price', 'pi.description', 'pi.code as property_no','ps.name as article', 'it.eul', 'it.id')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_category_id')
            ->where('t.id', $req->input('id'))
            ->get();

        $getFormDetails = DB::table('trackings as t')
            ->select('t.tracking_id', 'u1.firstname as issuerf','u1.middlename as issuerM', 'u1.surname as issuerS', 'u1.suffix as issuerSuf', 'u2.firstname as receiverf', 'u2.middlename as receiverM', 'u2.surname as receiverS', 'u2.suffix as receiverSuf', 'u1.designation as receiverD', 'u2.designation as issuerD', 't.created_at as issuerDate', 'ui.created_at as receiverDate')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->where('t.id', $req->input('id'))
            ->first();

        $data = [
            'ics_no' => $getFormDetails->tracking_id,
            'issued' => $getFormDetails->issuerf . '  ' . $getFormDetails->issuerS,
            'issuerF' => $getFormDetails->issuerf,
            'issuerM' => $getFormDetails->issuerM,
            'issuerS' => $getFormDetails->issuerS,
            'issuerSuf' => $getFormDetails->issuerSuf,
            'received' => $getFormDetails->receiverf . '  ' . $getFormDetails->receiverS,
            'receiverF' => $getFormDetails->receiverf,
            'receiverM' => $getFormDetails->receiverM,
            'receiverS' => $getFormDetails->receiverS,
            'receiverSuf' => $getFormDetails->receiverSuf,
            'issued_date' => $getFormDetails->issuerDate,
            'received_date'   => $getFormDetails->receiverDate,
            'designation2' => $getFormDetails->issuerD,
            'designation1' => $getFormDetails->receiverD
        ];


        return response()->json(['dataItems' => $getItems, 'form_details' => $data]);
    }

    //PAR Table
    public function getPAR(Request $request)
    {
        $subQuery = DB::table('inventory_tracking as it')->select(DB::raw("SUM(pri.price * it.quantity) as total"), 'it.tracking_id')->join('purchase_request_items as pri', 'pri.id', '=', 'it.purchase_request_item_id')->groupBy('it.tracking_id');
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

    public function getParDetails(Request $req)
    {
        $getItems = DB::table('trackings as t')
            ->select('it.quantity', 'i.unit', 'ia.price', 'i.description', 'i.property_no', 'it.eul', 't.created_at')
            ->join('inventory_tracking as it', 'it.tracking_id', '=', 't.id')
            ->join('inventories as i', 'i.id', '=', 'it.inventory_id')
            ->join('iar_inventory as ia', 'ia.inventory_id', '=', 'it.inventory_id')
            ->join('users_notification as un', 'un.trackings_id', '=', 't.id')
            ->where('t.id', $req->input('id'))
            ->where('un.description', 'PAR')
            ->get();

        $getFormDetails = DB::table('trackings as t')
            ->select('t.assign_no', 'u1.firstname as issuerf', 'u1.surname as issuerS', 'u2.firstname as receiverf', 'u2.surname as receiverS', 'u1.designation as issuerD', 'u2.designation as receiverD', 't.created_at as issuerDate', 'ui.created_at as receiverDate')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('user_items as ui', 'ui.tracking_id', '=', 't.id')
            ->where('t.id', $req->input('id'))
            ->first();

        $data = [
            'ics_no' => $getFormDetails->assign_no,
            'issued' => $getFormDetails->issuerf . '' . $getFormDetails->issuerS,
            'received' => $getFormDetails->receiverf . '' . $getFormDetails->receiverS,
            'issued_date' => $getFormDetails->receiverDate,
            'received_date'   => $getFormDetails->issuerDate,
            'designation2' => $getFormDetails->issuerD,
            'designation1' => $getFormDetails->receiverD
        ];


        return response()->json(['dataItems' => $getItems, 'form_details' => $data]);
    }


    //Inidividual inventory table
    public function getIndividualItems(Request $req)
    {
        $items = DB::table('trackings as t')
            ->select('ui.ui_id', 'u.designation', 'pri.quantity as qty', 'pu.name as unit', 'pri.price as amount', 'pi.description', 'pi.code as code as', 'it.eul', 'ui.item_status as remarks', 'it.id')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia','ia.id','=','it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('t.received_by', $req->input('id'))
            ->where('ui.item_status', 'owned')
            ->get();


        $total_price = 0;

        foreach ($items as $i) {
            $total_price += $i->amount;
        }

        return response()->json(['allIndivItems' => $items, 'total_price' => $total_price]);
    }

    // Pending Requests Area
    public function getPendingRequests(Request $req)
    {
        $getItems = DB::table('user_returned_items as uri')
            ->select('uri.created_at', 'pri.price', 'pi.code as article', 'pi.description', 'uri.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia','ia.id','=','it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('uri.user_id', $req->input('id'))
            ->where('uri.confirmation', 'Pending')
            ->get();

        return response()->json(['data' => $getItems]);
    }


    //Admin Area
    //Notification Area
    //Notification Items
    public function getAdminNotification(Request $req)
    {
        $getAdminNotification = DB::table('admin_notification as an')
            ->select('an.id', 'an.user_id', 'u.prefix', 'u.firstname', 'u.surname', 'u.suffix', 'an.created_at', 'an.description', 'an.ns_id')
            ->join('users as u', 'u.id', '=', 'an.user_id')
            ->orderBy('an.created_at', 'DESC')
            ->get();

        return response()->json(['admin_notification' => $getAdminNotification]);
    }

    public function getAdminRequest(Request $request)
    {
        $getAdminRequest = DB::table('admin_notification as an')
            ->select('an.an_id', 'u.firstname', 'an.created_at', 'an.description', 'an.ns_id')
            ->join('user_returned_items as uri', 'uri.uri_id', '=', 'an.user_returned_items_id')
            ->join('users as u', 'u.id', '=', 'an.user_id')
            ->get();

        return response()->json(['admin_requests' => $getAdminRequest]);
    }
    //Pending Area
    //get pending returned Items Data
    public function getReturnedItemsData(Request $req)
    {
        $getreturnedItemsdata = DB::table('user_returned_items as uri')
            ->select('pu.name as unit', 'pi.description as brand', 'rii.pre_nature as nature', 'rii.updated_at as lastRepair', 'ps.name as article', 'pi.code as property_no', 'pri.price as acquisition', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'uri.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia','ia.id','=','it.item_id')
            ->join('returned_items_info as rii','rii.uri_id','=','uri.uri_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_subcategory_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.uri_id', $req->input('id'))
            ->get();
        return response()->json(['returnedItemsData' => $getreturnedItemsdata]);
    }
    //accept pending request
    public function acceptPendingRequest(Request $req)
    {
        DB::table('user_returned_items as uri')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['confirmation' => 'accepted', 'received_by' => $req->input('user_id')]);

        $user_id = DB::table('user_returned_items as uri')
            ->select('uri.user_id')
            ->where('uri.uri_id', $req->input('id'))
            ->first();


        DB::table('users_notification')
            ->insert([
                'user_id' => $req->input('user_id'),
                'to_user_id' => $user_id->user_id,
                'ns_id'   => 2,
                'np_id'   => 3,
                'confirmation' => 'accepted',
                'description' => 'has accepted your request for return an item'
            ]);

        DB::table('user_returned_items as uri')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['item_status' => 'return']);

        Db::table('returned_items_info')->insert(['uri_id' => $req->input('id')]);
    }
    //decline pending request
    public function declinePendingRequest(Request $req)
    {
        DB::table('user_returned_items as uri')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['confirmation' => 'declined']);

        $user_id = DB::table('user_returned_items as uri')
            ->select('uri.user_id')
            ->where('uri.uri_id', $req->input('id'))
            ->first();

        DB::table('users_notification')
            ->insert([
                'user_id' => $req->input('user_id'),
                'to_user_id' => $user_id->user_id,
                'ns_id'   => 2,
                'np_id'   => 3,
                'confirmation' => 'declined',
                'description' => 'has declined your request for return an item'
            ]);

        DB::table('user_returned_items as uri')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['item_status' => 'owned']);
    }

    //Logs Area
    //get User ICS Controls
    public function getUserIcsControls(Request $req)
    {

        $subQuery = DB::table('inventory_tracking as it')
            ->select(DB::raw("SUM(pri.price * pri.quantity) as total"), 'it.trackings_id')
            ->join('iar_items as ia','ia.id','=','it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');

        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->where('t.received_by', $req->input('id'))
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->where('ui.description', 'ICS')
            ->where('ui.confirmation', 'accepted')
            // ->groupBy('t.id')
            ->get();

        $getFormDetails = DB::table('trackings as t')
            ->select('t.tracking_id', 'u1.prefix as issuerPre', 'u1.firstname as issuerf', 'u1.middlename as issuerM', 'u1.surname as issuerS', 'u1.suffix as issuerSuf', 'u2.firstname as receiverf', 'u2.surname as receiverS', 'u1.designation as receiverD', 'u2.designation as issuerD', 't.created_at as issuerDate', 'ui.created_at as receiverDate')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->where('t.received_by', $req->input('id'))
            ->first();

        $totalPrice = 0;

        foreach ($result as $item) {
            $totalPrice += $item->total;
        }

        return response()->json(['ics_controls' => $result, 'total_price' => $totalPrice, 'ics_details' => $getFormDetails]);
    }
    //get User ICS Controls
    public function getUserParControls(Request $req)
    {

        $subQuery = DB::table('inventory_tracking as it')->select(DB::raw("SUM(pri.price * pri.quantity) as total"), 'it.trackings_id')->join('iar_items as ia','ia.id','=','it.item_id')
        ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');
        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->where('t.received_by', $req->input('id'))
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->where('ui.description', 'PAR')
            ->where('ui.confirmation', 'accepted')
            // ->groupBy('t.id')
            ->get();

        $totalPrice = 0;

        foreach ($result as $item) {
            $totalPrice += $item->total;
        }

        return response()->json(['ics_controls' => $result, 'total_price' => $totalPrice]);
    }
}
