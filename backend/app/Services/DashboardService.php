<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BilliardTable;
use App\Enums\BookingStatus;
use Carbon\Carbon;

class DashboardService
{
    public function getStats(): array
    {
        $today = Carbon::today()->format('Y-m-d');
        
        $totalBookingsToday = Booking::where('tanggal', $today)
            ->whereNotIn('status', [BookingStatus::CANCELLED->value])
            ->count();
            
        $todayRevenue = Booking::where('tanggal', $today)
            ->where('status', BookingStatus::COMPLETED)
            ->sum('total_harga'); // Atau sum dari payments yang 'paid'
            
        $tablesInUse = BilliardTable::where('status', 'in_use')->count();
        $pendingPayments = Booking::whereHas('payment', function($q) {
            $q->where('status_bayar', 'unpaid');
        })->count();
        
        return [
            'total_bookings_today' => $totalBookingsToday,
            'today_revenue' => $todayRevenue,
            'tables_in_use' => $tablesInUse,
            'pending_payments' => $pendingPayments,
        ];
    }
}
