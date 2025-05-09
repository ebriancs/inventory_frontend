import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
