import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";
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

interface NoteState {
  start: number;
  end: number;
  count: number;
  notes: noteInfoType[];
  currentNodeInfo: noteInfoType | undefined;
  currentNoteId: string | number | undefined;
  currentNoteItemInfo: noteItemInfoType[];
}

const initialState: NoteState = {
  start: -1,
  end: -1,
  count: 0,
  notes: [],
  currentNodeInfo: undefined,
  currentNoteId: undefined,
  currentNoteItemInfo: [],
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
      noteItemIds: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      count: 32,
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
        noteItemIds: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        count: 32,
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
        noteItemIds: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        ],
        count: 32,
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

export const queryNoteItemDetail = createAsyncThunk(
  "notes/queryNoteItemDetail",
  async ({ id }, thunkAPI) => {
    try {
      return { id, content: "this is my new content and i gonna finish it" };
    } catch (error) {
      console.log(error);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setCurrentNoteId: (state, action: PayloadAction<string | number>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      state.currentNodeInfo = state.notes[index];
      state.currentNoteId = action.payload;
    },
    setCurrentNoteItemInfo: (
      state,
      action: PayloadAction<noteItemInfoType[]>
    ) => {
      state.currentNoteItemInfo = action.payload;
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
      const index = state.currentNoteItemInfo.findIndex(
        (item) => item.id === id
      );
      if (index !== -1) {
        state.currentNoteItemInfo[index] = item;
      }
    },
    deleteOneNote: (state, action: PayloadAction<string | number>) => {
      const index = state.notes.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
    deleteOneNoteItem: (state, action: PayloadAction<string | number>) => {
      const index = state.currentNoteItemInfo.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.currentNoteItemInfo.splice(index, 1);
      }
    },
    addOneNoteItem: (state) => {
      const exist = [...state.currentNoteItemInfo];
      state.currentNoteItemInfo = [
        ...exist,
        {
          id: uuid4(),
          content: "",
          updated: "",
          created: "",
          type: "new",
          loaded: true,
        },
      ];
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

        if (state.currentNoteId === id) {
          state.currentNoteId = undefined;
          state.currentNoteItemInfo = [];
        }
        state.notes = out;
      })
      .addCase(deleteNote.rejected, (state) => {});

    builder
      .addCase(queryNoteItemDetail.fulfilled, (state, action) => {
        const { id, content } = action.payload;
        const index = state.currentNoteItemInfo.findIndex(
          (item) => item.id === id
        );

        state.currentNoteItemInfo[index].content = content;
        state.currentNoteItemInfo[index].loaded = true;
      })
      .addCase(queryNoteItemDetail.rejected, (state) => {});
  },
});

export const {} = noteSlice.actions;

export default noteSlice.reducer;
