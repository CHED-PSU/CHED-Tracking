<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForecastingController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//logIn
Route::post('/login', [AuthController::class, 'login']);
Route::post('logoutToken', [GeneralController::class, 'logoutToken']);

//User Notification

//Notification List
Route::post('/getNotificationItems', [FormController::class, 'getNotificationItems']);
Route::post('/getUserNotificationIsRead', [FormController::class, 'getUserNotificationIsRead']);

//Notification Form Item List
Route::post('/getNotifSecListItems', [ItemController::class, 'getNotifSecListItems']);
Route::post('/getAdminNotifSecListItems', [ItemController::class, 'getAdminNotifSecListItems']);

//Notification Form Details
Route::post('/getFormDetails', [FormController::class, 'getFormDetails']);

//Accept and Decline Issued form from notification
Route::post('acceptIssuedForm', [FormController::class, 'acceptIssuedForm']);
Route::post('declineIssuedForm', [FormController::class, 'declineIssuedForm']);

//User Home Area

//unread notif
Route::post('getUnread', [GeneralController::class, 'getUnread']);
Route::post('getAdminUnread', [GeneralController::class, 'getAdminUnread']);

//recent Issuance
Route::post('HomeData', [FormController::class, 'HomeData']);

//User Items Area

//Items fetcher
Route::post('getuserIndividualItems', [ItemController::class, 'getuserIndividualItems']);
//Item Request Form Fetcher
Route::post('getItemRequestData', [ItemController::class, 'getItemRequestData']);
//return items to admin
Route::post('returnItemsToAdmin', [ItemController::class, 'returnItemsToAdmin']);

//User Logs Area

//get data for tables
//ICS
Route::post('getICS', [FormController::class, 'getICS']);
//ICS details
Route::post('getIcsDetails', [FormController::class, 'getIcsDetails']);
//PAR
Route::post('getPAR', [FormController::class, 'getPAR']);
//PAR details
Route::post('getParDetails', [FormController::class, 'getParDetails']);
//Individual Items
Route::post('getIndividualItems', [FormController::class, 'getIndividualItems']);
Route::post('getIndividualItemsCOS', [FormController::class, 'getIndividualItemsCOS']);

//User Requests Area
//Pending Requests
//Pending and Accepted Count
Route::get('getPendingAcceptedRequests', [GeneralController::class, 'getPendingAcceptedRequests']);
Route::post('getPendingAcceptedRequestsById', [GeneralController::class, 'getPendingAcceptedRequestsById']);
//Pending Data
Route::post('getPendingRequests', [FormController::class, 'getPendingRequests']);
Route::post('getUsersAcceptedRequests', [FormController::class, 'getUsersAcceptedRequests']);


//Admin Notification

//get admin notification items
Route::get('getAdminNotification', [FormController::class, 'getAdminNotification']);
Route::get('getAdminNotificationPing', [FormController::class, 'getAdminNotificationPing']);
Route::get('getUserNotificationPing', [FormController::class, 'getUserNotificationPing']);
Route::post('getAdminNotificationIsRead', [FormController::class, 'getAdminNotificationIsRead']);
Route::get('getAdminRequest', [FormController::class, 'getAdminRequest']);

//Admin Dashboard
Route::get('getAdminDashboardData', [GeneralController::class, 'getAdminDashboardData']);
//Admin Pending Items
Route::get('getPendingItems', [ItemController::class, 'getPendingitems']);
//get Returned Items Data
Route::post('getReturnedItemsData', [FormController::class, 'getReturnedItemsData']);
//accept pending request
Route::post('acceptPendingRequest', [FormController::class, 'acceptPendingRequest']);
//decline pending request
Route::post('declinePendingRequest', [FormController::class, 'declinePendingRequest']);

//Admin Logs Area

