import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';

interface Hotel {
    id: number;
    name: string;
    location: string;
}

interface Booking {
    id: number;
    booking_reference: string;
    guest_name: string;
    guest_email: string;
    hotel: Hotel;
}

interface Props {
    booking: Booking;
}

export default function BookingDetails({ booking }: Props) {
    return (
        <GuestLayout>
            <Head title="Booking Confirmed" />
            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 text-center shadow-lg">
                        <h1 className="mb-4 text-3xl font-bold text-green-600">Booking Confirmed! 🎉</h1>
                        <p className="mb-2 text-lg text-gray-800">Thank you for your booking, **{booking.guest_name}**!</p>
                        <p className="mb-4 text-gray-600">A confirmation email has been sent to **{booking.guest_email}**.</p>
                        <div className="rounded-md bg-gray-100 p-4">
                            <h3 className="mb-2 text-xl font-semibold">Booking Reference</h3>
                            <p className="text-3xl font-bold text-indigo-600">{booking.booking_reference}</p>
                        </div>
                        <div className="mt-6 text-left">
                            <h4 className="mb-2 text-lg font-semibold">Booking Details:</h4>
                            <p>
                                <strong>Hotel:</strong> {booking.hotel.name}
                            </p>
                            <p>
                                <strong>Location:</strong> {booking.hotel.location}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
