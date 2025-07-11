export interface Product {
    id: string;
    sourceId: number;
    name: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    stock: number;
    tags: string[];
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    barcode: string;
    qrCode: string;
    images: string[];
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    total: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
}

export interface OrderItem {
    id: string;
    orderId: string;
    productId: string;
    product: Product;
    quantity: number;
}

export interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

export interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}