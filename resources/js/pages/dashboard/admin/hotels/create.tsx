import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface CreateHotelProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function CreateHotel({ auth }: CreateHotelProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        location: '',
        description: '',
        price: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/hotels`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Hotel" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <Label className="block text-gray-700">Name</Label>
                                <Input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.name && <div className="text-red-600">{errors.name}</div>}
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700">Location</Label>
                                <Input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.location && <div className="text-red-600">{errors.location}</div>}
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700">Description</Label>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full"
                                ></Textarea>
                                {errors.description && <div className="text-red-600">{errors.description}</div>}
                            </div>
                            <div className="mb-4">
                                <Label className="block text-gray-700">Price</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.price && <div className="text-red-600">{errors.price}</div>}
                            </div>
                            <Button type="submit" disabled={processing} className="rounded bg-blue-500 px-4 py-2 text-white">
                                Create Hotel
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
