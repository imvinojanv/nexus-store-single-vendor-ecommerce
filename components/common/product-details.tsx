'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/features/cartSlice';
import { Product } from '@/types';

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(addToCart(product));
        }
        toast.success(`${product.name} added to cart!`);
    };

    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg border">
                        <Image
                            src={product.images[selectedImage] || product.thumbnail}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        {product.discountPercentage > 0 && (
                            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                                -{Math.round(product.discountPercentage)}%
                            </Badge>
                        )}
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-border'
                                    }`}
                            >
                                <Image
                                    src={image}
                                    alt={`${product.name} - View ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="150px"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-2">
                            {product.category}
                        </Badge>
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-muted-foreground">(4.5) • 127 reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                                <span className="text-xl text-muted-foreground line-through">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.stock > 0 ? (
                                <div className="flex items-center text-green-600">
                                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                    {product.stock <= 10 ? `Only ${product.stock} left in stock` : 'In Stock'}
                                </div>
                            ) : (
                                <div className="flex items-center text-red-600">
                                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                                    Out of Stock
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <label className="text-sm font-medium">Quantity:</label>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <span className="px-4 py-2 border border-border rounded-md mx-2 min-w-[3rem] text-center">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </Button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <Button
                                className="flex-1"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-sm font-medium">Free Shipping</p>
                                <p className="text-xs text-muted-foreground">Orders over $50</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-sm font-medium">30-Day Returns</p>
                                <p className="text-xs text-muted-foreground">Easy returns</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                                <p className="text-sm font-medium">Warranty</p>
                                <p className="text-xs text-muted-foreground">1 year included</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Product Details Tabs */}
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="specifications">Specifications</TabsTrigger>
                            <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                            <div className="space-y-2">
                                <h4 className="font-medium">Tags:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="specifications" className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="font-medium">Availability Status:</span>
                                    <span>{product.availabilityStatus}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="font-medium">Barcode:</span>
                                    <span className="font-mono text-sm">{product.barcode}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="font-medium">Warranty:</span>
                                    <span>{product.warrantyInformation}</span>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="shipping" className="space-y-4">
                            <p className="text-muted-foreground">
                                {product.shippingInformation}
                            </p>
                            <div className="space-y-2">
                                <h4 className="font-medium">Shipping Options:</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Standard Shipping: 5-7 business days</li>
                                    <li>• Express Shipping: 2-3 business days</li>
                                    <li>• Overnight Shipping: Next business day</li>
                                </ul>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}