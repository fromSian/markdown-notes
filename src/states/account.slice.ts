import request from "@/request/request";
import { Account, Settings } from "@/types/account";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface AccountState {
  isLogin: boolean;
  account: Account | undefined;
  language: string;
  theme: string;
}

// Define the initial state using that type
const initialState: AccountState = {
  isLogin: false,
  account: undefined,
  language: "",
  theme: "",
};

export const logout = createAsyncThunk("account/logout", async () => {
  const response = await request.post("/account/logout/");
  return response;
});

export const updateDefaultLanguage = createAsyncThunk(
  "notes/updateDefaultLanguage",
  async ({ value }: { value: string }) => {
    const url = "/account/settings/";
    const { language }: Settings = await request.patch(url, {
      language: value,
    });
    return language;
  }
);

export const updateDefaultTheme = createAsyncThunk(
  "notes/updateDefaultTheme",
  async ({ value }: { value: string }) => {
    const url = "/account/settings/";
    const { theme }: Settings = await request.patch(url, {
      theme: value,
    });
    return theme;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account>) => {
      return {
        ...state,
        isLogin: true,
        account: action.payload,
      };
    },
    setConfig: (
      state,
      action: PayloadAction<{ language: string; theme: string }>
    ) => {
      const { language, theme } = action.payload;
      return {
        ...state,
        language: language,
        theme: theme,
      };
    },
    setTheme: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        theme: action.payload,
      };
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        language: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        sessionStorage.removeItem("token");
        return {
          ...state,
          account: undefined,
          isLogin: false,
          language: "",
          theme: "",
        };
      })
      .addCase(logout.rejected, (state) => {});

    builder
      .addCase(updateDefaultLanguage.fulfilled, (state, action) => {
        const value = action.payload === undefined ? "" : action.payload;
        return {
          ...state,
          language: value,
        };
      })
      .addCase(updateDefaultLanguage.rejected, (state) => {});

    builder
      .addCase(updateDefaultTheme.fulfilled, (state, action) => {
        const value = action.payload === undefined ? "" : action.payload;
        return {
          ...state,
          theme: value,
        };
      })
      .addCase(updateDefaultTheme.rejected, (state) => {});
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
