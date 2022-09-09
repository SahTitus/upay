import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  isLoading: false,
  isError: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    authData: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isLoading = false;
      console.log(action.payload);
    },
    isError: (state, action) => {
      state.isLoading = false;
			state.isError = action.payload;
    },
    isLoading: (state) => {
      state.isLoading = true;
    },

    fetchUsers: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    fetchUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    editUser: (state, action) => {
		  localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
      state.isLoading = false;

		},
    logout: (state) => {
      localStorage.removeItem("profile");
      state.user = null;
    },
    removeUser: (state, action) => {
			state.users = state.users.filter((user) => user._id !== action.payload);
      state.isLoading = false;
		},
  },
});

export const { authData, isError, isLoading, logout, fetchUsers, fetchUser, removeUser, editUser } = authSlice.actions;
export default authSlice.reducer;
