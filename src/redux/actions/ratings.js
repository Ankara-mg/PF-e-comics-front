import { api } from "@redux/helpers";
import { setLoading, setErrors } from "@redux/reducers/global";
import { setRatings, addRating } from "@redux/reducers/ratings";

export const getIssueRatings = (comicId, issueId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const ratings = await api("get", `/comics/${comicId}/issues/${issueId}/ratings`);
      dispatch(setRatings(ratings));
    } catch (error) {
      dispatch(setErrors({ fetchIssueRatings: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

// TODO - Revisar dónde quedan guardados los ratings
export const getRatingsAverage = (comicId, issueId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("get", `/comics/${comicId}/issues/${issueId}/ratings/average`);
    } catch (error) {
      dispatch(setErrors({ fetchRatingsAverage: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const postRating = (comicId, issueId, newRating) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const postedRating = await api("post", `/comics/${comicId}/issues/${issueId}/ratings`, newRating);
      dispatch(addRating(postedRating));
    } catch (error) {
      dispatch(setErrors({ postNewRating: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}
