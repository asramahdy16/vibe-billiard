<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\PaymentStatus;

class Payment extends Model
{
    protected $fillable = [
        'booking_id',
        'metode',
        'jumlah',
        'status_bayar',
        'bukti_transfer',
        'paid_at',
    ];

    protected $casts = [
        'status_bayar' => PaymentStatus::class,
        'jumlah' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
