import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

// These types are useful for typed hooks and dispatching actions in TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
