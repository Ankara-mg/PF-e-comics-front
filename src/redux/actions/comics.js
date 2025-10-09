import { api } from "@redux/helpers";
import { setLoading, setWaking, setErrors } from "@redux/reducers/global";
import { setComics, setOneComic, clearState, setFilteredComics } from "@redux/reducers/comics";

export const getAllComics = () => {
  const start = Date.now();
  const maxDuration = 60000; // 1 minute

  return async (dispatch) => {
    dispatch(setLoading(true));

    const maxRetries = 3;
    let retries = 0;

    const wakeTimeout = setTimeout(() => {
      dispatch(setWaking(true));
    }, 2000);

    while (retries < maxRetries && (Date.now() - start) < maxDuration) {
      try {
        const comics = await api("get", "/comics", null, { timeout: 10000 });
        dispatch(setComics(comics));
        return;

      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          dispatch(setErrors({ fetchComics: error }));
          console.error("Failed to fetch comics:", error.message);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
      }
    }

    clearTimeout(wakeTimeout);
    dispatch(setLoading(false));
    dispatch(setWaking(false));
  };
};

export const getComicDetail = (comicId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const comic = await api("get", `/comics/${comicId}`);
      console.log("COMIC - ", comic)
      dispatch(setOneComic(comic));
    } catch (error) {
      dispatch(setErrors({ fetchComic: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const searchComic = (comicName) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const comics = await api("get", `/comics/search?name=${comicName}`);
      dispatch(setFilteredComics(comics));
    } catch (error) {
      setErrors({ fetchComics: error });
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export function filterByPublisher(publisherName, comicList) {
  return (dispatch) => {
    const filteredComics = comicList.filter(c => c.publisher?.includes(publisherName));
    dispatch(setFilteredComics(filteredComics));
  }
}

export function sortByName(order, comicList) {
  const sortedComics = [...comicList];

  return (dispatch) => {
    sortedComics.sort((a, b) => {
      if (a.name > b.name) return order === "Asc" ? 1 : -1;
      if (b.name > a.name) return order === "Asc" ? -1 : 1;
      return 0;
    });

    dispatch(setFilteredComics(sortedComics));
  }
}

export const resetComics = () => {
  return (dispatch) => {
    dispatch(clearState());
  }
}
