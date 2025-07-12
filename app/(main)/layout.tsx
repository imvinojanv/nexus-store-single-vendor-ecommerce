import AppNavbar from '@/components/shared/app-navbar';
import AppFooter from '@/components/shared/app-footer';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <AppNavbar />
            <main className="flex-1">{children}</main>
            <AppFooter />
        </div>
    );
}