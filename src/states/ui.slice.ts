import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  showNavigation: boolean;
  showChapters: boolean;
  headerDocked: boolean;
  headerExpanded: boolean;
}

const initialState: UIState = {
  showNavigation: true,
  showChapters: true,
  headerDocked: true,
  headerExpanded: true,
};

export const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleShowNavigation: (state) => {
      state.showNavigation = !state.showNavigation;
    },
    toggleShowChapters: (state) => {
      state.showChapters = !state.showChapters;
    },
    toggleHeaderDocked: (state) => {
      state.headerDocked = !state.headerDocked;
    },
    toggleHeaderExpanded: (state) => {
      state.headerExpanded = !state.headerExpanded;
    },
  },
});

export const {
  toggleHeaderDocked,
  toggleShowNavigation,
  toggleShowChapters,
  toggleHeaderExpanded,
} = UISlice.actions;

export default UISlice.reducer;
