import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./category/categorySlice";
import ProductReducer from "./product/productSlice";
import OrderReducer, { localStorageMiddleware } from "./order/orderSlice";
import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    product: ProductReducer,
    order: OrderReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
});
