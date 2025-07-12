'use client';

import { useState } from 'react';
import { useGetProductsQuery, useGetCategoriesQuery } from '@/services/productsApi';
import { Filter, SortAsc } from 'lucide-react';

import { ProductCard } from '@/components/features/products/product-card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductList() {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState<string>('all');
    const [sort, setSort] = useState<string>('default-sort');

    const { data: categoriesData } = useGetCategoriesQuery();
    const { data, isLoading, error } = useGetProductsQuery({
        page,
        limit: 12,
        category: category === 'all' ? undefined : category,
        sort: sort === 'default-sort' ? undefined : sort,
    });

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load products. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filters and Sorting */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span className="text-sm font-medium">Filter by:</span>
                    </div>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categoriesData?.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <SortAsc className="h-4 w-4" />
                        <span className="text-sm font-medium">Sort by:</span>
                    </div>
                    <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Default" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default-sort">Default</SelectItem>
                            <SelectItem value="price_asc">Price: Low to High</SelectItem>
                            <SelectItem value="price_desc">Price: High to Low</SelectItem>
                            <SelectItem value="name_asc">Name: A to Z</SelectItem>
                            <SelectItem value="name_desc">Name: Z to A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-square w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {data && data.total > 12 && (
                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                onClick={() => setPage(page + 1)}
                                disabled={data.products.length < 12}
                            >
                                Load More Products
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}