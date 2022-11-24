import http from "../http-common";

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
};

const get = (endpoint: string, token = "") => {
  const options = {
    headers: {
      ...axiosConfig,
    },
  };
  return http(options).get(endpoint);
};

const ApiService = {
  get
};

export default ApiService;
