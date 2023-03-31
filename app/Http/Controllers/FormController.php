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
            ->select('un.confirmation', 'un.description', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'un.created_at', 'un.ns_id', 'un.np_id', 't.id', 'un.id as notifId')
            ->join('trackings as t', 'un.trackings_id', '=', 't.id')
            ->join('users as u', 't.issued_by', '=', 'u.id')
            ->where('t.received_by', $request->input('id'))
            ->get();

        $NotificationItemsUnread = DB::table('users_notification as un')
            ->select('un.confirmation', 'un.description', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'un.created_at', 'un.ns_id', 'un.np_id', 't.id', 'un.id as notifId')
            ->join('trackings as t', 'un.trackings_id', '=', 't.id')
            ->join('users as u', 't.issued_by', '=', 'u.id')
            ->where('t.received_by', $request->input('id'))
            ->where('un.ns_id', 2)
            ->get();

        return response()->json([
            'data' => $NotificationItems,
            'unread_data' => $NotificationItemsUnread
        ]);
    }

    public function getUserNotificationIsRead(Request $req)
    {
        $getNotificationIsRead = DB::table('users_notification as un')
            ->where('un.id', $req->input('id'))
            ->update(['un.ns_id' => $req->input('status')]);

        return response()->json(['notificationIsRead' => $getNotificationIsRead]);
    }

    //notification form details
    public function getFormDetails(Request $req)
    {
        $form_details = DB::table('trackings as t')
            ->select('un.description', 'u1.firstname as u1name', 'u1.surname as u1surname', 'u1.designation as u1designation', 'r1.name as u1role', 'u2.firstname as u2name', 'u2.surname as u2surname', 'u2.designation as u2designation', 'r2.name as u2role', 't.tracking_id')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('roles as r1', 'r1.id', '=', 'u1.role_id')
            ->join('roles as r2', 'r2.id', '=', 'u2.role_id')
            ->join('users_notification as un', 'un.trackings_id', '=', 't.id')
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
            ->select('it.id', 'pri.quantity')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
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

        $userNotification = DB::table('users_notification')
            ->select('id', 'description')
            ->where('trackings_id', $req->input('listId'))
            ->first();

        $data = [
            'user_id'      => $req->input('user_id'),
            'un_id'        => $userNotification->id,
            'ns_id'        => 2,
            'np_id'        => 2,
            'confirmation' => 'report',
            'description'  => 'has accepted the issued ' . $userNotification->description . ' Form',
            'updated_at'  => DB::raw('now()'),
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
            ->select('users.img', 'users.firstname', 'users.surname', 'users.suffix', 'trackings.tracking_id', 'trackings.created_at', 'roles.name')
            ->join('users', 'users.id', '=', 'trackings.issued_by')
            ->join('roles', 'roles.id', '=', 'users.role_id')
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
        $subQuery = DB::table('inventory_tracking as it')
            ->select(DB::raw("SUM(pri.price * pri.quantity) as total"), 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');

        $users =  DB::table('users as issued_by')
            ->select('issued_by.firstname as issuedF', 'issued_by.middlename as issuedM', 'issued_by.surname as issuedS', 'issued_by.suffix as issuedSuf', 'issued_by.id as issued_id');

        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->joinSub($users, 'users', function ($join) {
                $join->on('t.issued_by', '=', 'users.issued_id');
            })
            ->where('t.received_by', $request->input('user_id'))
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->where('ui.description', 'ICS')
            ->where('ui.confirmation', 'accepted')
            ->get();

        return response()->json([
            'allICS' => $result
        ]);
    }

    //ICS table
    public function getIcsDetails(Request $req)
    {
        $getItems = DB::table('trackings as t')
            ->select('pri.quantity', 'pu.name as unit', 'ui.item_status', 'pri.price', 'pi.description', 'pi.article', 'pi.code', 'pi.code as property_no', 'it.eul', 'it.id', 'it.assigned_to', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_category_id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->join('users as u', 'u.id', '=', 'it.assigned_to')
            ->where('t.id', $req->input('id'))
            ->where('ia.category_id', '!=', 1)
            ->get();

        $getFormDetails = DB::table('trackings as t')
            ->select('t.tracking_id', 'u1.firstname as issuerf', 'ui.item_status', 'u1.middlename as issuerM', 'u1.surname as issuerS', 'u1.suffix as issuerSuf', 'u2.firstname as receiverf', 'u2.middlename as receiverM', 'u2.surname as receiverS', 'u2.suffix as receiverSuf', 'u1.designation as receiverD', 'u2.designation as issuerD', 't.created_at as issuerDate', 'ui.created_at as receiverDate')
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
            'designation1' => $getFormDetails->receiverD,
            'item_status' => $getFormDetails->item_status,
        ];

        return response()->json(['dataItems' => $getItems, 'form_details' => $data]);
    }

    //PAR Table
    public function getPAR(Request $request)
    {
        $subQuery = DB::table('inventory_tracking as it')
            ->select(DB::raw("SUM(pri.price * pri.quantity) as total"), 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');

        $users =  DB::table('users as issued_by')
            ->select('issued_by.firstname as issuedF', 'issued_by.middlename as issuedM', 'issued_by.surname as issuedS', 'issued_by.suffix as issuedSuf', 'issued_by.id as issued_id');

        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->joinSub($users, 'users', function ($join) {
                $join->on('t.issued_by', '=', 'users.issued_id');
            })
            ->where('t.received_by', $request->input('user_id'))
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->where('ui.description', 'PAR')
            ->where('ui.confirmation', 'accepted')
            ->get();

        return response()->json([
            'allPAR' => $result
        ]);
    }

    public function getParDetails(Request $req)
    {
        $getItems = DB::table('trackings as t')
            ->select('pri.quantity', 'pu.name as unit', 'ui.item_status', 'pri.price', 'pi.description', 'pi.article', 'pi.code', 'pi.code as property_no', 'it.eul', 'it.id', 'it.assigned_to', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_category_id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->join('users as u', 'u.id', '=', 'it.assigned_to')
            ->where('t.id', $req->input('id'))
            ->where('ia.category_id', '!=', 1)
            ->get();

        $getFormDetails = DB::table('trackings as t')
            ->select('u3.designation as assignedD', 'u3.firstname as assignedF', 'u3.middlename as assignedM', 'u3.surname as assignedS', 'u3.suffix as assignedSuf', 't.tracking_id', 'u1.firstname as issuerf', 'ui.item_status', 'u1.middlename as issuerM', 'u1.surname as issuerS', 'u1.suffix as issuerSuf', 'u2.firstname as receiverf', 'u2.middlename as receiverM', 'u2.surname as receiverS', 'u2.suffix as receiverSuf', 'u1.designation as receiverD', 'u2.designation as issuerD', 't.created_at as issuerDate', 'ui.created_at as receiverDate')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('users as u3', 'u3.id', '=', 'it.assigned_to')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->where('t.id', $req->input('id'))
            ->first();

        $data = [
            'ics_no' => $getFormDetails->tracking_id,
            'issuerF' => $getFormDetails->issuerf,
            'issuerM' => $getFormDetails->issuerM,
            'issuerS' => $getFormDetails->issuerS,
            'issuerSuf' => $getFormDetails->issuerSuf,
            'receiverF' => $getFormDetails->receiverf,
            'receiverM' => $getFormDetails->receiverM,
            'receiverS' => $getFormDetails->receiverS,
            'receiverSuf' => $getFormDetails->receiverSuf,
            'assignedF' => $getFormDetails->assignedF,
            'assignedM' => $getFormDetails->assignedM,
            'assignedS' => $getFormDetails->assignedS,
            'assignedSuf' => $getFormDetails->assignedSuf,
            'issued_date' => $getFormDetails->issuerDate,
            'received_date'   => $getFormDetails->receiverDate,
            'designation3' => $getFormDetails->assignedD,
            'designation2' => $getFormDetails->issuerD,
            'designation1' => $getFormDetails->receiverD,
            'item_status' => $getFormDetails->item_status,
        ];

        return response()->json(['dataItems' => $getItems, 'form_details' => $data]);
    }

    //Inidividual inventory table
    public function getIndividualItems(Request $req)
    {
        $items = DB::table('trackings as t')
            ->select('ui.ui_id', 't.created_at as date', 'u.designation', 'pri.quantity as qty', 'pu.name as unit', 'pri.price as amount', 'pi.description', 'pi.article', 'pi.code as code', 'it.eul', 'ui.item_status as remarks', 'it.id', 'it.assigned_to', 'ua.firstname', 'ua.middlename', 'ua.surname', 'ua.suffix')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->join('users as ua', 'ua.id', '=', 'it.assigned_to')
            ->where('t.received_by', $req->input('id'))
            ->where('ui.item_status', 'owned')
            ->where('ia.category_id', '!=', 1)
            ->get();

        $total_price = 0;

        foreach ($items as $i) {
            $total_price += $i->amount;
        }

        return response()->json(['allIndivItems' => $items, 'total_price' => $total_price]);
    }

    public function getIndividualItemsCOS(Request $req)
    {
        $items = DB::table('trackings as t')
            ->select('ui.ui_id', 't.created_at as date', 'u.designation', 'pri.quantity as qty', 'pu.name as unit', 'pri.price as amount', 'pi.description', 'pi.article', 'pi.code as code', 'it.eul', 'ui.item_status as remarks', 'it.id')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('it.assigned_to', $req->input('id'))
            ->where('ui.item_status', 'owned')
            ->get();

        $total_price = 0;

        foreach ($items as $i) {
            $total_price += $i->amount;
        }

        return response()->json(['allIndivItemsCOS' => $items, 'total_price' => $total_price]);
    }

    // Pending Requests Area
    public function getPendingRequests(Request $req)
    {
        $getItems = DB::table('user_returned_items as uri')
            ->select('uri.created_at', 'pri.price', 'pi.code', 'pi.description', 'pi.article', 'uri.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('uri.user_id', $req->input('id'))
            ->where('uri.confirmation', 'Pending')
            ->get();

        return response()->json(['data' => $getItems]);
    }

    public function getUsersAcceptedRequests(Request $req)
    {

        $getItemsAccepted = DB::table('user_returned_items as uri')
            ->select('uri.created_at', 'pri.price', 'pi.code', 'pi.description', 'pi.article', 'uri.uri_id', 'uri.defect', 'uri.status', 'uri.updated_at')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('uri.user_id', $req->input('id'))
            ->where('uri.confirmation', 'accepted')
            ->orderBy('uri.created_at', 'DESC')
            ->get();

        return response()->json(['acceptedRequest' => $getItemsAccepted]);
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

        $getAdminNotificationUnread = DB::table('admin_notification as an')
            ->select('an.id', 'an.user_id', 'u.prefix', 'u.firstname', 'u.surname', 'u.suffix', 'an.created_at', 'an.description', 'an.ns_id')
            ->join('users as u', 'u.id', '=', 'an.user_id')
            ->where('an.ns_id', 2)
            ->orderBy('an.created_at', 'DESC')
            ->get();

        return response()->json(['admin_notification' => $getAdminNotification, 'admin_unread_notification' => $getAdminNotificationUnread]);
    }

    public function getAdminNotificationIsRead(Request $req)
    {
        $getAdminNotificationIsRead = DB::table('admin_notification as an')
            ->where('an.id', $req->input('id'))
            ->update(['an.ns_id' => $req->input('status')]);

        return response()->json(['admin_notificationIsRead' => $getAdminNotificationIsRead]);
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
            ->select('pu.name as unit', 'pi.description as brand', 'pi.article as article', 'pi.code as property_no', 'pri.price as acquisition', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'uri.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_subcategory_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.uri_id', $req->input('id'))
            ->get();

        $getreturnedItemsInfo = DB::table('returned_items_info as rii')
            ->where('rii.uri_id', $req->input('id'))
            ->get();

        if ($getreturnedItemsInfo->isNotEmpty()) {
            $data = [
                'pre_nature' => $getreturnedItemsInfo->first()->pre_nature,
                'updated_at' => $getreturnedItemsInfo->first()->updated_at
            ];
        } else {
            $data = [
                'pre_nature' => null,
                'updated_at' => null
            ];
        }

        return response()->json(['returnedItemsData' => $getreturnedItemsdata, 'returnedItemsInfo' => $data]);
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
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');

        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->where('t.received_by', $req->input('id'))
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->where('ui.description', 'ICS')
            ->where('ui.confirmation', 'accepted')
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

    public function getUserICS(Request $req)
    {
        $getICS = DB::table('trackings as t')
            ->select('t.tracking_id as trackingCode', 't.issued_by', 'it.trackings_id as tracking_id', 'iar.pr_item_uid', 'iar.serial_no', 'pri.price', 'pi.article', 'pi.description', 'pu.name')
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as iar', 'iar.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'iar.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('t.received_by', $req->input('id'))
            ->get();

        $groupedItems = collect($getICS)->groupBy('tracking_id');

        return response()->json(['ics_details' => $groupedItems]);
    }

    //get User PAR Controls
    public function getUserParControls(Request $req)
    {
        $subQuery = DB::table('inventory_tracking as it')
            ->select(DB::raw("SUM(pri.price * pri.quantity) as total"), 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');

        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->where('t.received_by', $req->input('id'))
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->where('ui.description', 'PAR')
            ->where('ui.confirmation', 'accepted')
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

        return response()->json(['par_controls' => $result, 'total_price' => $totalPrice, 'par_details' => $getFormDetails]);
    }

    //Admin make donation information and add items to donation table
    public function donationReport(Request $req)
    {
        $id = DB::Table('donation_information')->insertGetId($req->input('data'));

        foreach ($req->input('selectedIds') as $item) {
            DB::table('unserviceable_items')->where('id', $item)->update(['status' => 'donation']);
            DB::table('donation_items')->insert(['donation_info_id' => $id, 'unserviceable_id' => $item]);
        }



        return response()->json(['success' => 'success']);
    }

    //Admin Donation fetcher master list
    public function getDonationMasterList(Request $req)
    {
        $getItems = DB::table('donation_information')->join('users', 'donation_information.issued_by', '=', 'users.id')->get();
        return response()->json(['orgList' => $getItems]);
    }

    public function getDonationInformation(Request $req)
    {
        $getInformation = DB::table('donation_information')->join('users', 'donation_information.issued_by', '=', 'users.id')->where('donation_info_id', $req->input('id'))->first();
        $getItems = DB::table('donation_items as di')
            ->select('rii.created_at as date_acquired', 'pi.code as property_no', 'pi.description', 'pi.article', 'pi.price', 'rii.post_findings as ppe')
            ->join('unserviceable_items as uit', 'uit.id', '=', 'di.unserviceable_id')
            ->join('inventory_tracking as it', 'uit.inventory_tracking_id', '=', 'it.id')
            ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
            ->join('user_returned_items as uri', 'uri.ui_id', '=', 'ui.ui_id')
            ->join('returned_items_info as rii', 'rii.uri_id', '=', 'uri.uri_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->where('di.donation_info_id', $req->input('id'))
            ->get();

        return response()->json(['info' => $getInformation, 'items' => $getItems]);
    }
}
