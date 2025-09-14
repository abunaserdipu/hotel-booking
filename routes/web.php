<?php


use App\Http\Controllers\Dashboard\Admin\BookingController;
use App\Http\Controllers\Dashboard\Admin\HotelController;
use App\Http\Controllers\Dashboard\User\UserBookingController;
use App\Http\Controllers\Frontend\FrontBookingController;
use App\Http\Controllers\Frontend\FrontHotelController;
use App\Http\Controllers\Frontend\SearchController;

use App\Models\Hotel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Public routes for all users
Route::get('/', [FrontHotelController::class, 'index'])->name('home');

Route::get('/hotels', [SearchController::class, 'search'])->name('hotels.index');
Route::get('/hotels/{hotel}', function (Hotel $hotel) {
    return Inertia::render('frontend/hotels/show', [
        'hotel' => $hotel,
    ]);
})->name('hotels.show');
Route::post('/hotels/{hotel}/book', [FrontBookingController::class, 'store'])->name('bookings.store');
Route::get('/bookings/{reference}', [FrontBookingController::class, 'show'])->name('booking.show');


// User-specific routes
Route::middleware(['auth'])->group(function () {
    // This is the common dashboard
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
