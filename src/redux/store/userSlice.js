import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      // action is data
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    userUpdateStart: (state) => {
      state.loading = true;
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    userUpdateFailed: (state) => {
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
    },
    deleteUserFailed: (state) => {
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  userUpdateStart,
  userUpdateSuccess,
  userUpdateFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
