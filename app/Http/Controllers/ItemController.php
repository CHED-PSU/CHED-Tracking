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
            // ->select('it.quantity','it.eul','i.description','i.article as unit','i.property_no as inventory_no','i.id')
            ->select('pri.quantity', 'pi.description', 'pu.name as unit', 'pri.pr_item_uid as inventory_no', 'pri.id', 'pri.price', 'it.eul')
            ->join('trackings as t', 'un.trackings_id', '=', 't.id')
            ->where('un.trackings_id', $req->input('listId'))
            ->join('inventory_tracking as it', 'it.trackings_id', '=', 't.id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->get();

        return response()->json(['items' => $items]);
    }

    //User Items Area
    //User Items Fetcher
    public function getuserIndividualItems(Request $req)
    {
        $getUserItems = DB::table('user_items as ui')
            ->select('pi.description', 'ui.created_at', 'ui.ui_id', 'pi.code', 'pri.quantity')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->where('t.received_by', $req->input('user_id'))
            ->where('ui.item_status', 'owned')
            ->get();

        $data = [];

        foreach ($getUserItems as $item) {
            $temp_data = [
                'description' => $item->description,
                'created_at' => $item->created_at,
                'ui_id'      => $item->ui_id,
                'code'       => $item->code,
                'quantity'   => $item->quantity,
                'check'      => false
            ];

            array_push($data, $temp_data);
        }




        return response()->json(['itemsData' => $data]);
    }

    //User Items Data Fetcher
    public function getItemRequestData(Request $req)
    {
        $getUserItemsData = DB::table('user_items as ui as ui')
            ->select('pu.name as type', 'pi.description as brand', 'pi.code', 'ui.ui_id', 'pri.price')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', 'it.trackings_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->where('ui_id', $req->input('ui_id'))
            ->first();

        // var_dump($getUserItemsData);
        return response()->json([
            'itemData' => $getUserItemsData
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
            ->select('u.img','u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'pi.code as code', 'subCat.name as article', 'pi.description', 'uri.uri_id', 'pri.price', 'uri.created_at', 'uri.defect', 't.tracking_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('product_subcategories as subCat', 'subCat.id', '=', 'pi.product_subcategory_id')
            ->where('uri.confirmation', 'pending')
            ->get();

        return response()->json(['pending_items' => $getPendingItems]);
    }

    //Returned Items Fetcher
    public function getReturnedItems()
    {
        $returnedItems = DB::table('user_returned_items as uri')
            ->select('uri.uri_id', 'pi.description as article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.confirmation', 'accepted')
            ->get();

        return response()->json(['returnedItems' => $returnedItems]);
    }

    //returned Items Data Fetcher
    public function getAdminReturnedItemsData(Request $req)
    {
        $getAdminReturnedItemsData = DB::table('user_returned_items as uri')
            ->select('uri.status', 'rii.pre_nature as nature', 'rii.updated_at as lastRepair', 'req.designation as reqD', 'rec.designation as recD', 'ps.name as article', 'pu.name as abbr', 'pri.price', 'pi.description as description', 'pi.code as property_no', 'uri.defect', 'req.firstname as reqF', 'req.middlename as reqM', 'req.surname as reqS', 'req.suffix as reqSuf', 'rec.firstname as recF', 'rec.middlename as recM', 'rec.surname as recS', 'rec.suffix as recSuf', 'uri.created_at', 'uri.uri_id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
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

        if ($getAdminReturnedItemsInfo->pre_inspected != null && $getAdminReturnedItemsInfo->pre_approved != null && $getAdminReturnedItemsInfo->post_approve != null) {
            $data = [
                'pre_inspected' => $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->firstname .
                    ' ' .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename ?
                        $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename[0] . '. ' : '') .
                    $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->surname .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix ?
                        ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix : ''),
                        
                'pre_approved' => $getUsers[$getAdminReturnedItemsInfo->pre_approved]->firstname .
                    ' ' .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename ?
                        $getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename[0] . '. ' : '') .
                    $getUsers[$getAdminReturnedItemsInfo->pre_approved]->surname .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix ?
                        ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix : ''),

                'post_approve' => $getUsers[$getAdminReturnedItemsInfo->post_approved]->firstname .
                    ' ' .
                    ($getUsers[$getAdminReturnedItemsInfo->post_approved]->middlename ?
                        $getUsers[$getAdminReturnedItemsInfo->post_approved]->middlename[0] . '. ' : '') .
                    $getUsers[$getAdminReturnedItemsInfo->post_approved]->surname .
                    ($getUsers[$getAdminReturnedItemsInfo->post_approved]->suffix ?
                        ' ' . $getUsers[$getAdminReturnedItemsInfo->post_approved]->suffix : ''),
            ];
        } else if ($getAdminReturnedItemsInfo->pre_inspected != null && $getAdminReturnedItemsInfo->pre_approved != null && $getAdminReturnedItemsInfo->post_approve == null) {
            $data = [
                'pre_inspected' => $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->firstname .
                    ' ' .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename ?
                        $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->middlename[0] . '. ' : '') .
                    $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->surname .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix ?
                        ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_inspected]->suffix : ''),
                'pre_approved' => $getUsers[$getAdminReturnedItemsInfo->pre_approved]->firstname .
                    ' ' .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename ?
                        $getUsers[$getAdminReturnedItemsInfo->pre_approved]->middlename[0] . '. ' : '') .
                    $getUsers[$getAdminReturnedItemsInfo->pre_approved]->surname .
                    ($getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix ?
                        ' ' . $getUsers[$getAdminReturnedItemsInfo->pre_approved]->suffix : ''),
                'post_approve' => null
            ];
        } else {
            $data = [
                'pre_inspected' => null,
                'pre_approved' => null,
                'post_approve' => null
            ];
        }
        return response()->json(['adminReturnedItemsData' => $getAdminReturnedItemsData, 'adminReturnedItemsInfo' => $getAdminReturnedItemsInfo, 'users' => $getUsers, 'return_items_users_info' => $data]);
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
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->where('uri.uri_id', $req->input('id'))
            ->first();


        DB::table('user_returned_items')
        ->update(['status' => 'returned to owner']);

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
        $day = date('j');
        $month = date('n');

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
            ->select('it.purchase_request_item_id', 'it.eul', 'pri.price')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('purchase_request_items as pri', 'pri.id', '=', 'it.purchase_request_item_id')
            ->where('uri.uri_id', $req->input('data')['rii_id'])
            ->first();

        $description = '';
        if ($item_id->price > 40000) {
            $description = 'PAR';
        } else {
            $description = 'ICS';
        }

        DB::table('inventory_tracking')
            ->insert([
                'trackings_id' => $tracking_id,
                'purchase_request_item_id' => $item_id->purchase_request_item_id,
                'eul' => $item_id->eul
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
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->where('uri.uri_id', $req->input('id'))
            ->first();

        DB::table('unserviceable_items')
            ->insert([
                'inventory_tracking_id' => $inventory_tracking_id->id,
                'prev_owner'            => $inventory_tracking_id->received_by,
                'remarks'               => 'has been moved due to unserviceable due to ' . $inventory_tracking_id->defect,
                'status'                => 'stand_by'
            ]);

        DB::table('user_returned_items as uri')
            ->update(['status' => 'Unserviceable']);
    }
    //get inventory items
    public function getItemsofInventories(Request $req)
    {
        $inventory_items = DB::table('user_returned_items as uri')
            ->select('uri.uri_id', 'pi.code', 'pi.description as article', 'uri.created_at', 'uri.defect', 'u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.status', 'Inventories')
            ->get();

            $getUsers = DB::table('users')
            ->select('prefix', 'firstname', 'middlename', 'surname', 'suffix', 'id')
            ->get();

        return response()->json(['inventory_items' => $inventory_items , 'users' => $getUsers]);
    }
    public function getInventorySorted(Request $req)
    {
        $inventory_items = DB::table('user_returned_items as uri')
            ->select('uri.uri_id', 'pi.code', 'pi.description as article', 'uri.created_at', 'uri.defect', 'u.firstname', 'u.surname', 'uri.status', 'u.id')
            ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('product_units as pu', 'pu.id', '=', 'pi.product_unit_id')
            ->join('users as u', 'u.id', '=', 'uri.user_id')
            ->where('uri.status', 'Inventories')
            ->where('uri.user_id', $req->input('id'))
            ->get();

        $getUsers = DB::table('users')
            ->select('firstname', 'surname', 'id')
            ->whereNot('firstname', 'jermine')
            ->get();

        return response()->json(['inventory_items' => $inventory_items, 'users' => $getUsers]);
    }

    //admin sorted multi return to prev owner
    public function multiReturnToPrevOwner(Request $req)
    {
        foreach ($req->input('selectedId') as $data) {
            DB::table('user_returned_items as uri')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->where('uri.uri_id', $data)
                ->update([
                    'uri.status' => 'returned to owner',
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
            ->where('created_at', date('F Y'))
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
                ->select('pri.price')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->where('uri.uri_id', $data)
                ->first();

            $total += $price->price;
        }

        if ($total > 40000) {
            $form = 'PAR';
        } else {
            $form = 'ICS';
        }

        $data = [
            'tracking_id' => $form . '-' . date('Y') . '-' . date('m') . '-' . $num + 1,
            'issued_by'   => $req->input('issued_by'),
            'received_by' => $req->input('user_id')
        ];

        $tracking_id = DB::table('trackings')
            ->insertGetId($data);

        foreach ($req->input('selectedId') as $data) {

            $getItemId =  DB::table('user_returned_items as uri')
                ->select('it.item_id')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->where('uri.uri_id', $data)
                ->first();

            DB::table('inventory_tracking')
                ->insert([
                    'trackings_id' => $tracking_id,
                    'item_id'      => $getItemId->item_id,
                    'eul'          => 'none'
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
    public function mutliAssignToOtherUser(Request $req){
        $num = DB::table('trackings')
            ->where('created_at', date('F Y'))
            ->count();

        $total = 0;

        foreach ($req->input('selectedId') as $data) {
            DB::table('user_returned_items as uri')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->where('uri.uri_id', $data)
                ->update([
                    'uri.status' => 'Assigned to Another User',
                ]);

            $price = DB::table('user_returned_items as uri')
                ->select('pri.price')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
                ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
                ->where('uri.uri_id', $data)
                ->first();

            $total += $price->price;
        }

        if ($total > 50000) {
            $form = 'PAR';
        } else {
            $form = 'ICS';
        }

        $data = [
            'tracking_id' => $form . '-' . date('Y') . '-' . date('m') . '-' . $num + 1,
            'issued_by'   => $req->input('issued_by'),
            'received_by' => $req->input('user_id')
        ];

        $tracking_id = DB::table('trackings')
            ->insertGetId($data);

        foreach ($req->input('selectedId') as $data) {

            $getItemId =  DB::table('user_returned_items as uri')
                ->select('it.item_id')
                ->join('user_items as ui', 'ui.ui_id', '=', 'uri.ui_id')
                ->join('inventory_tracking as it', 'it.id', '=', 'ui.inventory_tracking_id')
                ->where('uri.uri_id', $data)
                ->first();

            DB::table('inventory_tracking')
                ->insert([
                    'trackings_id' => $tracking_id,
                    'item_id'      => $getItemId->item_id,
                    'eul'          => 'none'
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
            ->select('u.prefix', 'u.firstname', 'u.middlename', 'u.surname', 'u.suffix', 'pi.code', 'pi.description', 't.created_at', 'ut.remarks', 'ut.id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ut.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('ut.status', 'stand_by')
            ->get();

        $status = DB::table('unserviceable_items as ut')
            ->select('u.firstname', 'u.surname', 'pi.code', 'pi.description', 't.created_at', 'ut.remarks', 'ut.id')
            ->join('inventory_tracking as it', 'it.id', '=', 'ut.inventory_tracking_id')
            ->join('iar_items as ia', 'ia.id', '=', 'it.item_id')
            ->join('purchase_request_items as pri', 'pri.pr_item_uid', '=', 'ia.pr_item_uid')
            ->join('product_items as pi', 'pi.id', '=', 'pri.product_item_id')
            ->join('trackings as t', 't.id', '=', 'it.trackings_id')
            ->join('users as u', 'u.id', '=', 't.received_by')
            ->where('ut.status', $req->input('status'))
            ->first();

        return response()->json(['unserviceableItems' => $items, 'unserviceableStatus' => $status]);
    }
}
