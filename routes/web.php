<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\HotelController;
use App\Models\Hotel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::middleware(['auth', 'can:isAdmin'])->group(function () {
    Route::get('dashboard', [HotelController::class, 'index'])->name('dashboard');
    Route::get('/admin/hotels/create', [HotelController::class, 'create'])->name('admin.hotels.create');
    Route::post('/admin/hotels', [HotelController::class, 'store'])->name('admin.hotels.store');
    Route::get('/admin/hotels/{hotel}/edit', [HotelController::class, 'edit'])->name('admin.hotels.edit');
    Route::put('/admin/hotels/{hotel}', [HotelController::class, 'update'])->name('admin.hotels.update');
    Route::delete('/admin/hotels/{hotel}', [HotelController::class, 'destroy'])->name('admin.hotels.destroy');
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
});


// Frontend Routes
Route::get('/', [HotelController::class, 'publicIndex'])->name('home');
Route::get('/hotels/{hotel}', function (Hotel $hotel) {
    return Inertia::render('frontend/hotels/show', [
        'hotel' => $hotel,
    ]);
})->name('hotels.show');
Route::post('/hotels/{hotel}/book', [BookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{reference}', [BookingController::class, 'show'])->name('booking.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
