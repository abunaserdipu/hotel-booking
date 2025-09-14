import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface Hotel {
    id: number;
    name: string;
    location: string;
    description: string;
    price: number;
}

interface Props {
    hotels: Hotel[];
    exchangeRates: Record<string, number>;
    selectedCurrency: string;
    [key: string]: any;
}

export default function PublicHotelsIndex() {
    const { props } = usePage<Props>();
    // Corrected: Provide a default empty object for exchangeRates to prevent errors
    const { hotels, exchangeRates = {}, selectedCurrency = 'USD' } = props;

    const { data, setData, get } = useForm({
        query: '',
    });

    // Use state to manage the currently selected currency
    const [currency, setCurrency] = useState(selectedCurrency);

    // Get the currency symbol for display
    const getCurrencySymbol = (currencyCode: string): string => {
        switch (currencyCode) {
            case 'USD':
                return '$';
            case 'EUR':
                return '€';
            case 'GBP':
                return '£';
            case 'JPY':
                return '¥';
            default:
                return currencyCode;
        }
    };

    // Function to calculate the converted price
    const getConvertedPrice = (price: number): string => {
        const basePriceInUSD = price;
        const rate = exchangeRates[currency] || 1;
        const convertedPrice = basePriceInUSD * rate;
        const symbol = getCurrencySymbol(currency);
        return `${symbol}${convertedPrice.toFixed(2)}`;
    };

    // Handle search submission on input change
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/hotels', {
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

                    {/* Currency Selection Dropdown */}
                    <div className="mb-6 flex justify-end">
                        <label htmlFor="currency-select" className="mr-2 self-center font-medium text-gray-700">
                            Display prices in:
                        </label>
                        <select
                            id="currency-select"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="block w-auto rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                        >
                            {Object.keys(exchangeRates).map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>
                    </div>

                    {hotels.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {hotels.map((hotel) => (
                                <div key={hotel.id} className="overflow-hidden rounded-lg bg-white shadow-lg">
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-bold">{hotel.name}</h3>
                                        <p className="mb-4 text-gray-600">{hotel.location}</p>
                                        <p className="mb-2 text-lg font-semibold text-gray-800">{getConvertedPrice(hotel.price)}</p>
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
