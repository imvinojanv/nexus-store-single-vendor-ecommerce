import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Product } from '@/types';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<
            { products: Product[]; total: number },
            { page?: number; limit?: number; category?: string; sort?: string }
        >({
            query: ({ page = 1, limit = 12, category, sort }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                });

                if (category) params.append('category', category);
                if (sort) params.append('sort', sort);

                return `products?${params.toString()}`;
            },
            providesTags: ['Product'],
        }),
        getProduct: builder.query<Product, string>({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getCategories: builder.query<string[], void>({
            query: () => 'products/categories',
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
} = productsApi;