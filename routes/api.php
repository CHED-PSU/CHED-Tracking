<?php

use App\Http\Controllers\AuthController;
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

//User Notification
    //Notification List
    Route::post('/getNotificationItems',[FormController::class, 'getNotificationItems']);

    //Notification Form Item List
    Route::post('/getNotifSecListItems',[ItemController::class,'getNotifSecListItems']);

    //Notification Form Details
    Route::post('/getFormDetails',[FormController::class,'getFormDetails']);

    //Accept and Decline Issued form from notification
    Route::post('acceptIssuedForm',[FormController::class,'acceptIssuedForm']); 
    Route::post('declineIssuedForm',[FormController::class,'declineIssuedForm']);

//User Home Area
    //recent Issuance
        Route::post('HomeData',[FormController::class,'HomeData']);

//User Items Area
    //Items fetcher
        Route::post('getuserIndividualItems',[ItemController::class,'getuserIndividualItems']);
    //Item Request Form Fetcher
        Route::post('getItemRequestData',[ItemController::class, 'getItemRequestData']);

    //return items to admin
        Route::post('returnItemsToAdmin',[ItemController::class, 'returnItemsToAdmin']);

//User Logs Area
    //get data for tables
        //ICS
            Route::post('getICS',[FormController::class,'getICS']);
            
            //ICS details
                Route::post('getIcsDetails', [FormController::class, 'getIcsDetails']);
        //PAR
            Route::post('getPAR',[FormController::class,'getPAR']);
        //Individual Items
            Route::post('getIndividualItems',[FormController::class,'getIndividualItems']);

//User Requests Area
    //Pending Requests
        //Pending and Accepted Count
            Route::post('getPendingAcceptedRequests', [GeneralController::class, 'getPendingAcceptedRequests']);

        //Pending Data
            Route::post('getPendingRequests', [FormController::class, 'getPendingRequests']);


//Admin Notification
    //get admin notification items
        Route::get('getAdminNotification',[FormController::class, 'getAdminNotification']);