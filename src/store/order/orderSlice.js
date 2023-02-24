import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";
import { countPrice, totalCount } from "../../utils/utils";

const initialState = {
  orderList: JSON.parse(localStorage.getItem("order") || "[]"),
  orderGoods: [],
  totalPrice: 0,
  totalCount: 0,
};

export const localStorageMiddleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  if (nextAction.type.startsWith("order/")) {
    const orderList = store.getState().order.orderList;
    localStorage.setItem("order", JSON.stringify(orderList));
  }
  return nextAction;
};

export const orderRequestAsync = createAsyncThunk(
  "order/fetch",
  (_, { getState }) => {
    const listId = getState().order.orderList.map((it) => it.id);
    return fetch(`${API_URI}${POSTFIX}?list=${listId}`)
      .then((req) => req.json())

      .catch((error) => ({ error }));
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id
      );
      if (productOrderList) {
        productOrderList.count += 1;
        const productOrderGoods = state.orderGoods.find(
          (item) => item.id === action.payload.id
        );

        productOrderGoods.count += 1;
      } else {
        state.orderList.push({ ...action.payload, count: 1 });
      }
      state.totalCount = totalCount(state.orderGoods);
      state.totalPrice = countPrice(state.orderGoods);
    },
    removeProduct: (state, action) => {
      const productOrderList = state.orderList.find(
        (item) => item.id === action.payload.id
      );
      if (productOrderList.count > 1) {
        productOrderList.count -= 1;
        const productOrderGoods = state.orderGoods.find(
          (item) => item.id === action.payload.id
        );

        productOrderGoods.count -= 1;
      } else {
        state.orderList = state.orderList.filter(
          (it) => it.id !== action.payload.id
        );
        state.orderGoods = state.orderGoods.filter(
          (it) => it.id !== action.payload.id
        );
      }
      state.totalCount = totalCount(state.orderGoods);
      state.totalPrice = countPrice(state.orderGoods);
    },
    clearOrder: (state) => {
      state.orderList = [];
      state.orderList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderRequestAsync.pending, (state) => {
        state.error = "";
      })
      .addCase(orderRequestAsync.fulfilled, (state, action) => {
        const orderGoods = state.orderList.map((item) => {
          const product = action.payload.find(
            (product) => product.id === item.id
          );
          product.count = item.count;
          return product;
        });

        state.error = "";
        state.orderGoods = orderGoods;

        state.totalCount = totalCount(orderGoods);

        state.totalPrice = countPrice(orderGoods);
      })
      .addCase(orderRequestAsync.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export const { addProduct, removeProduct, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
