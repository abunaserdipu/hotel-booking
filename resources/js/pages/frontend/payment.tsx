import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';

interface Booking {
    booking_reference: string;
    guest_name: string;
    guest_email: string;
    status: string;
    hotel: {
        name: string;
        price: number;
    };
}

export default function PaymentShow({ booking }: { booking: Booking }) {
    const { post, processing } = useForm();

    const handlePayment = () => {
        post(`/payment/${booking.booking_reference}/confirm`);
    };

    return (
        <GuestLayout>
            <Head title="Payment Confirmation" />
            <div className="py-12">
                <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
                    <h1 className="mb-4 text-2xl font-bold">Payment Confirmation</h1>
                    <p className="mb-2">
                        Hotel: <strong>{booking.hotel.name}</strong>
                    </p>
                    <p className="mb-2">Guest: {booking.guest_name}</p>
                    <p className="mb-4">
                        Amount: <strong>${booking.hotel.price}</strong>
                    </p>

                    <Button
                        onClick={handlePayment}
                        disabled={processing}
                        className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                    >
                        Confirm Payment
                    </Button>
                </div>
            </div>
        </GuestLayout>
    );
}
