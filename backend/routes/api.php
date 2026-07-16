<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoitureController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/Creer_un_compte', [AuthController::class, 'Creer_un_compte']);
Route::post('/Se_connecter', [AuthController::class, 'Se_connecter']);
Route::post('/Se_deconnecter', [AuthController::class, 'Se_deconnecter'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('voitures', VoitureController::class);

});
