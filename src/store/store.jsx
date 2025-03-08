import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/UserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
