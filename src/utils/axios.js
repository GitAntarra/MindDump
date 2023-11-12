import axios from "axios";
import Axios from "axios";
import {
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  CLOUD_BASIC_TOKEN,
  CLOUD_ENDPOINT,
  CLOUD_NAME,
} from "../constants";

const api = Axios.create({
  baseURL: `${CLOUD_ENDPOINT}/${CLOUD_NAME}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Basic ${CLOUD_BASIC_TOKEN}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log({ utils_asdsa: error.response.status });
    let msg = "";
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        msg = "Portal Ropa Network Service Error";
      } else {
        const responses = error.response;
        if (responses !== undefined) {
          if (responses.status === 401) {
            if (responses.data) {
              msg = responses.data.msg;
            } else {
              msg = "User Unauthorized or token expired";
            }
          } else if (responses.status === 420) {
            msg = "Rate Limit Exceeded. Limit of 500 api operations reached";
          } else if (responses.data.msg !== undefined) {
            msg = responses.data.msg;
          } else {
            msg = responses.statusText;
          }
        }
      }

      return { data: { data: responses, err: true } };
    }
    return { data: { data: [], err: true } };
    // return Promise.reject(error);
  }
);

export default api;
