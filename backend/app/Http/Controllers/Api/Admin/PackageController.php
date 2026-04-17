<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Package;
use App\Http\Resources\PackageResource;

class PackageController extends Controller
{
    public function index()
    {
        return PackageResource::collection(Package::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_paket' => 'required|string|max:100',
            'harga_per_jam' => 'nullable|numeric',
            'harga_flat' => 'nullable|numeric',
            'durasi_min_jam' => 'required|integer|min:1',
            'hari_berlaku' => 'required|string',
            'jam_mulai' => 'nullable|date_format:H:i',
            'jam_selesai' => 'nullable|date_format:H:i',
            'is_active' => 'boolean',
        ]);
        
        $package = Package::create($data);
        return response()->json([
            'message' => 'Paket berhasil dibuat',
            'data' => new PackageResource($package)
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $package = Package::findOrFail($id);
        $data = $request->validate([
            'nama_paket' => 'sometimes|string|max:100',
            'harga_per_jam' => 'nullable|numeric',
            'harga_flat' => 'nullable|numeric',
            'durasi_min_jam' => 'sometimes|integer|min:1',
            'hari_berlaku' => 'sometimes|string',
            'jam_mulai' => 'nullable|date_format:H:i:s',
            'jam_selesai' => 'nullable|date_format:H:i:s',
            'is_active' => 'boolean',
        ]);
        
        $package->update($data);
        return response()->json([
            'message' => 'Paket berhasil diupdate',
            'data' => new PackageResource($package)
        ], 200);
    }
    
    public function destroy($id)
    {
        $package = Package::findOrFail($id);
        $package->delete();
        return response()->json(['message' => 'Paket berhasil dihapus'], 200);
    }
}
