import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <div className="mx-auto flex w-full max-w-7xl justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                        <AppLogoIcon className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href='login' className="text-sm text-gray-700 hover:underline dark:text-gray-500">
                        Log in
                    </Link>
                    <Link href={`register`} className="text-sm text-gray-700 hover:underline dark:text-gray-500">
                        Register
                    </Link>
                </div>
            </div>
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-screen sm:rounded-lg dark:bg-gray-800">{children}</div>
        </div>
    );
}
