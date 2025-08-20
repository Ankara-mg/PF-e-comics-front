import axios from "axios";

const backendURL = import.meta.env.VITE_API;

export const getAllVolumes = () => {
  // const token = JSON.parse(localStorage.getItem("token"))
  return async (dispatch) => {
    const volumes = await axios({
      method: 'GET',
      url: `${backendURL}/comics`,
      // headers: {
      // "Authorization": `Bearer ${token.token}`
      // }
    })
    return dispatch({
      type: "GET_ALL_COMICS",
      payload: volumes.data
    })
  }
}

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
  const filtrando = payload.slice(0, 10)
      return {
        type: "FILTER_FOR_RELEASE",
        payload
      }
    }

