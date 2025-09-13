import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
}

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
    created_at: string;
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    bookings: Booking[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Bookings', href: '/dashboard' }];

export default function Bookings({ auth, bookings }: Props) {
    const handleCancel = (id: number) => {
        if (confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
            router.delete(`/user/bookings/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Bookings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Your Reservations</h3>
                            {bookings.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Reference
                                                </th>
                                                <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Hotel
                                                </th>
                                                <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Location
                                                </th>
                                                <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Date
                                                </th>
                                                <th className="bg-gray-50 px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.booking_reference}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.hotel.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{booking.hotel.location}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(booking.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                        <button onClick={() => handleCancel(booking.id)} className="text-red-600 hover:text-red-900">
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">You have no upcoming bookings.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
