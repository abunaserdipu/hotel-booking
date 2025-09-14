import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Define the shape of the booking data
interface Booking {
    hotel_name: string;
    user_name: string;
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard({ auth }: Props) {
    const [notification, setNotification] = useState<Booking | null>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        // console.log('Echo instance:', window.Echo);
        // console.log('Auth user:', auth.user);
        // Corrected: Use window.Echo to access the global Echo instance
        const channel = window.Echo.private('admin.bookings');

        channel.listen('booking-confirmed', (e: { booking: Booking }) => {
            console.log('New booking received!', e); // This should now log the event
            setNotification(e.booking);
            setShowToast(true);

            setTimeout(() => setShowToast(false), 5000);
        });

        return () => {
            window.Echo.leaveChannel('admin.bookings');
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="mb-4 text-xl font-bold">Welcome, {auth.user.name}!</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Real-time Notification Toast */}
            {showToast && notification && (
                <div className="fixed right-5 bottom-5 z-50">
                    <div className="animate-slideInFromRight flex items-center space-x-4 rounded-lg bg-green-500 p-4 text-white shadow-xl">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <p className="font-bold">New Booking!</p>
                            <p className="text-sm">
                                {notification.user_name} has made a new booking at {notification.hotel_name}.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
