import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const saveState = createSlice({
  name: "save",
  initialState: {
    saving: false,
  },
  reducers: {
    setSaving: (state, action: PayloadAction<boolean>) => {
      return {
        ...StaticRange,
        saving: action.payload,
      };
    },
  },
});

export const { setSaving } = saveState.actions;
export default saveState.reducer;
