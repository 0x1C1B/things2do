import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_THINGS2DO_API,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

export default client;
