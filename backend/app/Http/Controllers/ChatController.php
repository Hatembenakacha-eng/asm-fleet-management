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
            'historique' => 'nullable|array', 
            'historique.*.role'    => 'required_with:historique|string',
            'historique.*.content' => 'required_with:historique|string',
        ]);

        $message = $validated['message'];
        $historique = $validated['historique'] ?? [];

        return response()->json($service->repondre($message, $historique));
    }
}
