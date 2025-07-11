'use client';

import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/features/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export default function CartPage() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartTotal = useAppSelector((state) => state.cart.total);
    const dispatch = useAppDispatch();

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
        toast.success('Item removed from cart');
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(id);
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success('Cart cleared');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                    <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">Shopping Cart</h1>
                        <Button variant="outline" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="relative h-24 w-24 flex-shrink-0">
                                            <Image
                                                src={item.product.thumbnail}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover rounded"
                                                sizes="96px"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/products/${item.product.id}`}
                                                className="text-lg font-semibold hover:text-primary transition-colors"
                                            >
                                                {item.product.name}
                                            </Link>
                                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                                {item.product.description}
                                            </p>
                                            <div className="flex items-center mt-2">
                                                <span className="text-lg font-bold">
                                                    ${item.product.price.toFixed(2)}
                                                </span>
                                                {item.product.discountPercentage > 0 && (
                                                    <span className="text-sm text-muted-foreground line-through ml-2">
                                                        ${(item.product.price / (1 - item.product.discountPercentage / 100)).toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end space-y-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                                                    }
                                                    className="w-16 text-center"
                                                    min="1"
                                                    max={item.product.stock}
                                                />
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            {/* Subtotal */}
                                            <div className="text-lg font-bold">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </div>

                                            {/* Remove Button */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <Card className="sticky top-24">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>${(cartTotal * 1.08).toFixed(2)}</span>
                                </div>
                            </div>

                            <Button asChild className="w-full mt-6" size="lg">
                                <Link href="/checkout">
                                    Proceed to Checkout
                                </Link>
                            </Button>

                            <Button asChild variant="outline" className="w-full mt-2">
                                <Link href="/products">
                                    Continue Shopping
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}