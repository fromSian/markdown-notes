import { NoteNavigationType } from "@/types/notes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  activeId: string | number | undefined;
  activeInfo: NoteNavigationType | undefined;
  updateInfo: NoteNavigationType | undefined;
}

const initialState: NoteState = {
  activeId: undefined,
  activeInfo: undefined,
  updateInfo: undefined,
};

export const query = createAsyncThunk("notes/query", async () => {
  try {
    return 1;
  } catch (error) {}
});

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setActive(
      state,
      action: PayloadAction<{
        info: NoteNavigationType;
      }>
    ) {
      const { info } = action.payload;
      return {
        activeId: info?.id,
        activeInfo: info,
        updateInfo: undefined,
      };
    },
    setUpdateInfo(state, action: PayloadAction<NoteNavigationType>) {
      return {
        ...state,
        updateInfo: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(query.fulfilled, (state, action) => {
        const response = action.payload;
      })
      .addCase(query.rejected, (state) => {});
  },
});

export const {} = noteSlice.actions;

export default noteSlice.reducer;
