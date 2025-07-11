import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { ShoppingBag, Truck, Shield, Heart, Star, ArrowRight } from 'lucide-react';

export default function HomePage() {
    const features = [
        {
            icon: <ShoppingBag className="h-8 w-8" />,
            title: "Premium Products",
            description: "Carefully curated selection of high-quality items"
        },
        {
            icon: <Truck className="h-8 w-8" />,
            title: "Fast Shipping",
            description: "Free shipping on orders over $50 with express delivery"
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Secure Shopping",
            description: "Your data is protected with enterprise-grade security"
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Customer Love",
            description: "Join thousands of satisfied customers worldwide"
        }
    ];

    const categories = [
        { name: "Electronics", href: "/products?category=electronics", count: "2,500+" },
        { name: "Fashion", href: "/products?category=fashion", count: "1,800+" },
        { name: "Home & Garden", href: "/products?category=home-garden", count: "1,200+" },
        { name: "Sports", href: "/products?category=sports", count: "900+" },
        { name: "Beauty", href: "/products?category=beauty", count: "600+" },
        { name: "Books", href: "/products?category=books", count: "400+" }
    ];

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge className="mb-6 px-4 py-2 text-sm">
                            ✨ New Collection Available Now
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                            Discover Premium Products at
                            <span className="text-primary"> Unbeatable Prices</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Shop the latest electronics, fashion, home essentials, and more.
                            Experience quality shopping with fast delivery and exceptional customer service.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="text-lg px-8">
                                <Link href="/products">
                                    Shop Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-lg px-8">
                                <Link href="/about">Learn More</Link>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                                <div className="text-sm text-muted-foreground">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                                <div className="text-sm text-muted-foreground">Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                                <div className="text-sm text-muted-foreground">Satisfaction</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                                <div className="text-sm text-muted-foreground">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose Nexus Store?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We're committed to providing you with the best shopping experience through
                        quality products, exceptional service, and unmatched convenience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                            <CardContent className="pt-8 pb-6">
                                <div className="text-primary mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
                    <p className="text-lg text-muted-foreground">
                        Explore our wide range of categories to find exactly what you're looking for
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <Link key={index} href={category.href}>
                            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <CardContent className="p-6 text-center">
                                    <h3 className="font-semibold mb-2">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                        <p className="text-lg text-muted-foreground">
                            Don't just take our word for it - see what our satisfied customers have to say
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Verified Buyer",
                                content: "Amazing quality products and lightning-fast delivery. I've been shopping here for months and never been disappointed!",
                                rating: 5
                            },
                            {
                                name: "Michael Chen",
                                role: "Regular Customer",
                                content: "The customer service is outstanding. They helped me find exactly what I needed and answered all my questions promptly.",
                                rating: 5
                            },
                            {
                                name: "Emma Williams",
                                role: "Happy Shopper",
                                content: "Great prices, huge selection, and the website is so easy to use. Highly recommend Nexus Store to everyone!",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <Card key={index} className="border-none shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none">
                    <CardContent className="p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Join thousands of satisfied customers and discover your next favorite product today!
                        </p>
                        <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                            <Link href="/products">
                                Browse All Products
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}