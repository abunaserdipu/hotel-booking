<?php

namespace App\Http\Controllers\Frontend;

use App\Mail\BookingConfirmationMail;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FrontBookingController extends Controller
{
    public function store(Request $request, Hotel $hotel)
    {
        $validatedData = $request->validate([
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'phone_number' => 'nullable|string|max:20',
        ]);

        $booking = $hotel->bookings()->create([
            'booking_reference' => (string) Str::uuid(),
            'guest_name' => $validatedData['guest_name'],
            'guest_email' => $validatedData['guest_email'],
            'phone_number' => $validatedData['phone_number'],
            'user_id' => auth()->id(), // will be NULL if guest, user_id if logged in
        ]);

        Mail::to($booking->guest_email)->send(new BookingConfirmationMail($booking));

        return redirect()->route('booking.show', ['reference' => $booking->booking_reference]);
    }

    public function show($reference)
    {
        $booking = Booking::with('hotel')->where('booking_reference', $reference)->firstOrFail();
        return Inertia::render('frontend/bookingDetails', [
            'booking' => $booking,
        ]);
    }
}
