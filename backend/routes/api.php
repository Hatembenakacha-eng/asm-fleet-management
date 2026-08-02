<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\AffectationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RecommandationController;
use App\Http\Controllers\ProfileController;

use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'Creer_un_compte']);
Route::post('/login', [AuthController::class, 'Se_connecter']);
Route::post('/logout', [AuthController::class, 'Se_deconnecter'])->middleware('auth:sanctum');



Route::get('/affectations', [AffectationController::class, 'index']);
Route::post('/affectations', [AffectationController::class, 'store']);
Route::put('/affectations/{id}', [AffectationController::class, 'update']);
Route::delete('/affectations/{id}', [AffectationController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('voitures', VoitureController::class);
    Route::apiResource('missions', MissionController::class);
    Route::apiResource('employees', EmployeeController::class);

    Route::apiResource('affectations', AffectationController::class);

    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'updatePassword']);
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

Route::get('/login', function () {
    return response()->json(['message' => 'Non authentifié.'], 401);
})->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/profile', [ProfileController::class, 'updateProfile']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);
});



