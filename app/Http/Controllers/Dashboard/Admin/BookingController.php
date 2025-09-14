<?php

namespace App\Http\Controllers\Dashboard\Admin;

use App\Models\Booking;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $this->authorize('viewAny', Booking::class);

        // Eager load the related hotel to avoid N+1 query problems
        $bookings = Booking::with('hotel')->latest()->get();

        return Inertia::render('dashboard/admin/bookings/index', [
            'bookings' => $bookings,
        ]);
    }

    public function destroy(Booking $booking)
    {
        $this->authorize('delete', $booking);
        $booking->delete();

        return redirect()->route('bookings')->with('success', 'Booking deleted successfully.');
    }
}
