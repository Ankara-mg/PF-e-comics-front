import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload)
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(e => e.id !== action.payload.id)
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload
    }
  }
});

export const { addFavorite, removeFavorite, getFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
