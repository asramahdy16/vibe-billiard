<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BilliardTableResource extends JsonResource
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
            'nama_meja' => $this->nama_meja,
            'deskripsi' => $this->deskripsi,
            'gambar' => $this->gambar,
            'status' => $this->status,
        ];
    }
}
