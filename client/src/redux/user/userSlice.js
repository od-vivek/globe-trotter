import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signUpStart: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutUserStart: (state) => {
      state.loading = true;
    },
    signoutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // New actions for user profile page
    resetPasswordStart: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetPasswordFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getUserStart: (state) => {
      state.loading = true;
      state.error = null; // Clear the error field when starting to fetch user data
    },
    getUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfileStart: (state) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    postBlogStart: (state) => {
      state.loading = true;
    },
    postBlogSuccess: (state, action) => {
      // state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    postBlogFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  resetError,
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  postBlogFailure,
  postBlogStart,
  postBlogSuccess
} = userSlice.actions;

export default userSlice.reducer;
