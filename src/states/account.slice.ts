import request from "@/request/request";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
type AccountType = "base" | "google";
type Account = {
  email: string;
  image: string | null;
  token: string;
  type: AccountType;
};
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
          account: undefined,
          isLogin: false,
        };
      })
      .addCase(logout.rejected, (state) => {});
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
