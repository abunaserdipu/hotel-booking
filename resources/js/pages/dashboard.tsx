import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
        </AppLayout>
    );
}
