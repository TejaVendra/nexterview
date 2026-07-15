import { createSlice } from "@reduxjs/toolkit";

const navbar = createSlice({
  name: "navbar",

  initialState: {
    isOpen: false,
  },

  reducers: {
    setOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setOpen } = navbar.actions;

export default navbar.reducer;