import { configureStore } from "@reduxjs/toolkit";
import heroReducer from "../redux/slice/heroSlice"
import productsReducer from "../redux/slice/productsSlice";
import blogReducer from "../redux/slice/blogSlice";
import homeGardenReducer from "../redux/slice/homeGardenSlice";
import cartReducer from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    products: productsReducer,
    blog: blogReducer,
    homeGarden: homeGardenReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState> ;
export type AppDispatch = typeof store.dispatch;
