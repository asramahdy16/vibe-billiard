<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\TableStatus;

class BilliardTable extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'nama_meja',
        'deskripsi',
        'gambar',
        'status',
    ];

    protected $casts = [
        'status' => TableStatus::class,
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'table_id');
    }
}
