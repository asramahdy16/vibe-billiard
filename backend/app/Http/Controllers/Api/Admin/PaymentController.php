<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use App\Http\Resources\PaymentResource;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with('booking.user')->orderBy('created_at', 'desc')->get();
        return PaymentResource::collection($payments);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status_bayar' => 'required|string|in:unpaid,paid,refunded'
        ]);
        
        $payment = Payment::findOrFail($id);
        $payment->update([
            'status_bayar' => $request->status_bayar,
            'paid_at' => $request->status_bayar === 'paid' && !$payment->paid_at ? \Carbon\Carbon::now() : $payment->paid_at,
        ]);
        
        return response()->json([
            'message' => 'Status pembayaran berhasil diupdate',
            'data' => new PaymentResource($payment)
        ], 200);
    }
}
