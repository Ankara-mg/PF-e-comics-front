import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: [],
};

const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRatings: (state, action) => {
      state.ratings = action.payload
    },
    addRating: (state, action) => {
      state.ratings = { ...state.ratings, ...action.payload }
    }
  }
});

export const { setRatings, addRating } = ratingsSlice.actions;
export default ratingsSlice.reducer;
