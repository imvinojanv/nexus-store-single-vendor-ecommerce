import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// Define a type for the product structure from the API
interface ApiProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    stock: number;
    tags: string[];
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    meta: {
        barcode: string;
        qrCode: string;
        createdAt: string;
        updatedAt: string;
    };
    images: string[];
    thumbnail: string;
}

async function main() {
    console.log('Starting the seeding process...');

    // 1. Create a Super Admin user (for Part 2 & 3)
    const password = await hash('password123', 12);
    const superAdmin = await prisma.user.upsert({
        where: { email: 'superadmin@example.com' },
        update: {},
        create: {
            email: 'superadmin@example.com',
            name: 'Super Admin',
            password: password,
            role: Role.SUPER_ADMIN,
        },
    });
    console.log('Super Admin user created/verified.');

    // 2. Fetch products from the public API
    console.log('Fetching products from dummyjson.com...');
    const response = await fetch('https://dummyjson.com/products?limit=100');
    if (!response.ok) {
        throw new Error('Failed to fetch products from API');
    }
    const { products }: { products: ApiProduct[] } = await response.json();
    console.log(`Fetched ${products.length} products.`);

    // 3. Seed the database with the fetched products
    console.log('Seeding products into the database...');
    for (const product of products) {
        await prisma.product.upsert({
            where: { sourceId: product.id }, // Use the API's ID to check for existing products
            update: {
                name: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                discountPercentage: product.discountPercentage,
                stock: product.stock,
                tags: product.tags,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                availabilityStatus: product.availabilityStatus,
                barcode: product.meta.barcode,
                qrCode: product.meta.qrCode,
                images: product.images,
                thumbnail: product.thumbnail,
                createdAt: new Date(product.meta.createdAt),
                updatedAt: new Date(product.meta.updatedAt),
            },
            create: {
                sourceId: product.id,
                name: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                discountPercentage: product.discountPercentage,
                stock: product.stock,
                tags: product.tags,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                availabilityStatus: product.availabilityStatus,
                barcode: product.meta.barcode,
                qrCode: product.meta.qrCode,
                images: product.images,
                thumbnail: product.thumbnail,
                createdAt: new Date(product.meta.createdAt),
                updatedAt: new Date(product.meta.updatedAt),
            },
        });
    }
    console.log('Product seeding completed successfully.');
}

main()
    .catch((e) => {
        console.error('An error occurred during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });