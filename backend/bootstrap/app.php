<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (ValidationException $e, $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'succes' => false,
                'message' => 'Erreur de validation.',
                'erreurs' => $e->errors(),
            ], 422);
        }
    });

    $exceptions->render(function (AuthenticationException $e, $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'succes' => false,
                'message' => 'Non authentifié.',
            ], 401);
        }
    });

    $exceptions->render(function (\Throwable $e, $request) {
        if ($request->is('api/*')) {
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface) {

                $message = $e->getMessage();
                if ($e->getPrevious() !== null || $message === '') {
                    $message = match ($e->getStatusCode()) {
                        404 => 'Ressource introuvable.',
                        403 => 'Accès refusé.',
                        default => 'Erreur de requête.',
                    };
                }

                return response()->json([
                    'succes'  => false,
                    'message' => $message,
                ], $e->getStatusCode(), $e->getHeaders());
            }

            Log::error('Exception non gérée : ' . $e->getMessage(), [
                'exception' => get_class($e),
                'file'      => $e->getFile(),
                'line'      => $e->getLine(),
            ]);

            return response()->json([
                'succes'  => false,
                'message' => "Une erreur inattendue est survenue. Réessayez dans un instant.",
            ], 500);
        }
    });
})->create();
