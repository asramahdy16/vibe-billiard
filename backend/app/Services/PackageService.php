<?php

namespace App\Services;

use App\Models\Package;
use Carbon\Carbon;

class PackageService
{
    /**
     * Cek apakah memenuhi syarat untuk Paket Hemat.
     */
    public function isEligibleForPaketHemat(string $date, string $start, string $end): bool
    {
        $dayOfWeek = Carbon::parse($date)->dayOfWeek;
        // 1 (Senin) sampai 5 (Jumat)
        $isWeekday = $dayOfWeek >= 1 && $dayOfWeek <= 5;

        $startTime = Carbon::parse($start);
        $endTime = Carbon::parse($end);

        $isWithinAllowedHours = $startTime->gte(Carbon::parse('08:00'))
                             && $endTime->lte(Carbon::parse('17:00'));

        $durationHours = $startTime->diffInHours($endTime);
        $hasMinDuration = $durationHours >= 2;

        return $isWeekday && $isWithinAllowedHours && $hasMinDuration;
    }
}
