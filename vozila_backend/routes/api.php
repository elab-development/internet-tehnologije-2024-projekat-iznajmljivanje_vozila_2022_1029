<?php

use App\Http\Controllers\AutoController;
use App\Http\Controllers\RezervacijaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;


Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/auta', [AutoController::class, 'index']); 
Route::get('/auta/{id}', [AutoController::class, 'show']); 


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']); 

    Route::resource('/users', UserController::class)->only(['index','show', 'destroy']);
    Route::post('/auta', [AutoController::class, 'store']); 
    Route::patch('/auta/{id}', [AutoController::class, 'update']); 
    
    Route::get(
      '/rezervacije/statistika',
      [RezervacijaController::class, 'statistics']
    );
    Route::resource('/rezervacije', RezervacijaController::class);

});   
