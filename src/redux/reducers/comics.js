import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comics: [],
  filteredComics: [],
  issues: [],
  sortedIssues: [],
  comic: {},
};

const comicsSlice = createSlice({
  name: "comics",
  initialState,
  reducers: {
    setComics: (state, action) => {
      state.comics = action.payload;
      state.filteredComics = action.payload;
    },
    setIssues: (state, action) => {
      state.issues = action.payload;
      state.sortedIssues = action.payload;
    },
    setOneComic: (state, action) => {
      state.comic = action.payload;
    },
    setFilteredComics: (state, action) => {
      state.filteredComics = action.payload;
    },
    setSortedIssues: (state, action) => {
      state.sortedIssues = action.payload
    },
    clearState: (state) => {
      state.comic = {}
      state.issues = []
      state.sortedIssues = []
    },
  }
});

export const { setComics, setIssues, setOneComic, setFilteredComics, setSortedIssues, clearState } = comicsSlice.actions;
export default comicsSlice.reducer;
