<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\User\UserBookingController;
use App\Models\Hotel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');
// Public routes for all users
Route::get('/', [HotelController::class, 'publicIndex'])->name('home');

Route::get('/hotels', [SearchController::class, 'search'])->name('hotels.index');
Route::get('/hotels/{hotel}', function (Hotel $hotel) {
    return Inertia::render('frontend/hotels/show', [
        'hotel' => $hotel,
    ]);
})->name('hotels.show');
Route::post('/hotels/{hotel}/book', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{reference}', [BookingController::class, 'show'])->name('booking.show');

// User-specific routes
Route::middleware(['auth'])->group(function () {
    // This is the new dashboard for regular users
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/user/bookings', [UserBookingController::class, 'index'])->name('user.bookings.index');
    Route::delete('/user/bookings/{booking}', [UserBookingController::class, 'destroy'])->name('user.bookings.destroy');
});

// Admin-specific routes
Route::middleware(['auth', 'can:isAdmin'])->group(function () {
    Route::get('admin/hotels', [HotelController::class, 'index'])->name('admin.hotels.index');
    Route::get('/admin/hotels/create', [HotelController::class, 'create'])->name('admin.hotels.create');
    Route::post('/admin/hotels', [HotelController::class, 'store'])->name('admin.hotels.store');
    Route::get('/admin/hotels/{hotel}/edit', [HotelController::class, 'edit'])->name('admin.hotels.edit');
    Route::put('/admin/hotels/{hotel}', [HotelController::class, 'update'])->name('admin.hotels.update');
    Route::delete('/admin/hotels/{hotel}', [HotelController::class, 'destroy'])->name('admin.hotels.destroy');

    // Booking management routes
    Route::get('/admin/bookings', [BookingController::class, 'index'])->name('bookings');
    Route::delete('/admin/bookings/{booking}', [BookingController::class, 'destroy'])->name('admin.bookings.destroy');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
