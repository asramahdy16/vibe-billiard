<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats(DashboardService $dashboardService)
    {
        return response()->json([
            'data' => $dashboardService->getStats()
        ], 200);
    }
}
