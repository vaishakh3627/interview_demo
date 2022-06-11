import axios from "axios";

const configApp = require("../config");

let REACT_APP_API_URL = configApp.REACT_APP_API_URL;

export const getRequest = async (endpoint, params) => {
  let url = REACT_APP_API_URL + endpoint;
  return await axios.get(url, {
    params: params,
    timeout: 20000,
  });
};

export const patchRequest = async (endpoint, data, params) => {
  let url = REACT_APP_API_URL + endpoint;
  return await axios.patch(url, data, {
    params: params,
    timeout: 20000,
  });
};

export const postRequest = async (endpoint, data, params) => {
  let url = REACT_APP_API_URL + endpoint;
  return await axios.post(url, data, {
    params: params,
    timeout: 20000,
  });
};

export const deleteRequest = async (endpoint, data, params) => {
  let url = REACT_APP_API_URL + endpoint;
  return await axios.delete(url, {
    params: params,
    timeout: 20000,
  });
};
