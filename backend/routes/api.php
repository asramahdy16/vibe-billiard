<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TableController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;

use App\Http\Controllers\Api\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\Admin\TableController as AdminTableController;
use App\Http\Controllers\Api\Admin\PackageController as AdminPackageController;
use App\Http\Controllers\Api\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Api\Admin\PaymentController as AdminPaymentController;

// Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public routes
Route::get('/tables', [TableController::class, 'index']);
Route::get('/tables/{id}', [TableController::class, 'show']);
Route::get('/packages', [PackageController::class, 'index']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    // Customer Booking & Payment
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    
    Route::post('/bookings/{id}/payment', [PaymentController::class, 'store']);

    // Admin Routes
    Route::middleware('is_admin')->prefix('admin')->group(function () {
        Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats']);

        Route::apiResource('tables', AdminTableController::class);
        Route::apiResource('packages', AdminPackageController::class);
        
        Route::get('/bookings', [AdminBookingController::class, 'index']);
        Route::patch('/bookings/{id}/status', [AdminBookingController::class, 'updateStatus']);
        
        Route::get('/payments', [AdminPaymentController::class, 'index']);
        Route::patch('/payments/{id}/status', [AdminPaymentController::class, 'updateStatus']);
    });
});
