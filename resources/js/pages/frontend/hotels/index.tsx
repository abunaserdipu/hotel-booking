import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';
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
    return (
        <GuestLayout>
            <Head title="Hotels" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                                    <p className="text-gray-600 mb-4">{hotel.location}</p>
                                    <p className="text-gray-800 font-semibold text-lg mb-2">${hotel.price.toFixed(2)}</p>
                                    <p className="text-gray-500 text-sm">{hotel.description}</p>
                                    <Link href={`/hotels/${hotel.id}`} className="mt-4 inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
