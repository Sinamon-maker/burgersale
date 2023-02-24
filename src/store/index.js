import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./category/categorySlice";
import ProductReducer from "./product/productSlice";
import OrderReducer, { localStorageMiddleware } from "./order/orderSlice";
import ModalReducer from "./modalDelivery/modalDeliverySlice";
import FormReducer from "./form/formSlice";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
    products: ProductReducer,
    order: OrderReducer,
    modal: ModalReducer,
    form: FormReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
});
