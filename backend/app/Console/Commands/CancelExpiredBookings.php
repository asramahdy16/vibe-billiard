<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Booking;
use App\Enums\BookingStatus;
use Carbon\Carbon;

class CancelExpiredBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'booking:cancel-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Batalkan booking pending yang sudah melewati batas waktu (expired)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiryHours = env('BOOKING_EXPIRY_HOURS', 2);
        
        $expiredTime = Carbon::now()->subHours($expiryHours);

        $expiredBookings = Booking::where('status', BookingStatus::PENDING)
            ->where('created_at', '<=', $expiredTime)
            ->get();

        $count = 0;
        foreach ($expiredBookings as $booking) {
            $booking->update([
                'status' => BookingStatus::CANCELLED,
                'catatan' => $booking->catatan . "\n[SISTEM] Dibatalkan otomatis karena melewati batas waktu pembayaran ($expiryHours jam)."
            ]);
            $count++;
        }

        $this->info("Berhasil membatalkan $count booking yang sudah expired.");
    }
}
