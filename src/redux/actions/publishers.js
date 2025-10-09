import { api } from "@redux/helpers";
import { setLoading, setErrors } from "@redux/reducers/global";
import { setPublishers } from "@redux/reducers/publishers";

export const getPublishers = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const publishers = await api("get", "/publishers");
      dispatch(setPublishers(publishers));
    } catch (error) {
      dispatch(setErrors({ fetchPublishers: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}