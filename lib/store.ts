import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/user/userSlice";
import modalReducer, { modalSlice } from "./features/modal/modalSlice";
import postsReducer from "./features/post/postSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
      modal: modalReducer,
      modalSlice: modalSlice.reducer,
      posts: postsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
