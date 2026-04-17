<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\BookingStatus;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'table_id',
        'package_id',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
        'durasi_jam',
        'total_harga',
        'status',
        'catatan',
    ];

    protected $casts = [
        'status' => BookingStatus::class,
        'total_harga' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function table()
    {
        return $this->belongsTo(BilliardTable::class, 'table_id');
    }

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
