import axios from "axios";
// require("dotenv").config();
import dotenv from "dotenv";
export const API_PREFIX = "";
// const BASE_URL = "https://bct-trade-alert-backend-production.up.railway.app";
// const BASE_URL = "http://192.168.1.139:8000/";
// const BASE_URL = "http://54.198.168.167:8000/";
// const BASE_URL = "https://dev-api.basecamptrading.io/";
dotenv.config();
const BASE_URL = process.env.BASE_URL;

const axiosApi = axios.create({
  baseURL: `${BASE_URL}`,
});

export const defaultHeaders = {
  contentType: "application/json",
};

export const axiosInstance = axiosApi;

export async function get(url, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .get(url, { params: config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function patch(url, data, config = {}) {
  return await axiosApi
    .patch(url, { ...data }, { ...config })
    .then((response) => response)
    .catch((error) => error.response);
}

export async function post(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .post(url, { ...data }, { ...config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function postAsArray(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .post(url, data, {
        ...config,
        headers: authHeader({
          ...defaultHeaders,
          contentType: "application/json",
        }),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function postFormData(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .post(url, data, {
        ...config,
        headers: authHeader({
          ...defaultHeaders,
          contentType: "multipart/form-data",
        }),
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function put(url, data, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .put(url, { ...data }, { ...config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function del(url, config = {}) {
  return new Promise((resolve, reject) => {
    axiosApi
      .delete(url, { ...config, headers: authHeader() })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const thunkHandler = async (asyncFn, thunkAPI) => {
  try {
    const response = await asyncFn;
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
};

export const authHeader = (header = defaultHeaders) => {
  let token = localStorage.getItem("accessToken");
  console.log("token", token);
  let headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (header.contentType) {
    headers["Content-Type"] = header.contentType;
  }
  return headers;
};