// Admin Users Data Fetcher
Route::get('getUserLists', [GeneralController::class, 'getUserLists']);
Route::get('getUserListsJO', [GeneralController::class, 'getUserListsJO']);
Route::get('getUserListsICS', [GeneralController::class, 'getUserListsICS']);
Route::get('getUserListsPAR', [GeneralController::class, 'getUserListsPAR']);
Route::get('getUserListsIIR', [GeneralController::class, 'getUserListsIIR']);
Route::get('getUserListsIIC', [GeneralController::class, 'getUserListsIIC']);
Route::post('getUsersById', [GeneralController::class, 'getUsersById']);
Route::get('getUsers', [GeneralController::class, 'getUsers']);

//get User Ics Controls
Route::post('getUserIcsControls', [FormController::class, 'getUserIcsControls']);
Route::post('getUserICS', [FormController::class, 'getUserICS']);
//get User PAR Controls
Route::post('getUserParControls', [FormController::class, 'getUserParControls']);

//getUserList
Route::get('getUserLists', [GeneralController::class, 'getUserLists']);

//Admin Returned Items
// Admin Returned Items Fetcher
Route::get('getReturnedItems', [ItemController::class, 'getReturnedItems']);
Route::get('getReturnedItemsUnserviceable', [ItemController::class, 'getReturnedItemsUnserviceable']);
Route::get('getReturnedItemsInventory', [ItemController::class, 'getReturnedItemsInventory']);
//Returned Items Data Fetcher
Route::post('getAdminReturnedItemsData', [ItemController::class, 'getAdminReturnedItemsData']);
//Admin return pre save
Route::post('returnItemsPreSave', [ItemController::class, 'returnItemsPreSave']);
//Admin return Items post save
Route::post('returnItemsPostSave', [ItemController::class, 'returnItemsPostSave']);
//admin return items change status
Route::post('returnedItemsChangeStatus', [ItemController::class, 'returnedItemsChangeStatus']);
//admin move item to inventories
Route::post('moveToInventories', [ItemController::class, 'moveToInventories']);
//Admin move item to unserviceable item
Route::post('moveItemstoUnserviceableItems', [ItemController::class, 'moveItemstoUnserviceableItems']);

//Admin Inventories
//Inventory Items Fetcher
Route::get('getItemsofInventories', [ItemController::class, 'getItemsofInventories']);
Route::post('getItemsofInventoriesById', [ItemController::class, 'getItemsofInventoriesById']);
Route::post('getInventorySorted', [ItemController::class, 'getInventorySorted']);
//admin return item to previous owner
Route::post('returnToPreviousOwner', [ItemController::class, 'returnToPreviousOwner']);
//admin issue to another owner
Route::post('assignToAnotherUser', [ItemController::class, 'assignToAnotherUser']);

//Sorted Multi Return to prev owner
Route::post('multiReturnToPrevOwner', [ItemController::class, 'multiReturnToPrevOwner']);
//Sorted Multi Return or Renew
Route::post('multiReturnAndRenew', [ItemController::class, 'multiReturnAndRenew']);
//for Multi Assign to other user
Route::post('mutliAssignToOtherUser', [ItemController::class, 'mutliAssignToOtherUser']);
//Admin Unserviceable Items
Route::get('getUnserviceableItems', [ItemController::class, 'getUnserviceableItems']);
//Donation fetcher details of items
Route::post('getUnserviceableItemsDetails', [ItemController::class, 'getUnserviceableItemsDetails']);
//make donation information and add items to donation table
Route::post('donationReport', [FormController::class, 'donationReport']);
//Donation master list fetcher
Route::get('getDonationMasterList', [FormController::class, 'getDonationMasterList']);
//fetcher of Donation infromation
Route::post('getDonationInformation', [FormController::class, 'getDonationInformation']);



//Yearly Unserviceable Report
Route::post('YearlyUnserviceableReport', [ItemController::class, 'YearlyUnserviceableReport']);

//Admin forecasting Items
Route::get('forecast', [ForecastingController::class, 'forecast']);
Route::post('forecastSpecific', [ForecastingController::class, 'forecastSpecific']);
Route::get('totalCostPerYear', [ForecastingController::class, 'totalCostPerYear']);
