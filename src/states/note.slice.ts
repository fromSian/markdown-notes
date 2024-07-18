import type { SortInfo } from "@/components/notes/Content";
import { NoteNavigationType } from "@/types/notes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface NoteState {
  activeId: string | number | undefined;
  activeInfo: NoteNavigationType | undefined;
  updateInfo: NoteNavigationType | undefined;
  showExactTime: boolean;
  defaultExpanded: boolean;
  sortInfo: SortInfo;
}

const initialState: NoteState = {
  activeId: undefined,
  activeInfo: undefined,
  updateInfo: undefined,
  showExactTime: false,
  defaultExpanded: true,
  sortInfo: "-updated",
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
        ...state,
        activeId: info?.id,
        activeInfo: info,
        updateInfo: undefined,
      };
    },
    setUpdateInfo(state, action: PayloadAction<Partial<NoteNavigationType>>) {
      let info = JSON.parse(JSON.stringify(state.activeInfo));
      info = {
        ...info,
        ...action.payload,
      };
      return {
        ...state,
        activeInfo: info,
        updateInfo: info,
      };
    },
    setConfig(
      state,
      action: PayloadAction<{
        showExactTime: boolean;
        defaultExpanded: boolean;
        sortInfo: SortInfo;
      }>
    ) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setDefaultExpanded(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        defaultExpanded: action.payload,
      };
    },
    setShowExactTime(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        showExactTime: action.payload,
      };
    },
    setSortInfo(state, action: PayloadAction<SortInfo>) {
      return {
        ...state,
        sortInfo: action.payload,
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
