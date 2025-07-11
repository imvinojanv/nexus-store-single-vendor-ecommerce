import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Order, ShippingInfo } from '@/types';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation<
            Order,
            { items: Array<{ productId: string; quantity: number }>; shippingInfo: ShippingInfo }
        >({
            query: (orderData) => ({
                url: 'orders',
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Order'],
        }),
        getUserOrders: builder.query<Order[], void>({
            query: () => 'orders',
            providesTags: ['Order'],
        }),
    }),
});

export const { useCreateOrderMutation, useGetUserOrdersQuery } = ordersApi;