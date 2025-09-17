import axios from "axios";

const backendURL = import.meta.env.VITE_API;

export const getAllVolumes = () => {  
  // const token = JSON.parse(localStorage.getItem("token"))
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    const wakeTimeout = setTimeout(() => {
      dispatch({ type: "SHOW_WAKEUP_MESSAGE" });
    }, 2000);

    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const volumes = await axios({
          method: 'GET',
          url: `${backendURL}/comics`,
          timeout: 10000,
        });

        clearTimeout(wakeTimeout);
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({
          type: "GET_ALL_COMICS",
          payload: volumes.data
        });
        return;

      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          clearTimeout(wakeTimeout);
          dispatch({ type: "SET_LOADING", payload: false });
          console.error("Failed to fetch comics:", error.message);
          return;
        }

        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
      }
    }
  };
};

export const volumeDetail = (id) => {
  return async (dispatch) => {
    const volume = await axios({
      method: 'get',
      url: `${backendURL}/comics/${String(id)}`,
    })
    return dispatch({
      type: "GET_COMIC",
      payload: volume.data
    })
  }
}

export const getIssues = (id) => {
  return async (dispatch) => {
    let ratings = null
    try {
      const issues = await axios({
        method: 'get',
        url: `${backendURL}/comics/issues/${id}`,
      })

      if (issues) {
        ratings = await axios({
          method: 'get',
          url: `${backendURL}/comics/issues/rating/${id}`,
        })
      }

      return dispatch({
        type: "GET_ISSUES",
        payload: ratings.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const searchComic = (volume_name) => {
  return async (dispatch) => {
    const comics = await axios({
      method: 'get',
      url: `${backendURL}/comics/search?name=${volume_name}`
    })
    return dispatch({
      type: "SEARCH_COMICS",
      payload: comics.data
    })
  }
}

export const reset_comicState = (payload) => {
  return {
    type: "RESET_STATE",
    payload
  }
}

export function filterPublishers(payload, comics) {
  return (dispatch) => {

    const allpubli = comics
    const filterByP = allpubli.filter(p => {
      if(!p.publisher) return undefined
        return p.publisher.includes(payload)
    })

    return dispatch ({
    type: "FILTER_COMIC_FOR_PUBLISHERS",
    payload: filterByP
      })
    }}
 
export function filterAD(order, comics) {
  const sortedArray = order === 'Asc' ?
        comics.sort((a, b) => {
          if (a.name > b.name)return 1;
          if (b.name > a.name)return -1;
          return 0;
        }) :
        comics.sort(function(a, b) {
          if (a.name > b.name)return -1;
          if (b.name > a.name)return 1;
          return 0;
        })
    return (dispatch) => {
      return dispatch({
        type: "ORDER_NAME",
        payload: sortedArray
      })
    }
  }

export function filterForRelease(payload) {
  payload.slice(0, 10)
      return {
        type: "FILTER_FOR_RELEASE",
        payload
      }
    }

