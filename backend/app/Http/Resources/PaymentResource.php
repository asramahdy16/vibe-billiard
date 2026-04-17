<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'booking_id' => $this->booking_id,
            'booking' => new BookingResource($this->whenLoaded('booking')),
            'metode' => $this->metode,
            'jumlah' => $this->jumlah,
            'status_bayar' => $this->status_bayar,
            'bukti_transfer' => $this->bukti_transfer,
            'paid_at' => $this->paid_at,
        ];
    }
}
