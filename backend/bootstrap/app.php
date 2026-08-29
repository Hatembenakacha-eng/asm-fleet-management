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

    // Filet de sécurité : toute exception imprévue (erreur SQL, TypeError, etc.) qui
    // n'est pas déjà gérée ci-dessus ou par un try/catch de contrôleur. Sans ce
    // handler, Laravel renverrait sa page/JSON de debug par défaut dès que
    // APP_DEBUG=true, ce qui expose le message d'exception brut, le chemin du
    // fichier, la ligne et la trace complète (parfois la requête SQL elle-même) au
    // client — y compris pour de simples erreurs de routage (404, 405...) qui
    // n'ont rien à voir avec un bug métier. On journalise l'erreur réelle côté
    // serveur et on ne renvoie qu'un message générique au client, quel que soit
    // APP_DEBUG.
    //
    // NB : il n'y a volontairement PAS de handler dédié à ModelNotFoundException
    // (ex. binding implicite sur /voitures/{voiture}, /missions/{mission},
    // /employees/{employee}) : Laravel la convertit TOUJOURS en NotFoundHttpException
    // avant même d'atteindre les handlers ci-dessus (voir Handler::prepareException()),
    // donc un handler dédié à ce type ne s'exécuterait jamais. C'est la branche
    // HttpExceptionInterface ci-dessous qui la traite — d'où la vérification sur
    // getPrevious() : cette conversion automatique conserve TEL QUEL le message
    // d'origine, qui contient le nom de classe PHP complet du modèle (ex. "No query
    // results for model [App\Models\Voiture] 9999").
    $exceptions->render(function (\Throwable $e, $request) {
        if ($request->is('api/*')) {
            if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface) {
                // Un message issu d'une conversion automatique (previous non nul) n'est pas fiable ;
                // seul un message levé DIRECTEMENT par le framework ou l'application l'est.
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
