import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Providers } from '@/components/shared/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        default: 'Nexus Store - Premium E-Commerce Experience',
        template: '%s | Nexus Store',
    },
    description: 'Discover premium products at unbeatable prices. Shop electronics, fashion, home & garden, and more with fast shipping and excellent customer service.',
    keywords: ['e-commerce', 'online shopping', 'electronics', 'fashion', 'home', 'garden'],
    authors: [{ name: 'Nexus Store Team' }],
    creator: 'Nexus Store',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://nexus-store.com',
        siteName: 'Nexus Store',
        title: 'Nexus Store - Premium E-Commerce Experience',
        description: 'Discover premium products at unbeatable prices. Shop electronics, fashion, home & garden, and more.',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Nexus Store',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nexus Store - Premium E-Commerce Experience',
        description: 'Discover premium products at unbeatable prices.',
        creator: '@nexusstore',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Providers>
                        {children}
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}