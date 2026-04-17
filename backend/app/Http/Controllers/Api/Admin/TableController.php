<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BilliardTable;
use App\Http\Requests\Table\StoreTableRequest;
use App\Http\Resources\BilliardTableResource;

class TableController extends Controller
{
    public function index()
    {
        $tables = BilliardTable::all();
        return BilliardTableResource::collection($tables);
    }

    public function store(StoreTableRequest $request)
    {
        $table = BilliardTable::create($request->validated());
        return response()->json([
            'message' => 'Meja berhasil ditambahkan',
            'data' => new BilliardTableResource($table)
        ], 201);
    }

    public function show($id)
    {
        $table = BilliardTable::findOrFail($id);
        return new BilliardTableResource($table);
    }

    public function update(StoreTableRequest $request, $id)
    {
        $table = BilliardTable::findOrFail($id);
        $table->update($request->validated());
        return response()->json([
            'message' => 'Meja berhasil diupdate',
            'data' => new BilliardTableResource($table)
        ], 200);
    }

    public function destroy($id)
    {
        $table = BilliardTable::findOrFail($id);
        $table->delete();
        return response()->json(['message' => 'Meja berhasil dihapus'], 200);
    }
}
