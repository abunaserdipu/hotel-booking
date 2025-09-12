import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';

// Define hotel type
interface Hotel {
    id: number;
    name: string;
    location: string;
    description?: string | null;
    price: number | string;
}

// Define props type
interface HotelShowProps {
    hotel: Hotel;
}

export default function HotelShow({ hotel }: HotelShowProps) {
    const { data, setData, post, processing, errors } = useForm({
        guest_name: '',
        guest_email: '',
        phone_number: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(`/bookings/${hotel.id}`);
    };

    return (
        <GuestLayout>
            <Head title={hotel.name} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h1 className="mb-4 text-3xl font-bold">{hotel.name}</h1>
                        <p className="mb-2 text-gray-600">{hotel.location}</p>
                        <p className="mb-4 text-2xl font-semibold text-gray-800">${Number(hotel.price).toFixed(2)}</p>
                        <p className="mb-6 text-gray-500">{hotel.description}</p>
                        <div className="border-t pt-6">
                            <h2 className="mb-4 text-2xl font-semibold">Book this hotel</h2>
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="guest_name" className="block text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        id="guest_name"
                                        type="text"
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                        value={data.guest_name}
                                        onChange={(e) => setData('guest_name', e.target.value)}
                                        required
                                    />
                                    {errors.guest_name && <div className="mt-1 text-sm text-red-500">{errors.guest_name}</div>}
                                </div>
                                {/* Add other input fields for guest_email and phone_number */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                                >
                                    Book Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
