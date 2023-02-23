import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./category/categorySlice";

export const store = configureStore({
  reducer: {
    category: CategoryReducer,
  },
});
