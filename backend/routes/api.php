<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginRegistController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProgramController;
//use App\Http\Controllers\CommentController;

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

//other

Route::get('images/{filename}', function ($filename)
{
    $file = \Illuminate\Support\Facades\Storage::get($filename);
    return response($file, 200)->header('Content-Type', 'image/jpeg');
});

Route::post('/registerUser',[LoginRegistController::class,'registerUser']);
Route::post('/login',[LoginRegistController::class,'login'])->name('login');
Route::post('/createrole',[RoleController::class,'createRole']);
Route::post('/createactivite',[ProgramController::class,'createactivite']);
Route::post('/createtitreprogramme',[ProgramController::class,'createtitreprogramme']);
Route::post('/createprogramme',[ProgramController::class,'createprogramme']);
Route::post('/addrapport',[ProgramController::class,'addrapport']);
Route::post('/addbesoins',[ProgramController::class,'addbesoins']);

Route::post('/updateuser',[LoginRegistController::class,'updateUser']);
Route::post('/updaterapport',[ProgramController::class,'updaterapport']);
Route::post('/executbesoins',[ProgramController::class,'executbesoins']);
Route::post('/updateprogramme',[ProgramController::class,'updateprogramme']);
Route::post('/updateprofile',[LoginRegistController::class,'UpdateProfile']);

Route::get('/getuserbyemail/{email}',[LoginRegistController::class,'getUser']);
Route::get('/getuserbyid/{id}',[LoginRegistController::class,'getuserbyid']);
Route::get('/getactnbr/{id}',[ProgramController::class,'getActNbrByUser']);
Route::get('/getprogramprogres/{id}',[ProgramController::class,'getProgrammeProgress']);
Route::get('/getprogramgroupuser/{id}',[ProgramController::class,'getprogrammeByUser']);
Route::get('/valideactivite/{id}',[ProgramController::class,'validActivite']);
Route::get('/validehalfactivite/{id}',[ProgramController::class,'validhalfActivite']);
Route::get('/getprogramactbyid/{id}',[ProgramController::class,'getprogramactbyid']);
Route::get('/getrapportbyid/{id}',[ProgramController::class,'getrapportbyid']);
Route::get('/getactualprogram/{id}',[ProgramController::class,'getprogramme']);
Route::get('/validbesoins/{id}',[ProgramController::class,'validbesoins']);
Route::get('/rejetbesoins/{id}',[ProgramController::class,'rejetbesoins']);

Route::get('/deluser/{id}',[LoginRegistController::class,'delUser']);
Route::get('/delrapport/{id}',[ProgramController::class,'delrapport']);
Route::get('/delbesoin/{id}',[ProgramController::class,'delbesoin']);
Route::get('/delprogramme/{id}',[ProgramController::class,'delprogramme']);

Route::get('/getactivites',[ProgramController::class,'getactivite']);
Route::get('/getroles',[RoleController::class,'getrole']);
Route::get('/getweek',[ProgramController::class,'getweek']);
Route::get('/getallusers',[LoginRegistController::class,'getAllUser']);
Route::get('/getallprogramme',[ProgramController::class,'getAllTitreprogramme']);
Route::get('/getdaylyprogramprogress',[ProgramController::class,'getdaylyprogrammeprogresss']);
Route::get('/getallweekdays',[ProgramController::class,'getallWeekDays']);
Route::get('/getactualweekdatas',[ProgramController::class,'getactualweekdatas']);
Route::get('/getlastweekdatas',[ProgramController::class,'getlastweekdatas']);
Route::get('/getrapport',[ProgramController::class,'getrapport']);
Route::get('/getbesoins',[ProgramController::class,'getbesoins']);
Route::get('/getuserprogramme',[ProgramController::class,'getUserprogramme']);
Route::get('/getallprogrammes',[ProgramController::class,'getAllprogramme']);
Route::get('/getactualprogramprogres',[ProgramController::class,'getActualProgrammeProgress']);