'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import { store } from '@/store/store';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </Provider>
    );
}