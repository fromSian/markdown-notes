import { configureStore, Store } from "@reduxjs/toolkit";
import account from "./account.slice";
import ui from "./ui.slice";

export const store: Store = configureStore({
  reducer: {
    account: account,
    ui: ui,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
