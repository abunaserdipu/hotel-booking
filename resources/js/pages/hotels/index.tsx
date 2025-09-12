import { Link, router } from '@inertiajs/react';
interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
}

interface HotelsIndexProps {
    hotels: Hotel[];
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function HotelsIndex({ hotels, auth }: HotelsIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this hotel?')) {
            router.delete(`/admin/hotels/${id}`);
        }
    };

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 flex justify-end">
                <Link href="/admin/hotels/create" className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                    Add New Hotel
                </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Location</th>
                        <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Price</th>
                        <th className="bg-gray-50 px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {hotels.map((hotel) => (
                        <tr key={hotel.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{hotel.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{hotel.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${hotel.price.toFixed(2)}</td>
                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                <Link href={`/admin/hotels/${hotel.id}/edit`} className="mr-4 text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(hotel.id)} className="text-red-600 hover:text-red-900">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
