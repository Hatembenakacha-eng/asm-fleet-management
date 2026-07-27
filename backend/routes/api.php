<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\AffectationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RecommandationController;

use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'Creer_un_compte']);
Route::post('/login', [AuthController::class, 'Se_connecter']);
Route::post('/logout', [AuthController::class, 'Se_deconnecter'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('voitures', VoitureController::class);
    Route::apiResource('missions', MissionController::class);
    Route::apiResource('employees', EmployeeController::class);

    Route::apiResource('affectations', AffectationController::class);
});

Route::middleware(['auth:sanctum', 'throttle:10,1'])->group(function () {
    Route::get('/missions/{mission}/recommandation', [RecommandationController::class, 'recommander']);
});


Route::get('/ping', function () {
    return response()->json(['message' => 'pong', 'heure' => now()]);
});

Route::middleware(['auth:sanctum', 'throttle:15,1'])->group(function () {
    Route::post('/chat', [ChatController::class, 'repondre']);
});

