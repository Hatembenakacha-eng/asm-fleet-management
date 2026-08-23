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

Route::middleware('auth:sanctum')->group(function () {

    // Véhicules : la lecture est ouverte à tout utilisateur connecté (nécessaire au chat, à l'accueil,
    // au panneau de réservation rapide...). Seul un admin peut créer/modifier/supprimer un véhicule
    // ou lui téléverser une image.
    Route::get('/voitures', [VoitureController::class, 'index']);
    Route::get('/voitures/{voiture}', [VoitureController::class, 'show']);
    Route::middleware('admin')->group(function () {
        Route::post('/voitures', [VoitureController::class, 'store']);
        Route::put('/voitures/{voiture}', [VoitureController::class, 'update']);
        Route::delete('/voitures/{voiture}', [VoitureController::class, 'destroy']);
        Route::post('/voitures/{voiture}/image', [VoitureController::class, 'uploadImage']);
    });

    // Missions : lecture ouverte, écriture directe réservée à l'admin (la création automatique
    // par le chatbot passe par AffectationController::store, pas par cette route).
    Route::get('/missions', [MissionController::class, 'index']);
    Route::get('/missions/{mission}', [MissionController::class, 'show']);
    Route::middleware('admin')->group(function () {
        Route::post('/missions', [MissionController::class, 'store']);
        Route::put('/missions/{mission}', [MissionController::class, 'update']);
        Route::delete('/missions/{mission}', [MissionController::class, 'destroy']);
    });

    // Employés : données RH → entièrement réservé à l'admin.
    Route::middleware('admin')->group(function () {
        Route::apiResource('employees', EmployeeController::class);
    });

    // Affectations : tout utilisateur peut lister (auto-filtré par rôle, voir index()) et créer
    // sa propre demande. Changer un statut (valider/refuser) ou supprimer reste réservé à l'admin.
    Route::get('/affectations', [AffectationController::class, 'index']);
    Route::post('/affectations', [AffectationController::class, 'store']);
    Route::get('/affectations/{affectation}', [AffectationController::class, 'show']);
    Route::middleware('admin')->group(function () {
        Route::put('/affectations/{affectation}', [AffectationController::class, 'update']);
        Route::delete('/affectations/{affectation}', [AffectationController::class, 'destroy']);
    });
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
    Route::post('/profile/photo', [ProfileController::class, 'uploadPhoto']);
});
