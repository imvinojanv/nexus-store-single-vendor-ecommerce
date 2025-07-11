'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { ShoppingCart, Heart, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/features/cartSlice';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    };

    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.discountPercentage > 0 && (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            -{Math.round(product.discountPercentage)}%
                        </Badge>
                    )}
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Heart className="h-4 w-4" />
                    </Button>
                    {product.stock <= 10 && product.stock > 0 && (
                        <Badge variant="destructive" className="absolute bottom-2 left-2">
                            Only {product.stock} left
                        </Badge>
                    )}
                    {product.stock === 0 && (
                        <Badge variant="secondary" className="absolute bottom-2 left-2">
                            Out of Stock
                        </Badge>
                    )}
                </div>
            </Link>

            <CardContent className="p-4">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {product.description}
                </p>

                <div className="flex items-center mb-2">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">(4.5)</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">
                            ${discountedPrice.toFixed(2)}
                        </span>
                        {product.discountPercentage > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                        {product.category}
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            </CardFooter>
        </Card>
    );
}