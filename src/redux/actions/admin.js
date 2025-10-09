import { api } from "@redux/helpers";
import { setUsers } from "@redux/reducers/admin";
import { setLoading, setErrors } from "@redux/reducers/global";
import { setRatings } from "@redux/reducers/ratings";

const getUsers = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const users = await api("get", "/admin/user-list");
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(setErrors({ fetchUsers: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

const getAllRatings = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const ratings = await api("get", "/ratings");
      dispatch(setRatings(ratings));
    } catch (error) {
      dispatch(setErrors({ fetchRatings: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}


// TODO - Mover funciones a los componentes.
const deleteRating = (ratingId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("delete", `/admin/ratings/${ratingId}`);
      getAllRatings();
    } catch (error) {
      dispatch(setErrors({ deleteRating: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

const changeUserRole = (userId, role) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("put", `/admin/user-list/${userId}/role`, role);
    } catch (error) {
      dispatch(setErrors({ updateUser: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

const setUserActive = (userId, status) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("put", `/admin/user-list/${userId}/active`, status);
    } catch (error) {
      dispatch(setErrors({ updateUser: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

const addComic = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("post", "/comics", { comicData: data });
    } catch (error) {
      dispatch(setErrors({ newComic: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

const sendEmail = (email) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("post", "/admin/send-email", { email_address: email });
    } catch (error) {
      dispatch(setErrors({ sendEmail: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export { getUsers, getAllRatings, deleteRating, changeUserRole, setUserActive, addComic, sendEmail };