<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
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
            'user' => new UserResource($this->whenLoaded('user')),
            'table' => new BilliardTableResource($this->whenLoaded('table')),
            'package' => new PackageResource($this->whenLoaded('package')),
            'tanggal' => $this->tanggal,
            'waktu_mulai' => $this->waktu_mulai,
            'waktu_selesai' => $this->waktu_selesai,
            'durasi_jam' => $this->durasi_jam,
            'total_harga' => $this->total_harga,
            'status' => $this->status,
            'catatan' => $this->catatan,
            'created_at' => $this->created_at,
            'payment' => new PaymentResource($this->whenLoaded('payment')),
        ];
    }
}
