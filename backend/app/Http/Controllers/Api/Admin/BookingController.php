<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Http\Requests\Booking\UpdateBookingStatusRequest;
use App\Http\Resources\BookingResource;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['user', 'table', 'package', 'payment'])->orderBy('created_at', 'desc')->get();
        return BookingResource::collection($bookings);
    }

    public function updateStatus(UpdateBookingStatusRequest $request, $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update(['status' => $request->status]);
        
        // kalau in_progress, update status meja jg
        if ($request->status === 'in_progress') {
            $booking->table->update(['status' => 'in_use']);
        } elseif (in_array($request->status, ['completed', 'cancelled'])) {
            $booking->table->update(['status' => 'available']);
        }
        
        return response()->json([
            'message' => 'Status booking berhasil diupdate',
            'data' => new BookingResource($booking)
        ], 200);
    }
}
