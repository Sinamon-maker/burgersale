import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearOrder } from "../order/orderSlice";
import { closeModal } from "../modalDelivery/modalDeliverySlice";

const initialState = {
  name: "",
  phone: "",
  format: "delivery",
  addres: "",
  floor: "",
  intercom: "",
};

export const submitForm = createAsyncThunk(
  "form/submit",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const resp = await fetch(
        "https://cloudy-slash-rubidium.glitch.me/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!resp.ok) {
        throw new Error({ message: `Error: ${resp.statusText}` });
      }
      dispatch(clearOrder());
      dispatch(closeModal());
      return await resp.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.error = "";
        state.response = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.error = "";
        state.response = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateFormValue } = formSlice.actions;

export default formSlice.reducer;
