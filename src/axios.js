import axios from "axios";

// const HOME_URL = "https://ebid-thom.herokuapp.com/api/";
const HOME_URL = "http://127.0.0.1:8000/api/";

const baseURL = HOME_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    let originalRequest = error.config;
    console.log(error.response);
    console.log(originalRequest.url);
    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === "/users/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          console.log("attempting refresh of access token");
          return await axiosInstance
            .post("/users/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              console(response);
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              const newAuthorizationHeader = "Bearer " + response.data.access;

              axiosInstance.defaults.headers["Authorization"] =
                newAuthorizationHeader;
              originalRequest.headers["Authorization"] = newAuthorizationHeader;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              // Abort if refresh token is invalid
              console.log(err);
              removeTokensAndLogOut();
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          removeTokensAndLogOut();
        }
      } else {
        console.log("Refresh token not available.");
        removeTokensAndLogOut();
      }
    }

    return Promise.reject(error);
  }
);

const removeTokensAndLogOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login/";
};

export default axiosInstance;
