<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Mission;
use App\Services\RecommandationService;

class RecommandationController extends Controller
{
    protected RecommandationService $recommandationService;

    public function __construct(RecommandationService $recommandationService)
    {
        $this->recommandationService = $recommandationService;
    }

    public function recommander(Mission $mission)
    {
        $resultat = $this->recommandationService->recommander($mission);

        return response()->json($resultat, $resultat['succes'] ? 200 : 422);
    }
}
