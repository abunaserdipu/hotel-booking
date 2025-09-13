import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import HotelsIndex from './hotels';

interface DashboardProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    hotels: {
        id: number;
        name: string;
        location: string;
        price: number;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard({ auth, hotels }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-4 text-xl leading-tight font-semibold text-gray-800">Manage Hotels</h2>
                            <HotelsIndex hotels={hotels} auth={auth} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
