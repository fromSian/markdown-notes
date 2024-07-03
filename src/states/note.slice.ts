import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type noteInfoType = {
  id: string | number;
  index: number;
  title: string;
  updated: string;
  created: string;
  summary: string;
  count: number;
  noteItemIds: (string | number)[];
};

type noteItemInfoType = {
  id: string | number;
  index: number;
  loaded: boolean;
  content: string;
  summary: string;
  created: string;
  updated: string;
};

interface NoteState {
  start: number;
  end: number;
  count: number;
  notes: noteInfoType[];
  currentNoteId: string | number | undefined;
  cuurentNoteItemInfo: noteItemInfoType[];
}

const initialState: NoteState = {
  start: -1,
  end: -1,
  count: 0,
  notes: [],
  currentNoteId: undefined,
  cuurentNoteItemInfo: [],
};

export const query = createAsyncThunk("notes/query", async () => {
  try {
    let response = {
      success: true,
      result: [],
      count: 200,
      start: 2,
      end: 10,
      middle: 5,
    };
    response.result = Array.from({
      length: response.end - response.start + 1,
    }).map((_, i) => ({
      id: response.start + i,
      index: response.start + i,
      title: "title",
      created: "created",
      updated: "updated",
      summary: "summary",
    }));
    return response;
  } catch (error) {}
});

export const queryBefore = createAsyncThunk(
  "notes/queryBefore",
  async ({ base, length }) => {
    try {
      let extra = Array.from({ length: length }).map((_, i) => ({
        id: base - length + i,
        index: base - length + i,
        title: "title",
        created: "created",
        updated: "updated",
        summary: "summary",
      }));
      return {
        notes: extra,
        start: base - length,
      };
    } catch (error) {}
  }
);

export const queryAfter = createAsyncThunk(
  "notes/queryAfter",
  async ({ base, length }) => {
    try {
      let extra = Array.from({ length: length }).map((_, i) => ({
        id: base + i + 1,
        index: base + i + 1,
        title: "title",
        created: "created",
        updated: "updated",
        summary: "summary",
      }));
      return {
        notes: extra,
        end: base + length,
      };
    } catch (error) {}
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async ({ id }) => {
    try {
      return id;
    } catch (error) {}
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setCurrentNoteId: (state, action: PayloadAction<string | number>) => {
      state.currentNoteId = action.payload;
    },
    setCurrentNoteItemInfo: (
      state,
      action: PayloadAction<noteItemInfoType[]>
    ) => {
      state.cuurentNoteItemInfo = action.payload;
    },
    updateOneNoteInfo: (
      state,
      action: PayloadAction<{ id: string | number; item: noteInfoType }>
    ) => {
      const { id, item } = action.payload;
      const index = state.notes.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.notes[index] = item;
      }
    },
    updateOneNoteItemInfo: (
      state,
      action: PayloadAction<{ id: string | number; item: noteItemInfoType }>
    ) => {
      const { id, item } = action.payload;
      const index = state.cuurentNoteItemInfo.findIndex(
        (item) => item.id === id
      );
      if (index !== -1) {
        state.cuurentNoteItemInfo[index] = item;
      }
    },
    deleteOneNote: (state, action: PayloadAction<string | number>) => {
      const index = state.notes.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
    deleteOneNoteItem: (state, action: PayloadAction<string | number>) => {
      const index = state.cuurentNoteItemInfo.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.cuurentNoteItemInfo.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(query.fulfilled, (state, action) => {
        const response = action.payload;
        state.notes = response?.result;
        state.count = response?.count;
        state.currentNoteId = response?.middle;
        state.start = response?.start;
        state.end = response.end;
      })
      .addCase(query.rejected, (state) => {});

    builder
      .addCase(queryBefore.fulfilled, (state, action) => {
        const { notes, start } = action.payload;
        const exist = [...state.notes];

        state.notes = [...notes, ...exist];
        state.start = start;
      })
      .addCase(queryBefore.rejected, (state) => {});

    builder
      .addCase(queryAfter.fulfilled, (state, action) => {
        const { notes, end } = action.payload;
        const exist = [...state.notes];

        state.notes = [...exist, ...notes];
        state.end = end;
      })
      .addCase(queryAfter.rejected, (state) => {});

    builder
      .addCase(deleteNote.fulfilled, (state, action) => {
        const id = action.payload;
        const notes = [...state.notes];
        const targetIndex = notes.findIndex((item) => item.id === id);
        let out = [];
        notes.forEach((item, index) => {
          if (item.id !== id) {
            if (index > targetIndex) {
              item.index = item.index - 1;
            }
            out.push(item);
          }
        });
        state.count = state.count - 1;
        state.end = state.end - 1;
        state.notes = out;
      })
      .addCase(deleteNote.rejected, (state) => {});
  },
});

export const {} = noteSlice.actions;

export default noteSlice.reducer;
