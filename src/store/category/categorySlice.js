import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_URI, POSTFIX } from "../../const";

const initialState = {
  category: [],
  error: "",
  activeCategory: 0,
};

export const categoryRequestAsync = createAsyncThunk("category/fetch", () => {
  return fetch(`${API_URI}${POSTFIX}/category`)
    .then((req) => req.json())
    .catch((err) => ({ err }));
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory(state, action) {
      console.log({ action });
      state.activeCategory = action.payload.indexCategory;
    },
  },
  extraReducers: {
    [categoryRequestAsync.pending.type]: (state) => {
      state.error = "";
    },
    [categoryRequestAsync.fulfilled.type]: (state, action) => {
      state.error = "";
      state.category = action.payload;
    },
    [categoryRequestAsync.rejected.type]: (state, action) => {
      state.error = action.payload.err;
    },
  },
});

export const { changeCategory } = categorySlice.actions;

export default categorySlice.reducer;
