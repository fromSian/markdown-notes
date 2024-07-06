import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";
type noteItemInfoType = {
  id: string | number;
  content: string;
  summary: string;
  created: string;
  updated: string;
  type: "remote" | "new";
};

type noteInfoType = {
  id: string | number;
  index: number;
  title: string;
  updated: string;
  created: string;
  count: number;
};
/**
 *
 */
interface NoteItemState {
  noteInfo: noteInfoType | undefined;
  activeNoteId: string | number | undefined;
  noteItems: noteItemInfoType[];
}

export const queryFirstNoteItems = createAsyncThunk(
  "noteItem/queryFirstNoteItems",
  async ({ id }: { id: string | number }) => {
    try {
      const datas = Array.from({ length: 1 }).map((_, i) => ({
        id: uuid4(),
        content: "content",
        summary: "summary",
        created: "created",
        updated: "updated",
        type: "remote",
      }));
      const restPages = [2, 3, 4, 5, 6, 7, 8, 9];
      return {
        datas: datas,
        restPages: restPages,
      };
    } catch (error) {}
  }
);

export const queryRestNoteItems = createAsyncThunk(
  "noteItem/queryRestNoteItems",
  async ({ id, restPages }) => {
    try {
      const response = await Promise.all(
        restPages.map((item) =>
          Array.from({ length: 1 }).map((_, i) => ({
            id: uuid4(),
            content: "content",
            summary: "summary",
            created: "created",
            updated: "updated",
            type: "remote",
          }))
        )
      );
      return response.flat();
    } catch (error) {}
  }
);

export const setActiveNoteId = createAsyncThunk(
  "noteItem/setActiveNoteId",
  async ({ id }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const notes = state.note.notes;
      const index = notes.findIndex((note) => note.id === id);
      let noteInfo;
      if (index > -1) {
        noteInfo = notes[index];
      }
      return {
        id,
        index,
        noteInfo,
      };
    } catch (error) {}
  }
);

export const addOneNoteItem = createAsyncThunk(
  "noteItem/addOneNoteItem",
  async () => {
    const response = {
      id: uuid4(),
      content: "new add content",
      summary: "summary",
      created: "created",
      updated: "updated",
      type: "remote",
    };
    return response;
  }
);

export const deleteNoteItem = createAsyncThunk(
  "noteItem/deleteNoteItem",
  async ({ id }) => {
    try {
      return {
        id,
      };
    } catch (error) {}
  }
);

const initialState: NoteItemState = {
  noteInfo: undefined,
  activeNoteId: undefined,
  noteItems: [],
};

export const noteItemSlice = createSlice({
  name: "noteItem",
  initialState,
  reducers: {
    // setNoteInfo: (state, action: PayloadAction<noteInfoType>) => {
    //   return {
    //     ...state,
    //     noteInfo: action.payload,
    //   };
    // },
    // setActiveNoteId: (state, action: PayloadAction<string | number>) => {
    //   return {
    //     ...state,
    //     activeNoteId: action.payload,
    //   };
    // },
    setNoteItems: (state, action: PayloadAction<noteItemInfoType[]>) => {
      return {
        ...state,
        noteItems: action.payload,
      };
    },
    addOneNoteItem: (state) => {
      const exist = [...state.noteItems];
      const newItem = {
        id: uuid4(),
        content: "content",
        summary: "summary",
        created: "created",
        updated: "updated",
        type: "new",
      };

      return {
        ...state,
        noteItems: [...exist, newItem],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryFirstNoteItems.fulfilled, (state, action) => {
      const { datas, restPages } = action.payload;
      return {
        ...state,
        noteItems: [...datas],
      };
    });
    builder.addCase(queryRestNoteItems.fulfilled, (state, action) => {
      const exist = [...state.noteItems];
      return {
        ...state,
        noteItems: [...exist, ...action.payload],
      };
    });
    builder.addCase(addOneNoteItem.fulfilled, (state, action) => {
      const exist = [...state.noteItems];
      return {
        ...state,
        noteItems: [...exist, action.payload],
      };
    });
    builder.addCase(setActiveNoteId.fulfilled, (state, action) => {
      const { id, noteInfo, index } = action.payload;
      if (index === -1) return;
      return {
        ...state,
        noteInfo,
        activeNoteId: id,
      };
    });
    builder.addCase(deleteNoteItem.fulfilled, (state, action) => {
      const { id } = action.payload;
      const exist = [...state.noteItems];
      return {
        ...state,
        noteItems: exist.filter((item) => item.id !== id),
      };
    });
  },
});

export const {} = noteItemSlice.actions;

export default noteItemSlice.reducer;
