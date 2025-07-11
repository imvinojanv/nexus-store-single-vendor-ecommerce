import { notFound } from 'next/navigation';

import { prisma } from '@/lib/prisma';
import { ProductDetails } from '@/components/common/ProductDetails';

interface ProductPageProps {
    params: {
        productId: string;
    };
}

export async function generateMetadata({ params }: ProductPageProps) {
    const product = await prisma.product.findUnique({
        where: { id: params.productId },
    });

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.thumbnail],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await prisma.product.findUnique({
        where: { id: params.productId },
    });

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}