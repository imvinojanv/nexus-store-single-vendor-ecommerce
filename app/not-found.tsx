import Link from "next/link";

import { Button } from "@/components/ui/button";
import AppNavbar from '@/components/shared/app-navbar';
import AppFooter from '@/components/shared/app-footer';

export default function NotFound() {
    return (
        <div className="flex flex-col">
            <AppNavbar />
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20">
                <h1 className="text-6xl font-extrabold text-primary font-headline tracking-tighter">404</h1>
                <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Button asChild className="mt-8">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
            <AppFooter />
        </div>
    );
}