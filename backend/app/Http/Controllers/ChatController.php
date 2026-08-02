<?php

namespace App\Http\Controllers;

use App\Services\ChatService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function repondre(Request $request, ChatService $service)
    {
        $validated = $request->validate([
            'message'    => 'required|string|max:1000',
            'historique' => 'nullable|array', // On accepte le tableau de l'historique
            'historique.*.role'    => 'required_with:historique|string',
            'historique.*.content' => 'required_with:historique|string',
        ]);

        $message = $validated['message'];
        $historique = $validated['historique'] ?? [];

        // On passe le message ET l'historique au service
        return response()->json($service->repondre($message, $historique));
    }
}
