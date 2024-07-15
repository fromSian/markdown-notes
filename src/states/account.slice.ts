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
  user: Account | undefined;
}

// Define the initial state using that type
const initialState: AccountState = {
  isLogin: false,
  user: undefined,
};

export const logout = createAsyncThunk("account/logout", async () => {
  const response = await request.post("/account/logout/");
  return response;
});

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Account>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state, action) => {
        sessionStorage.removeItem("token");
        return {
          user: undefined,
          isLogin: false,
        };
      })
      .addCase(logout.rejected, (state) => {});
  },
});

export const { setUser } = accountSlice.actions;

export default accountSlice.reducer;
