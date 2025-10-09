import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  comicInfo: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setComic: (state, action) => {
      state.comicInfo = action.payload
    },
  }
});

export const { setUsers, setComic } = adminSlice.actions;
export default adminSlice.reducer;
