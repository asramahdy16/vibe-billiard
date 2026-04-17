<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Payment;
use App\Http\Requests\Payment\ProcessPaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Enums\PaymentStatus;
use Carbon\Carbon;

class PaymentController extends Controller
{
    public function store(ProcessPaymentRequest $request, $bookingId)
    {
        $booking = Booking::findOrFail($bookingId);
        
        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        
        if ($booking->payment) {
            return response()->json(['message' => 'Payment already exists for this booking'], 400);
        }
        
        $payment = Payment::create([
            'booking_id' => $booking->id,
            'metode' => $request->metode,
            'jumlah' => $booking->total_harga,
            'status_bayar' => $request->metode === 'cash' ? PaymentStatus::UNPAID : PaymentStatus::PAID, // kalau transfer ewallet anggap auto paid utk skrg, atau unpaid tgg konfirmasi
            'bukti_transfer' => $request->bukti_transfer,
            'paid_at' => $request->metode !== 'cash' ? Carbon::now() : null, // simplifikasi
        ]);
        
        return response()->json([
            'message' => 'Payment processed successfully',
            'data' => new PaymentResource($payment)
        ], 201);
    }
}
