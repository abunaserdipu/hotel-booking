import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface Hotel {
    id: number;
    name: string;
    location: string;
    description: string;
    price: number;
}

interface Props {
    hotels: Hotel[];
}

export default function PublicHotelsIndex({ hotels }: Props) {
    const { data, setData, get } = useForm({
        query: '',
    });

    // Handle search submission on input change
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/hotels', {
            // Replace the route() helper with the actual URL
            preserveState: true,
            replace: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Hotels" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <form onSubmit={handleSearch} className="flex items-center space-x-4">
                            <Input
                                type="text"
                                value={data.query}
                                onChange={(e) => setData('query', e.target.value)}
                                placeholder="Search hotels by name, location or description..."
                                className="focus:ring-opacity-50 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200"
                            />
                            <button type="submit" className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                                Search
                            </button>
                        </form>
                    </div>

                    {hotels.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {hotels.map((hotel) => (
                                <div key={hotel.id} className="overflow-hidden rounded-lg bg-white shadow-lg">
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold">{hotel.name}</h3>
                                        <p className="mb-4 text-gray-600">{hotel.location}</p>
                                        <p className="mb-2 text-lg font-semibold text-gray-800">${hotel.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">{hotel.description}</p>
                                        <Link
                                            href={`hotels/${hotel.id}`}
                                            className="mt-4 inline-block rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-lg text-gray-500">No hotels found matching your search.</div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
