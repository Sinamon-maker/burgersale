import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./category/categorySlice";
import ProductReducer from "./product/productSlice";
import OrderReducer, { localStorageMiddleware } from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    products: ProductReducer,
    order: OrderReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
});
