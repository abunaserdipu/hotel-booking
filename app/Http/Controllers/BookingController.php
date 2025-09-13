<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmationMail;
use App\Models\Booking;
use App\Models\Hotel;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookingController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        // $this->authorize('viewAny', Booking::class);

        // Eager load the related hotel to avoid N+1 query problems
        $bookings = Booking::with('hotel')->latest()->get();

        return Inertia::render('admin/bookings/index', [
            'bookings' => $bookings,
        ]);
    }

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
        ]);

        Mail::to($booking->guest_email)->send(new BookingConfirmationMail($booking));

        return redirect()->route('booking.show', ['reference' => $booking->booking_reference]);
    }

    public function show($reference)
    {
        $booking = Booking::with('hotel')->where('booking_reference', $reference)->firstOrFail();
        return Inertia::render('bookingDetails', [
            'booking' => $booking,
        ]);
    }

    public function destroy(Booking $booking)
    {
        // $this->authorize('delete', $booking);
        $booking->delete();

        return redirect()->route('bookings')->with('success', 'Booking deleted successfully.');
    }
}
