<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PackageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_paket' => $this->nama_paket,
            'harga_per_jam' => $this->harga_per_jam,
            'harga_flat' => $this->harga_flat,
            'durasi_min_jam' => $this->durasi_min_jam,
            'hari_berlaku' => $this->hari_berlaku,
            'jam_mulai' => $this->jam_mulai,
            'jam_selesai' => $this->jam_selesai,
            'is_active' => $this->is_active,
        ];
    }
}
