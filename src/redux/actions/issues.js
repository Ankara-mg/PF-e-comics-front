import { api } from "@redux/helpers";
import { setLoading, setErrors } from "@redux/reducers/global";
import { setSortedIssues, setIssues } from "@redux/reducers/comics";

export const sortIssues = (sortBy, allIssues) => (dispatch) => {
  const sortedIssues = [...allIssues];

  switch (sortBy) {
    case 'ratingAsc':
      sortedIssues.sort((a, b) => a.avgRating - b.avgRating);
      break;
    case 'ratingDesc':
      sortedIssues.sort((a, b) => b.avgRating - a.avgRating);
      break;
    case 'priceAsc':
      sortedIssues.sort((a, b) => a.price - b.price);
      break;
    case 'priceDesc':
      sortedIssues.sort((a, b) => b.price - a.price);
      break;
    case 'issueNum':
      sortedIssues.sort((a, b) => b.issue_number - a.issue_number);
      break;
    default:
      return dispatch(setSortedIssues(allIssues));
  }

  dispatch(setSortedIssues(sortedIssues));
}

export const getIssues = (comicId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const issues = await api("get", `/comics/${comicId}/issues`);
      dispatch(setIssues(issues));
    } catch (error) {
      setErrors({ fetchIssues: error });
    } finally {
      dispatch(setLoading(false));
    }
  }
}