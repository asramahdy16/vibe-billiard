<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Package;
use Carbon\Carbon;
use App\Enums\BookingStatus;

class BookingService
{
    /**
     * Cek apakah ada konflik jadwal booking pada meja yang sama
     */
    public function hasConflict(int $tableId, string $date, string $start, string $end, ?int $excludeId = null): bool
    {
        return Booking::where('table_id', $tableId)
            ->where('tanggal', $date)
            ->whereNotIn('status', [BookingStatus::CANCELLED->value])
            ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
            ->where(function ($query) use ($start, $end) {
                // Konversi string ke format waktu seragam yang bisa diperbandingkan oleh query DB
                // atau cukup pakai string asalkan formatnya HH:MM:00
                $query->whereBetween('waktu_mulai', [$start, $end])
                      ->orWhereBetween('waktu_selesai', [$start, $end])
                      ->orWhere(function ($q) use ($start, $end) {
                          $q->where('waktu_mulai', '<=', $start)
                            ->where('waktu_selesai', '>=', $end);
                      });
            })
            ->exists();
    }

    /**
     * Hitung total harga berdasarkan durasi dan paket 
     */
    public function calculateTotalPrice(Package $package, int $durationHours): float
    {
        if ($package->harga_flat !== null) {
            // Paket Hemat: harga flat untuk durasi minimal, selebihnya mengikuti tarif jam reguler
            $extraHours = max(0, $durationHours - $package->durasi_min_jam);
            
            // Asumsi selalu ada paket reguler yang is_active
            $regularPackage = Package::where('is_active', true)->whereNull('harga_flat')->first();
            $regularRate = $regularPackage ? $regularPackage->harga_per_jam : 35000;
            
            return $package->harga_flat + ($extraHours * $regularRate);
        }

        // Paket Reguler: harga per jam * durasi
        return $package->harga_per_jam * $durationHours;
    }
}
