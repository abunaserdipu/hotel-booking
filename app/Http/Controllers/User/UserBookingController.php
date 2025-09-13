<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserBookingController extends Controller
{
    /**
     * Display a listing of the user's own bookings.
     */
    public function index()
    {
        $bookings = Auth::user()->bookings()->with('hotel')->latest()->get();

        return Inertia::render('user/bookings', [
            'bookings' => $bookings,
        ]);
    }

    /**
     * Remove the specified booking from storage.
     */
    public function destroy(Booking $booking)
    {
        // Check if the authenticated user owns the booking
        if ($booking->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $booking->delete();

        return redirect()->route('user.bookings.index')->with('success', 'Booking canceled successfully.');
    }
}
