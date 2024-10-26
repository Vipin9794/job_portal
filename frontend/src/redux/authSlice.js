import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    authUser:null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthUser:(state,action) => {
        state.authUser = action.payload
    }
  },
});

export const { setToken, setLoading, setAuthUser } = authSlice.actions;
export default authSlice.reducer;
