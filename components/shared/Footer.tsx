import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

import { Logo } from '../common/logo';

export function Footer() {
    const footerSections = [
        {
            title: 'Company',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Careers', href: '/careers' },
                { name: 'Press', href: '/press' },
            ],
        },
        {
            title: 'Customer Service',
            links: [
                { name: 'Help Center', href: '/help' },
                { name: 'Returns', href: '/returns' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Size Guide', href: '/size-guide' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' },
                { name: 'GDPR', href: '/gdpr' },
            ],
        },
    ];

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        {/* Logo */}
                        <Logo href="/" size='large' />

                        <p className="mt-4 text-muted-foreground mb-6 max-w-md">
                            Your premier destination for quality products at unbeatable prices.
                            We're committed to providing an exceptional shopping experience with
                            fast shipping and excellent customer service.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>support@nexusstore.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>123 Commerce St, Business City, BC 12345</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        © 2024 Nexus Store. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 sm:mt-0">
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms
                        </Link>
                        <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}