'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity } from '@/store/features/cartSlice';

export function PopoverCart({ children }: { children: React.ReactNode }) {
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartTotal = useAppSelector((state) => state.cart.total);
    const dispatch = useAppDispatch();

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(id);
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Shopping Cart</h3>
                        <Badge variant="secondary">
                            {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                        </Badge>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-6">
                            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4 max-h-64 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-3">
                                        <div className="relative h-12 w-12 flex-shrink-0">
                                            <Image
                                                src={item.product.thumbnail}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover rounded"
                                                sizes="48px"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {item.product.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                ${item.product.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-6 w-6"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-6 w-6"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-6 w-6"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between font-semibold">
                                <span>Total:</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>

                            <div className="space-y-2">
                                <Button asChild className="w-full">
                                    <Link href="/cart">View Cart</Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/checkout">Checkout</Link>
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}