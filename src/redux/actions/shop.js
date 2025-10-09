import { api } from "@redux/helpers";
import { setLoading, setErrors } from "@redux/reducers/global";
import { setShoppingCart, addToStateCart, removeFromStateCart } from "@redux/reducers/shop";

export const getShoppingCart = (userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const shoppingCart = await api("get", `/shop/${userId}/cart`);
      localStorage.setItem("cart", JSON.stringify(shoppingCart));
      dispatch(setShoppingCart(shoppingCart));
    } catch (error) {
      dispatch(setErrors({ getShoppingCart: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const addToCart = (issueData, userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const newPurchase = await api("post", `/shop/${userId}/cart`, { issue_data: issueData });
      dispatch(addToStateCart(newPurchase));
    } catch (error) {
      dispatch(setErrors({ addToCart: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export const removeFromCart = (issueData, userId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api("delete", `/shop/${userId}/cart`, { issue_data: issueData });
      dispatch(removeFromStateCart(issueData));
    } catch (error) {
      dispatch(setErrors({ removeFromCart: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}

export function processPayment(comics, totalPrice, card, userEmail, userId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const purchase = {
      payment_method_id: card,
      price: totalPrice,
      user_email: userEmail,
      customer_id: userId,
    };

    try {
      await api("post", `/shop/checkout`, purchase);
      Promise.all(comics.map(c => dispatch(removeFromCart(c, userId))));
    } catch (error) {
      dispatch(setErrors({ processPayment: error }));
    } finally {
      dispatch(setLoading(false));
    }
  }
}
