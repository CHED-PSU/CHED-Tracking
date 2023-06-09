<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ItemController extends Controller
{
    //User Area
    //User notification area
    public function getNotifSecListItems(Request $req)
    {
        $items = DB::table('users_notification as un')
            ->select('un.trackings_id', 't.id', 'pri.quantity', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'pu.name as unit', 'ia.stock_property_no as inventory_no', 'pri.id', 'pri.price', 'it.eul', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix')
            ->where('un.id', $req->input('notifID'))
            ->where('un.trackings_id', $req->input('listId'))
            ->join('trackings as t', 'un.trackings_id', '=', 't.id')
            ->join('inventory_trackings as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'it.assigned_to')
            ->where('ia.category_id', '!=', 1)
            ->get();

        return response()->json(['items' => $items]);
    }

    public function getAdminNotifSecListItems(Request $req)
    {
        $items = DB::table('admin_notification as an')
            ->select('t.id as tracking_id', 'pri.quantity', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'pu.name as unit', 'ia.stock_property_no as inventory_no', 'pri.id', 'pri.price', 'it.eul')
            ->where('an.id', $req->input('listId'))
            ->join('users_notification as un', 'un.id', '=', 'an.un_id')
            ->join('trackings as t', 'un.trackings_id', '=', 't.id')
            ->join('inventory_trackings as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('ia.category_id', '!=', 1)
            ->get();

        $tracking_ids = $items->pluck('tracking_id')->unique();

        $form_details = DB::table('trackings as t')
            ->select('u1.firstname as u1name', 'u1.surname as u1surname', 'u1.designation as u1designation', 'r1.name as u1role', 'u2.firstname as u2name', 'u2.surname as u2surname', 'u2.designation as u2designation', 'r2.name as u2role', 't.tracking_id')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('roles as r1', 'r1.id', '=', 'u1.role_id')
            ->join('roles as r2', 'r2.id', '=', 'u2.role_id')
            ->where('t.id', $tracking_ids)
            ->first();

        return response()->json(['items' => $items, 'form_details' => $form_details]);
    }

    //User Items Area
    //User Items Fetcher
    public function getuserIndividualItems(Request $req)
    {
        $getUserItems = DB::table('user_items as ui')
            ->select('pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'ui.created_at', 'ui.ui_id', 't.tracking_id as code', 'pri.quantity')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->where('it.assigned_to', $req->input('user_id'))
            ->where('ui.item_status', 'owned')
            ->where('ia.category_id', '!=', 1)
            ->get();

        $data = [];

        foreach ($getUserItems as $item) {
            $temp_data = [
                'article' => $item->article,
                'description' => $item->description,
                'make_model' => $item->make_model,
                'color' => $item->color,
                'created_at' => $item->created_at,
                'ui_id'      => $item->ui_id,
                'code'       => $item->code,
                'quantity'   => 1,
                'check'      => false
            ];

            array_push($data, $temp_data);
        }
        return response()->json(['itemsData' => $data]);
    }

    //User Items Data Fetcher
    public function getItemRequestData(Request $req)
    {
        $getUserItemsData = DB::table('user_items as ui')
            ->select('pu.name as unit', 'pi.description as brand', 'ia.color', 'ia.make_model', 'ia.sku', 't.tracking_id', 'pi.article as article', 'ia.serial_no as serial_no', 'ia.stock_property_no as property_no', 'pri.price as acquisition')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('ui.ui_id', $req->input('ui_id'))
            ->first();

        $getUserReturnedItemsInfo = DB::table('user_returned_items as uri')
            ->select('uri.status', 'uri.uri_id')
            ->where('uri.ui_id', $req->input('ui_id'))
            ->get();

        $getReturnedItemsInfo = DB::table('returned_items_info as rii')
            ->where('rii.uri_id', $req->input('id'))
            ->get();

        if ($getReturnedItemsInfo->isNotEmpty()) {
            $data = [
                'pre_nature' => $getReturnedItemsInfo->first()->pre_nature,
                'updated_at' => $getReturnedItemsInfo->first()->updated_at
            ];
        } else {
            $data = [
                'pre_nature' => null,
                'updated_at' => null
            ];
        }

        return response()->json([
            'itemData' => $getUserItemsData,
            'itemDataRII' => $data,
            'itemDataURI' => $getUserReturnedItemsInfo
        ]);
    }

    public function returnItemsToAdmin(Request $req)
    {

        $returned_items = DB::table('user_returned_items')
            ->insertGetId([
                'ui_id' => $req->input('data')['ui_id'],
                'user_id' => $req->input('user_id'),
                'defect' => $req->input('data')['defect'],
                'status' => $req->input('data')['reason'],
                'confirmation' => 'pending'
            ]);

        DB::table('user_items as ui')
            ->where('ui.ui_id', $req->input('data')['ui_id'])
            ->update([
                'item_status' => 'Requested to be return'
            ]);

        DB::table('admin_notification')->insert([
            'user_id'      => $req->input('user_id'),
            'ns_id' => 2,
            'np_id' => 4,
            'confirmation' => 'pending',
            'description'  => 'has requested to return an item'
        ]);

        return response()->json(['success' => 'success']);
    }

    //Admin Area
    //Pending Items Fetcher
    public function getPendingitems(Request $req)
    {
        $getPendingItems = DB::table('user_returned_items as uri')
            ->select('u.img', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'ia.stock_property_no as code', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article as article', 'pi.description', 'uri.uri_id', 'pri.price', 'uri.created_at', 'uri.defect', 't.tracking_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->where('uri.confirmation', 'pending')
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json(['pending_items' => $getPendingItems]);
    }

    //Returned Items Fetcher
    public function getReturnedItems()
    {
        $returnedItems = DB::table('user_returned_items as uri')
            ->select('uri.uri_id', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.confirmation', 'accepted')
            ->where('uri.status', '!=', 'Disposed')
            ->where('uri.status', '!=', 'Inventories')
            ->where('uri.status', '!=', 'Transferred')
            ->where('uri.status', '!=', 'Renewed')
            ->where('uri.status', '!=', 'Returned to Owner')
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json(['returnedItems' => $returnedItems]);
    }

    public function getReturnedItemsInventory()
    {
        $returnedItems = DB::table('user_returned_items as uri')
            ->select('uri.uri_id', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.confirmation', 'accepted')
            ->whereIn('uri.status', ['Inventories', 'Returned to Owner', 'Transferred', 'Renewed'])
            ->get();

        return response()->json(['returnedItemsInventory' => $returnedItems]);
    }

    public function getReturnedItemsUnserviceable()
    {
        $returnedItems = DB::table('user_returned_items as uri')
            ->select('uri.uri_id', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.confirmation', 'accepted')
            ->where('uri.status', '=', 'Disposed')
            ->get();

        return response()->json(['returnedItemsUnserviceable' => $returnedItems]);
    }

    //returned Items Data Fetcher
    public function getAdminReturnedItemsData(Request $req)
    {
        $getAdminReturnedItemsData = DB::table('user_returned_items as uri')
            ->select('uri.status', 'rii.pre_nature as nature', 'ia.color', 'ia.make_model', 'ia.sku', 'rii.updated_at as lastRepair', 'req.designation as reqD', 'rec.designation as recD', 'pi.article as article', 'pu.name as abbr', 'pri.price', 'pi.description as description', 'pi.code as property_no', 'uri.defect', 'req.firstname as reqF', 'req.middlename as reqM', 'req.surname as reqS', 'req.suffix as reqSuf', 'rec.firstname as recF', 'rec.middlename as recM', 'rec.surname as recS', 'rec.suffix as recSuf', 'uri.created_at', 'uri.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_subcategory_id')
            ->join('returned_items_info as rii', 'rii.uri_id', '=', 'uri.uri_id')
            ->join('users as req', 'req.id', '=', 'uri.user_id')
            ->join('users as rec', 'rec.id', '=', 'uri.received_by')
            ->where('uri.uri_id', $req->input('id'))
            ->first();

        $getAdminReturnedItemsInfo = DB::table('returned_items_info as rii')
            ->where('uri_id', $req->input('id'))
            ->first();

        $getUsers = DB::table('users')
            ->where('deleted_at', null)
            ->get();

        // if ($getAdminReturnedItemsInfo->pre_inspected != null && $getAdminReturnedItemsInfo->pre_approved != null && $getAdminReturnedItemsInfo->post_approve != null) {
        //     $data = [
        //         'pre_inspected' => $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->firstname .
        //             ' ' .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename ?
        //                 $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename[0] . '. ' : '') .
        //             $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->surname .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix ?
        //                 ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix : ''),

        //         'pre_approved' => $getUsers[$getAdminReturnedItemsInfo->pre_approved]->firstname .
        //             ' ' .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename ?
        //                 $getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename[0] . '. ' : '') .
        //             $getUsers[$getAdminReturnedItemsInfo->pre_approved]->surname .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix ?
        //                 ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix : ''),

        //         'post_approve' => $getUsers[$getAdminReturnedItemsInfo->post_approve]->firstname .
        //             ' ' .
        //             ($getUsers[$getAdminReturnedItemsInfo->post_approve]->middlename ?
        //                 $getUsers[$getAdminReturnedItemsInfo->post_approve]->middlename[0] . '. ' : '') .
        //             $getUsers[$getAdminReturnedItemsInfo->post_approve]->surname .
        //             ($getUsers[$getAdminReturnedItemsInfo->post_approve]->suffix ?
        //                 ' ' . $getUsers[$getAdminReturnedItemsInfo->post_approve]->suffix : ''),
        //     ];
        // } else if ($getAdminReturnedItemsInfo->pre_inspected != null && $getAdminReturnedItemsInfo->pre_approved != null && $getAdminReturnedItemsInfo->post_approve == null) {
        //     $data = [
        //         'pre_inspected' => $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->firstname .
        //             ' ' .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename ?
        //                 $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename[0] . '. ' : '') .
        //             $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->surname .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix ?
        //                 ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix : ''),
        //         'pre_approved' => $getUsers[$getAdminReturnedItemsInfo->pre_approved]->firstname .
        //             ' ' .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename ?
        //                 $getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename[0] . '. ' : '') .
        //             $getUsers[$getAdminReturnedItemsInfo->pre_approved]->surname .
        //             ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix ?
        //                 ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix : ''),
        //         'post_approve' => null
        //     ];
        // } else {
        //     $data = [
        //         'pre_inspected' => null,
        //         'pre_approved' => null,
        //         'post_approve' => null
        //     ];
        // }

        return response()->json(['adminReturnedItemsData' => $getAdminReturnedItemsData, 'adminReturnedItemsInfo' => $getAdminReturnedItemsInfo, 'users' => $getUsers]);
    }
    //return items pre save
    public function returnItemsPreSave(Request $req)
    {
        DB::table('returned_items_info')
            ->where('uri_id', $req->input('id'))
            ->update($req->input('data'));
    }
    //return items post save
    public function returnItemsPostSave(Request $req)
    {
        DB::table('returned_items_info')
            ->where('uri_id', $req->input('id'))
            ->update($req->input('data'));
    }

    //return  item change status
    public function returnedItemsChangeStatus(Request $req)
    {
        DB::table('user_returned_items')
            ->where('uri_id', $req->input('id'))
            ->update($req->input('data'));
    }

    // returnToPreviousOwner
    public function returnToPreviousOwner(Request $req)
    {
        DB::table('user_returned_items as uri')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['ui.item_status' => 'owned']);

        $user_id = DB::table('returned_items_info as rii')
            ->select('t.received_by')
            ->join('user_returned_items as uri', 'uri.uri_id', '=', 'rii.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->where('uri.uri_id', $req->input('id'))
            ->first();



        DB::table('users_notification')
            ->insert([
                'user_id' => $req->input('user_id'),
                'to_user_id' => $user_id->received_by,
                'ns_id' => 2,
                'np_id' => 3,
                'confirmation' => 'Return to Owner',
                'description'  => 'has returned an item to you'
            ]);

        return response()->json([
            'success' => 'success'
        ]);
    }

    public function assignToAnotherUser(Request $req)
    {
        $year = date('Y');
        $day = date('d');
        $month = date('m');

        DB::table('user_returned_items as uri')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['ui.item_status' => 'assigned_to_another_user', 'assigned_to_user' => $req->input('data')['owner_id']]);

        $tracking_id = DB::table('trackings')
            ->insertGetId([
                'tracking_id' => 'ICS-' . $year . '-' . $month . '-' . $day,
                'type' => 'ICS',
                'received_by' => $req->input('data')['owner_id'],
                'issued_by' => $req->input('data')['user_id'],
            ]);

        DB::table('user_returned_items')
            ->where('uri_id', $req->input('data')['rii_id'])
            ->update(['status' => 'assigned to another user']);

        $item_id = DB::table('user_returned_items as uri')
            ->select('it.item_id', 'it.assigned_to', 'it.eul', 'pri.price', 'iar.category_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as iar', 'iar.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.id', '=', 'it.purchase_request_item_id')
            ->where('uri.uri_id', $req->input('data')['rii_id'])
            ->first();

        $description = '';
        if ($item_id->category_id == 3) {
            $description = 'PAR';
        } else if ($item_id->category_id == 2) {
            $description = 'ICS';
        }

        DB::table('inventory_trackings')
            ->insert([
                'trackings_id' => $tracking_id,
                'item_id' => $item_id->item_id,
                'eul' => $item_id->eul,
                'assigned_to' => $item_id->eul,
            ]);

        DB::table('users_notification')
            ->insert([
                'trackings_id' => $tracking_id,
                'user_id'     => $req->input('data')['user_id'],
                'to_user_id'  => $req->input('data')['owner_id'],
                'ns_id'       => 2,
                'np_id'       => 1,
                'confirmation' => 'TBD',
                'description' => $description
            ]);
    }

    //admin moveToInventories
    public function moveToInventories(Request $req)
    {
        DB::table('user_returned_items')
            ->where('uri_id', $req->input('id'))
            ->update(['status' => 'Inventories']);
    }

    //admin moveItemstoUnserviceableItems
    public function moveItemstoUnserviceableItems(Request $req)
    {
        $inventory_tracking_id = DB::table('user_returned_items as uri')
            ->select('it.id', 't.received_by', 'uri.defect')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->where('uri.uri_id', $req->input('id'))
            ->first();

        DB::table('unserviceable_items')
            ->insert([
                'inventory_tracking_id' => $inventory_tracking_id->id,
                'prev_owner'            => $inventory_tracking_id->received_by,
                'remarks'               => 'has been moved to unserviceable due to ' . $inventory_tracking_id->defect,
                'status'                => 'stand_by'
            ]);

        DB::table('user_returned_items as uri')
            ->where('uri.uri_id', $req->input('id'))
            ->update(['status' => 'Disposed']);

        $getUserItems = DB::table('user_returned_items as uri')
            ->select('ui.ui_id')
            ->where('uri.uri_id', $req->input('id'))
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->first();

        DB::table('user_items as ui')
            ->where('ui.ui_id', $getUserItems->ui_id)
            ->update(['item_status' => 'disposed']);

        DB::table('users_notification')
            ->insert([
                'trackings_id' => $inventory_tracking_id->id,
                'user_id'      => $req->input('from'),
                'to_user_id'   => $inventory_tracking_id->received_by,
                'ns_id'        => 2,
                'np_id'        => 2,
                'confirmation' => 'accepted',
                'description'  => 'has disposed your item.'
            ]);
    }
    //get inventory items
    public function getItemsofInventories(Request $req)
    {
        $inventory_items = DB::table('user_returned_items as uri')
            ->select('t.tracking_id', 'uri.uri_id', 'ia.stock_property_no as code', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'u.designation', 'u.img', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.status', 'Inventories')
            ->orderBy('uri.created_at', 'DESC')
            ->get();

        $getUsers = DB::table('users')
            ->select('prefix', 'firstname', 'middlename', 'surname', 'suffix', 'id')
            ->get();

        return response()->json(['inventory_items' => $inventory_items, 'users' => $getUsers]);
    }

    public function getItemsofInventoriesById(Request $req)
    {
        $idArray = $req->input('id');
        $inventory_items_all = collect();

        foreach ($idArray as $id) {
            $items = DB::table('user_returned_items as uri')
                ->select('t.tracking_id', 'uri.uri_id', 'ia.stock_property_no as code', 'pri.price', 'pu.name as unit', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'u.designation', 'u.img', 'uri.status', 'u.id')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('trackings as t', 't.id', '=', 'it.trackings_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
                ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
                ->join('users as u', 'u.id', '=', 'uri.user_id')
                ->where('uri.status', 'Inventories')
                ->where('uri.uri_id', $id)
                ->orderBy('uri.created_at', 'DESC')
                ->get();

            $inventory_items_all = $inventory_items_all->concat($items);
        }

        return response()->json(['inventory_items_all' => $inventory_items_all]);
    }

    public function getInventorySorted(Request $req)
    {
        $inventory_items = DB::table('user_returned_items as uri')
            ->select('t.tracking_id', 'uri.uri_id', 'ia.stock_property_no as code', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'u.designation', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.status', 'Inventories')
            ->where('uri.user_id', $req->input('id'))
            ->orderBy('uri.created_at', 'DESC')
            ->get();

        $getUsers = DB::table('users')
            ->select('firstname', 'middlename', 'surname', 'suffix', 'designation', 'img', 'id')
            ->get();

        return response()->json(['inventory_items' => $inventory_items, 'users' => $getUsers]);
    }

    //Get issued forms
    public function getIssuedForm(Request $req)
    {
        $subQuery = DB::table('inventory_trackings as it')
            ->select(DB::raw("SUM(pri.price * 1) as total"), 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')->groupBy('it.trackings_id');

        $result = DB::table('trackings as t')
            ->joinSub($subQuery, 'subData', function ($join) {
                $join->on('t.id', '=', 'subData.trackings_id');
            })
            ->join('users_notification as ui', 'ui.trackings_id', '=', 't.id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('ui.confirmation', $req->input('status'))
            ->where(function ($query) {
                $query->orWhere('ui.description', 'ICS')
                    ->orWhere('ui.description', 'PAR');
            })
            ->where('ui.confirmation', $req->input('status'))
            ->orderBy('ui.created_at', 'DESC')
            ->get();

        return response()->json(['issued_forms_control' => $result]);
    }

    public function getIssuedFormDetails(Request $req)
    {
        $getItems = DB::table('inventory_trackings as it')
            ->select('ia.stock_property_no', 'pri.quantity', 'pu.name as unit', 'pri.price', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'pi.code', 'ia.stock_property_no as property_no', 'it.eul', 'it.id', 'it.assigned_to', 'u.img', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('product_subcategories as ps', 'ps.id', '=', 'pi.product_category_id')
            ->join('users as u', 'u.id', '=', 'it.assigned_to')
            ->where('it.trackings_id', $req->input('id'))
            ->where('ia.category_id', '!=', 1)
            ->get();

        $getFormDetails = DB::table('trackings as t')
            ->select('t.tracking_id', 'u1.firstname as issuerf', 'u1.middlename as issuerM', 'u1.surname as issuerS', 'u1.suffix as issuerSuf', 'u2.img', 'u2.firstname', 'u2.middlename', 'u2.surname', 'u2.suffix', 'u1.designation as receiverD', 'u2.designation')
            ->join('users as u1', 'u1.id', '=', 't.issued_by')
            ->join('users as u2', 'u2.id', '=', 't.received_by')
            ->join('inventory_trackings as it', 'it.trackings_id', '=', 't.id')
            ->where('t.id', $req->input('id'))
            ->first();

        return response()->json(['issued_forms_details' => $getItems, 'issued_forms_details_info' => $getFormDetails]);
    }

    //admin sorted multi return to prev owner
    public function multiReturnToPrevOwner(Request $req)
    {
        foreach ($req->input('selectedId') as $data) {
            DB::table('user_returned_items as uri')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->where('uri.uri_id', $data)
                ->update([
                    'uri.status' => 'Returned to Owner',
                    'ui.item_status' => 'owned'
                ]);
        }

        return response()->json([
            'success' => 'success'
        ]);
    }
    // multi return and renew
    public function multiReturnAndRenew(Request $req)
    {
        $num = DB::table('trackings')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $total = 0;

        foreach ($req->input('selectedId') as $data) {
            DB::table('user_returned_items as uri')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->where('uri.uri_id', $data)
                ->update([
                    'uri.status' => 'Renewed',
                ]);

            $price = DB::table('user_returned_items as uri')
                ->select('pri.price', 'ia.category_id')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->where('uri.uri_id', $data)
                ->first();

            $total += $price->price;
        }

        if ($price->category_id == 3) {
            $form = 'PAR';
        } else if ($price->category_id == 2) {
            $form = 'ICS';
        }

        $data = [
            'tracking_id' => $form . '-' . date('Y') . '-' . date('m') . '-' . str_pad($num + 1, 3, '0', STR_PAD_LEFT),
            'issued_by'   => $req->input('issued_by'),
            'received_by' => $req->input('user_id')
        ];

        $tracking_id = DB::table('trackings')
            ->insertGetId($data);

        foreach ($req->input('selectedId') as $data) {

            $getItemId =  DB::table('user_returned_items as uri')
                ->select('it.item_id')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->where('uri.uri_id', $data)
                ->first();

            DB::table('inventory_trackings')
                ->insert([
                    'trackings_id' => $tracking_id,
                    'item_id'      => $getItemId->item_id,
                    'eul'          => 'none',
                    'assigned_to'  => $req->input('user_id')
                ]);
        }

        DB::table('users_notification')
            ->insert([
                'trackings_id' => $tracking_id,
                'user_id'      => $req->input('issued_by'),
                'to_user_id'   => $req->input('user_id'),
                'ns_id'        => 2,
                'np_id'        => 1,
                'confirmation' => 'TBD',
                'description'  => $form
            ]);

        return response()->json([
            'success' => 'success'
        ]);
    }

    //admin multi assign to other user
    public function mutliAssignToOtherUser(Request $req)
    {
        $num = DB::table('trackings')
            ->whereMonth('created_at', date('m'))
            ->whereYear('created_at', date('Y'))
            ->count();

        $total = 0;

        foreach ($req->input('selectedId') as $data) {
            $assigned_to = DB::table('users')
                ->select('firstname', 'surname', 'suffix')
                ->where('id', $req->input('user_id'))
                ->first();

            DB::table('user_returned_items as uri')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->where('uri.uri_id', $data)
                ->update([
                    'uri.status' => 'Transferred',
                    'ui.item_status' => 'Transferred to ' . $assigned_to->firstname . ' ' . $assigned_to->surname . ($assigned_to->suffix ? ' ' . trim($assigned_to->suffix) : ''),
                    'ui.assigned_to_user' => $req->input('user_id')
                ]);

            $price = DB::table('user_returned_items as uri')
                ->select('pri.price', 'ia.category_id')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->where('uri.uri_id', $data)
                ->first();

            $total += $price->price;
        }

        if ($price->category_id == 3) {
            $form = 'PAR';
        } else if ($price->category_id == 2) {
            $form = 'ICS';
        }

        $data = [
            'tracking_id' => $form . '-' . date('Y') . '-' . date('m') . '-' . str_pad($num + 1, 3, '0', STR_PAD_LEFT),
            'issued_by'   => $req->input('issued_by'),
            'received_by' => $req->input('user_id')
        ];

        $tracking_id = DB::table('trackings')
            ->insertGetId($data);

        foreach ($req->input('selectedId') as $key => $data) {

            $getItemId =  DB::table('user_returned_items as uri')
                ->select('it.item_id', 'it.eul')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->where('uri.uri_id', $data)
                ->first();

            $assigned_to_raw = $req->input('assigned_to')[$key];

            if ($assigned_to_raw == 0 || $assigned_to_raw == null) {
                $assigned_to_id = $req->input('user_id');
            } else {
                $assigned_to_id = $assigned_to_raw;
            }

            DB::table('inventory_trackings')
                ->insert([
                    'trackings_id' => $tracking_id,
                    'item_id'      => $getItemId->item_id,
                    'assigned_to'  => $assigned_to_id,
                    'eul'          => $getItemId->eul
                ]);
        }

        DB::table('users_notification')
            ->insert([
                'trackings_id' => $tracking_id,
                'user_id'      => $req->input('issued_by'),
                'to_user_id'   => $req->input('user_id'),
                'ns_id'        => 2,
                'np_id'        => 1,
                'confirmation' => 'TBD',
                'description'  => $form
            ]);

        return response()->json([
            'success' => 'success'
        ]);
    }

    //admin Unserviceable Items
    public function getUnserviceableItems(Request $req)
    {
        $items = DB::table('unserviceable_items as ut')
            ->select('u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'ia.stock_property_no as code', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 't.created_at', 'ut.remarks', 'ut.id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ut.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('ut.status', 'stand_by')
            ->get();

        $status = DB::table('unserviceable_items as ut')
            ->select('u.firstname', 'u.surname', 'ia.stock_property_no as code', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 't.created_at', 'ut.remarks', 'ut.id')
            ->join('inventory_trackings as it', 'it.id', '=', 'ut.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('ut.status', $req->input('status'))
            ->first();

        return response()->json(['unserviceableItems' => $items, 'unserviceableStatus' => $status]);
    }

    //admin Donation Items fetcher
    public function getUnserviceableItemsDetails(Request $req)
    {
        $array = [];
        foreach ($req->input('item_ids') as $item) {


            $itemsDetails = DB::table('unserviceable_items as uit')
                ->select('rii.created_at as date_acquired', 'pi.code as property_no', 'pi.description', 'ia.color', 'ia.make_model', 'ia.sku', 'pi.article', 'pi.price', 'rii.post_findings as ppe')
                ->join('inventory_trackings as it', 'uit.inventory_tracking_id', '=', 'it.id')
                ->join('user_items as ui', 'ui.inventory_tracking_id', '=', 'it.id')
                ->join('user_returned_items as uri', 'uri.ui_id', '=', 'ui.ui_id')
                ->join('returned_items_info as rii', 'rii.uri_id', '=', 'uri.uri_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
                ->where('uit.id', $item)
                ->first();



            array_push($array, $itemsDetails);
        }

        return response()->json(['items' => $array]);
    }

    //YearlyUnserviceableReport
    public function YearlyUnserviceableReport(Request $req)
    {
        $getItems = DB::table('unserviceable_items as ui')
            ->select('it.created_at as date_acquired', 'pi.article', 'ia.stock_property_no as property_no', 'pi.price as amount')
            ->join('inventory_trackings as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ii', 'ii.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ii.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->whereYear('ui.created_at', $req->input('year'))
            ->get();


        $total = 0.00;

        foreach ($getItems as $i) {
            $total += $i->amount;
        }

        $months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];

        $month = date('m');

        return response()->json(['items' => $getItems, 'total' => $total, 'Month' => $months[$month - 1]]);
    }
}
