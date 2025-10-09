import { api } from "@redux/helpers";
import { setLoading, setErrors } from "@redux/reducers/global";
import { addFavoriteState, removeFavoriteState, setFavorites } from "@redux/reducers/user";

export function addFavorite(issueId, userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("post", `/users/${userId}/favorite-list`, { issue_id: issueId });
      dispatch(addFavoriteState(issueId));
    } catch (error) {
      dispatch(setErrors({ addFavorite: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export function removeFavorite(issueId, userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("delete", `/users/${userId}/favorite-list`, { issue_id: issueId });
      dispatch(removeFavoriteState(issueId));
    } catch (error) {
      dispatch(setErrors({ removeFavorite: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const getFavoriteList = (userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const favorites = await api("get", `/users/${userId}/favorite-list`);
      dispatch(setFavorites(favorites));
    } catch (error) {
      dispatch(setErrors({ getFavorites: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}