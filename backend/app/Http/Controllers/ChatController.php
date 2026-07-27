<?php
namespace App\Http\Controllers;

use App\Services\ChatService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function repondre(Request $request, ChatService $service)
    {
        $validated = $request->validate(['message' => 'required|string|max:1000']);
        return response()->json($service->repondre($validated['message']));
    }
}
