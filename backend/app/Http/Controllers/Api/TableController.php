<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BilliardTable;
use App\Http\Resources\BilliardTableResource;

class TableController extends Controller
{
    public function index()
    {
        $tables = BilliardTable::where('status', '!=', 'inactive')->get();
        return BilliardTableResource::collection($tables);
    }

    public function show($id)
    {
        $table = BilliardTable::findOrFail($id);
        return new BilliardTableResource($table);
    }
}
