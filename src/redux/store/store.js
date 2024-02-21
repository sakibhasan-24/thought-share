import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user: userReducer,
  },
});

export default store;
