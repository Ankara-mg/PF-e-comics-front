import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload
    },
    addFavoriteState: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavoriteState: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  }
});

export const { setFavorites, addFavoriteState, removeFavoriteState } = userSlice.actions;
export default userSlice.reducer;
