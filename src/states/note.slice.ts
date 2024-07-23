import request from "@/request/request";
import { Settings } from "@/types/account";
import { NoteNavigationType, SortInfo } from "@/types/notes";
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

export const updateDefaultExpanded = createAsyncThunk(
  "notes/updateDefaultExpanded",
  async ({ value }: { value: boolean }) => {
    const url = "/account/settings/";
    const { defaultExpanded }: Settings = await request.patch(url, {
      defaultExpanded: value,
    });
    return defaultExpanded;
  }
);
export const updateShowExactTime = createAsyncThunk(
  "notes/updateShowExactTime",
  async ({ value }: { value: boolean }) => {
    const url = "/account/settings/";
    const { showExactTime }: Settings = await request.patch(url, {
      showExactTime: value,
    });
    return showExactTime;
  }
);

export const updateSortInfo = createAsyncThunk(
  "notes/updateSortInfo",
  async ({ value }: { value: SortInfo }) => {
    const url = "/account/settings/";
    const { sortInfo }: Settings = await request.patch(url, {
      sortInfo: value,
    });
    return sortInfo;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setActive(
      state,
      action: PayloadAction<{
        info: NoteNavigationType | undefined;
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
      .addCase(updateDefaultExpanded.fulfilled, (state, action) => {
        const value = action.payload === undefined ? false : action.payload;
        return {
          ...state,
          defaultExpanded: value,
        };
      })
      .addCase(updateDefaultExpanded.rejected, (state) => {});

    builder
      .addCase(updateShowExactTime.fulfilled, (state, action) => {
        const value = action.payload === undefined ? false : action.payload;
        return {
          ...state,
          showExactTime: value,
        };
      })
      .addCase(updateShowExactTime.rejected, (state) => {});

    builder
      .addCase(updateSortInfo.fulfilled, (state, action) => {
        const value = action.payload === undefined ? "" : action.payload;
        return {
          ...state,
          sortInfo: value,
        };
      })
      .addCase(updateSortInfo.rejected, (state) => {});
  },
});

export const {} = noteSlice.actions;

export default noteSlice.reducer;
