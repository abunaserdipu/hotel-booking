<?php

namespace App\Http\Controllers\Dashboard\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserBookingController extends Controller
{

    public function index()
    {
        $bookings = Auth::user()->bookings()->with('hotel')->latest()->get();

        return Inertia::render('dashboard/user/bookings', [
            'bookings' => $bookings,
        ]);
    }


    public function destroy(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $booking->delete();

        return redirect()->route('user.bookings.index')->with('success', 'Booking canceled successfully.');
    }
}
