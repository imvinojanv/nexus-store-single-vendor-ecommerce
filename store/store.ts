import { configureStore } from '@reduxjs/toolkit';

import { productsApi } from '@/services/productsApi';
import { ordersApi } from '@/services/ordersApi';
import cartReducer from '@/store/features/cartSlice';

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApi.middleware,
            ordersApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;