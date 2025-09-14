<?php

namespace App\Http\Controllers\Frontend;

use App\Enums\BookingStatus;
use App\Events\NewBookingCreated;
use App\Mail\BookingConfirmationMail;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Models\Booking;
use Illuminate\Http\Request;

class FrontPaymentController extends Controller
{
    public function show($reference)
    {
        $booking = Booking::with('hotel')->where('booking_reference', $reference)->firstOrFail();

        return inertia('frontend/payment', [
            'booking' => $booking,
        ]);
    }

    public function confirm($reference)
    {
        $booking = Booking::where('booking_reference', $reference)->firstOrFail();

        $booking->update([
            'status' => BookingStatus::Paid,
        ]);

        // Send confirmation email only after payment success
        Mail::to($booking->guest_email)->send(new BookingConfirmationMail($booking));

        event(new NewBookingCreated($booking));
        // logger()->info('NewBookingCreated event dispatched for booking: ' . $booking->id);

        return redirect()->route('booking.show', ['reference' => $booking->booking_reference]);
    }
}
