import { ProductList } from '@/components/features/products/product-list';

export const metadata = {
    title: 'Products',
    description: 'Browse our extensive collection of premium products at unbeatable prices.',
};

export default function ProductsPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">All Products</h1>
                <p className="text-muted-foreground">
                    Discover our extensive collection of premium products across all categories.
                </p>
            </div>

            <ProductList />
        </div>
    );
}