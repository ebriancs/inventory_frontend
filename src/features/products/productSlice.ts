import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

export interface NewProduct {
  name: string;
  description: string;
  quantity: number;
  price: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
};

// Async thunks
export const fetchProducts = createAsyncThunk('products/fetch', async (page: number = 1) => {
  const res = await API.get(`/products/?page=${page}`);
  console.log('productSlice -> fetchProducts:', res);
  return res.data;
});

export const addProductAsync = createAsyncThunk('products/add', async (newProduct: NewProduct) => {
  const res = await API.post('/products/', newProduct);
  console.log('addProductAsync', res);
  return res.data;
});

export const updateProductAsync = createAsyncThunk('products/update', async (product: Product) => {
  const res = await API.put(`/products/${product.id}/`, product);
  console.log('updateProductAsync:', res);
  return res.data;
});

export const deleteProductAsync = createAsyncThunk('products/delete', async (id: number) => {
  await API.delete(`/products/${id}/`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        };
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })

      // Add
      .addCase(addProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add product';
      })

      // Update
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // Delete
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
