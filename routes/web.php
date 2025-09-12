<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HotelController;
use App\Models\Hotel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'can:isAdmin'])->group(function () {
    Route::get('dashboard', [HotelController::class, 'index'])->name('dashboard');
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
});


// Frontend Routes
Route::get('/hotels', [HotelController::class, 'publicIndex'])->name('hotels.index');
Route::get('/hotels/{hotel}', function (Hotel $hotel) {
    return Inertia::render('frontend/hotels/show', [
        'hotel' => $hotel,
    ]);
})->name('hotels.show');
Route::post('/hotels/{hotel}/book', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{reference}', [BookingController::class, 'show'])->name('booking.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
