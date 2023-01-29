<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
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