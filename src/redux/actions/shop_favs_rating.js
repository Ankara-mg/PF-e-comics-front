import axios from "axios";

const backendURL = import.meta.env.VITE_API;


export const setShoppingCart = () => {
  return async (dispatch) => {

    const userId = localStorage.getItem("id")

    const comic_info = await axios({
      method: 'get',
      url: `${backendURL}/shop/cart/${userId}/carrito`,
    })

    if(comic_info.data && comic_info.data.length > 0){

      localStorage.setItem("carrito", JSON.stringify(comic_info.data));

      return dispatch ({
        type: "SET_SHOPPING_CART",
        payload: comic_info.data
      })
    } else {
      localStorage.setItem("carrito", null);
      return dispatch({
        type: "SET_SHOPPING_CART",
        payload: []
      })
    }
  }
}

export const addToCart = (products) => {
  return async (dispatch) => {
    const compra = {
      comic: products,
      userId: localStorage.getItem("id")
    }
    await axios.post(`${backendURL}/shop/cart`, compra);
    return dispatch({
      type: "ADD_TO_CART",
      payload: products,
    })
  }
}


export const removeFromCart = (products) => {
  return async (dispatch) => {
    await axios({ 
      method: 'DELETE',
      url: `${backendURL}/shop/cart`,
      data: {
        comic: products,
        userId: localStorage.getItem("id")
      }
    })

    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: products,
    })
  }
}

export const removeFromCartOnly = (products) => {
  return async (dispatch) => {
    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: products,
    })
  }
}

export function processPayment(comic, card, status){
  const userId = localStorage.getItem("id")
  const compra = {
    userId,
    comic,
    card,
    status,
  }
  return async (dispatch) => {
    await axios({
      method: 'PUT',
      url: `${backendURL}/shop/cart`,
      data: compra
    })

    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: comic,
    })
  }
}


export function addFavorite(issuesId, userId) {
  // const token = JSON.parse(localStorage.getItem("token"))
  return async (dispatch) => {
    await axios({
      method: 'POST',
      url: `${backendURL}/fav`,
      data: { issuesId, userId }
      // headers: {
      // "Authorization": `Bearer ${token.token}`
      // }
    })
  }
}


export function removeFavorite(issuesId, userId) {
  // const token = JSON.parse(localStorage.getItem("token"))
  return async (dispatch) => {
    await axios({
      method: 'DELETE',
      url: `${backendURL}/fav`,
      data: { issuesId, userId }
      // headers: {
      // "Authorization": `Bearer ${token.token}`
      // }
    })
  }
}


export const getAllfavoritesDb = (userId) => {
  // const token = JSON.parse(localStorage.getItem("token"))
  return async (dispatch) => {
    const favorites = await axios({
      method: 'GET',
      url: `${backendURL}/fav/${userId}`,
      // const res = await axios.get('http://localhost:3000/fav', { params: { userId: userId } });
      // headers: {
      // "Authorization": `Bearer ${token.token}`
      // }
    })
    return dispatch({
      type: "GET_FAVORITE",
      payload: favorites.data[0].issues    //.data[0].issues,

    })
  }
}

export const  getAllPurchases = (userId) => {
  return async (dispatch) => {
    const purchases = await axios({
      method: 'GET',
      url: `${backendURL}/shop/cart/${userId}/comprado`,
    })
    return dispatch({
      type:"GET_PURCHASES",
      payload: purchases.data
    })
  }
}
