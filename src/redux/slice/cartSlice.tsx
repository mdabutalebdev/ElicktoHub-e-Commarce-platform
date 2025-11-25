import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './homeGardenSlice';

export interface CartItem extends Product { quantity: number; }
export interface CartState { items: CartItem[]; }

const getInitialState = (): CartState => {
  try {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : { items: [] };
    }
  } catch (error) { console.error("Could not load cart from localStorage", error); }
  return { items: [] };
};

const initialState: CartState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) existingItem.quantity++;
      else state.items.push({ ...action.payload, quantity: 1 });
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) item.quantity++;
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      else state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    }
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;