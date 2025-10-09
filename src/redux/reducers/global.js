import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errors: {},
  isWaking: false,
  currentPage: 1,
  theme: "light",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setWaking: (state, action) => {
      state.isWaking = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    clearErrors: (state) => {
      state.errors = {}
    },
  }
});

export const { setLoading, setWaking, setErrors, setCurrentPage, setTheme, clearErrors } = globalSlice.actions;
export default globalSlice.reducer;
