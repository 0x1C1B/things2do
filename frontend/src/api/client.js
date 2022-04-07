import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_THINGS2DO_API,
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

export default client;
