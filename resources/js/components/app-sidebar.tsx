import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { Bookmark, Building } from 'lucide-react';
import AppLogo from './app-logo';

type User = {
    id: number;
    name: string;
    email: string;
    role: string; // "admin" | "user" or whatever you use
};

type PageProps = {
    auth: {
        user: User | null;
    };
};
// Define navigation items based on the user's role
const getNavItems = (isAdmin: boolean) => {
    if (isAdmin) {
        return [
            {
                title: 'Hotels',
                href: '/admin/hotels',
                icon: Building,
            },
            {
                title: 'Bookings',
                href: '/admin/bookings', // Assuming 'admin.bookings.index' is the correct route
                icon: Bookmark,
            },
        ];
    } else {
        return [
            {
                title: 'My Bookings',
                href: '/user/bookings',
                icon: Bookmark,
            },
        ];
    }
};

export function AppSidebar() {
    // Get the auth data from the shared props
    const { auth } = usePage<PageProps>().props;
    const userIsAdmin = auth.user?.role === 'admin'; // Default to false if user is not logged in

    // Get the navigation items based on the user's role
    const mainNavItems = getNavItems(userIsAdmin);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
