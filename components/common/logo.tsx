'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const sizeConfig = {
    small: {
        width: 26,
        height: 26,
        textClass: 'text-xl',
    },
    medium: {
        width: 32,
        height: 32,
        textClass: 'text-2xl',
    },
    large: {
        width: 40,
        height: 40,
        textClass: 'text-3xl',
    },
};

export function Logo({ href = "/", size = "medium" }: { 
    href?: string;
    size?: "small" | "medium" | "large";
}) {
    const { resolvedTheme } = useTheme();
    const [logoSrc, setLogoSrc] = useState('/logo-light.svg');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            setLogoSrc(resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg');
        }
    }, [resolvedTheme, mounted]);
    
    const { width, height, textClass } = sizeConfig[size];

    const logoContent = (
        <>
            <span className={`${textClass} font-bold hidden lg:flex`}>exus</span>
            <span className={`${textClass} hidden lg:flex`}>Store</span>
        </>
    );

    if (!mounted) {
        return (
            <Link href={href} className="flex items-center space-x-0.5">
                <Image
                    src={'/logo-light.svg'}
                    alt="Nexus Store"
                    width={width}
                    height={height}
                    priority
                />
                {logoContent}
            </Link>
        );
    }
    
    return (
        <Link href={href} className="flex items-center space-x-0.5">
            <Image
                src={logoSrc}
                alt="Nexus Store"
                width={width}
                height={height}
            />
            {logoContent}
        </Link>
    );
}
