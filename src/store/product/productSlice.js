import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../const";

const initialState = {
  products: [],
  error: "",
};

export const productRequestAsync = createAsyncThunk(
  "product/fetch",
  (category) =>
    fetch(`${API_URI}${POSTFIX}?category=${category}`)
      .then((req) => req.json())
      .catch((err) => ({ err }))
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productRequestAsync.pending.type, (state) => {
        state.error = "";
      })
      .addCase(productRequestAsync.fulfilled.type, (state, action) => {
        state.error = "";
        state.products = action.payload;
      })
      .addCase(productRequestAsync.rejected.type, (state, action) => {
        state.error = action.payload.err;
      });
  },
});

export default productSlice.reducer;
