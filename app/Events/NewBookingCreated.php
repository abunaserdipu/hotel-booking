<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewBookingCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $booking;
    /**
     * Create a new event instance.
     */
    public function __construct(\App\Models\Booking $booking)
    {
        $this->booking = $booking;
        // \Log::info('NewBookingCreated event instance created for booking: ' . $booking->id);
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('admin.bookings'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'booking-confirmed';
    }

    public function broadcastWith(): array
    {
        // We'll load the hotel relationship to get the name
        $this->booking->load('hotel');

        return [
            'booking' => [
                'user_name' => $this->booking->guest_name,
                'hotel_name' => $this->booking->hotel->name,
            ],
        ];
    }
}
