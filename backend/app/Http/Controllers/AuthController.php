<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class AuthController extends Controller
{
  public function Creer_un_compte(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
        'role' => 'required|in:admin,gestionnaire,utilisateur',
    ]);

    $validatedData['name'] = Str::ascii($validatedData['name']);

    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']),
        'role' => $validatedData['role'],
    ]);

    return response()->json([
        'message' => 'Compte cree avec succes',
        'user' => $user
    ], 201);
}

    public function Se_connecter(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::query()->where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function Se_deconnecter(Request $request)
    {
        if ($request->user()) {
            /** @var \Laravel\Sanctum\PersonalAccessToken $token */
            $token = $request->user()->currentAccessToken();
            $token?->delete();
        }

        return response()->json(['message' => 'Deconnecte avec succes']);
    }
}
