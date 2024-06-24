import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Account>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
  },
});

export const { setUser } = accountSlice.actions;

export default accountSlice.reducer;
