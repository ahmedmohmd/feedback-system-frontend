import axios from "axios";
import { toast } from "react-toastify";
import config from "../config/config";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: config.baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.data.errors) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.response.data);
    } else {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return Promise.reject();
    }
  }
);

export default api;
