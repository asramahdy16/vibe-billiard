<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Package;
use App\Services\BookingService;
use App\Services\PackageService;
use App\Http\Requests\Booking\CreateBookingRequest;
use App\Http\Resources\BookingResource;
use Carbon\Carbon;
use App\Enums\BookingStatus;

class BookingController extends Controller
{
    protected $bookingService;
    protected $packageService;

    public function __construct(BookingService $bookingService, PackageService $packageService)
    {
        $this->bookingService = $bookingService;
        $this->packageService = $packageService;
    }

    public function index(Request $request)
    {
        $bookings = Booking::where('user_id', $request->user()->id)
            ->with(['table', 'package', 'payment'])
            ->orderBy('created_at', 'desc')
            ->get();
            
        return BookingResource::collection($bookings);
    }

    public function store(CreateBookingRequest $request)
    {
        $package = Package::findOrFail($request->package_id);
        
        // Cek eligibility Paket Hemat jika package tersebut adalah paket hemat
        if ($package->harga_flat !== null) {
            $isEligible = $this->packageService->isEligibleForPaketHemat(
                $request->tanggal, 
                $request->waktu_mulai, 
                $request->waktu_selesai
            );
            
            if (!$isEligible) {
                return response()->json([
                    'message' => 'Paket Hemat hanya berlaku pada hari biasa pukul 08:00 - 17:00 dengan durasi minimal 2 jam.'
                ], 400);
            }
        }
        
        // Cek conflict
        $hasConflict = $this->bookingService->hasConflict(
            $request->table_id,
            $request->tanggal,
            $request->waktu_mulai,
            $request->waktu_selesai
        );
        
        if ($hasConflict) {
            return response()->json([
                'message' => 'Meja sudah dipesan untuk jadwal tersebut.'
            ], 409);
        }
        
        $startTime = Carbon::parse($request->waktu_mulai);
        $endTime = Carbon::parse($request->waktu_selesai);
        $durationHours = ceil($startTime->floatDiffInHours($endTime)); // pembulatan ke atas
        
        $totalHarga = $this->bookingService->calculateTotalPrice($package, $durationHours);
        
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'table_id' => $request->table_id,
            'package_id' => $request->package_id,
            'tanggal' => $request->tanggal,
            'waktu_mulai' => $request->waktu_mulai,
            'waktu_selesai' => $request->waktu_selesai,
            'durasi_jam' => $durationHours,
            'total_harga' => $totalHarga,
            'status' => BookingStatus::PENDING,
            'catatan' => $request->catatan,
        ]);
        
        return response()->json([
            'message' => 'Booking berhasil dibuat',
            'data' => new BookingResource($booking->load(['table', 'package']))
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $booking = Booking::with(['table', 'package', 'payment'])->findOrFail($id);
        
        if ($booking->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        
        return new BookingResource($booking);
    }
}
