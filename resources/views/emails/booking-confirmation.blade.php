<h1>Booking Confirmation</h1>
<p>Hello {{ $booking->guest_name }},</p>
<p>Thank you for your booking! Your booking reference is: <strong>{{ $booking->booking_reference }}</strong></p>
<p>You can view your booking details here: <a href="{{ url('/bookings/' . $booking->booking_reference) }}">View
        Booking</a></p>
