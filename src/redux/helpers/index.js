import axios from "axios"

const backendURL = import.meta.env.VITE_API;

const api = async (method, route, data, config = {}) => {
  const res = await axios({
    method,
    url: backendURL + route,
    data,
    ...config,
  });

  return res.data;
}

export { api };