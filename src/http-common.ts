import axios from "axios";
const baseURL: string = process.env.baseUrl || "https://deezer-proxy-api.herokuapp.com/api/v1";

interface Headers {
  [key: string]: unknown;
}
interface Options {
  headers?: Headers;
  [key: string]: unknown;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default function (options: Options) {
  const { headers = {} } = options;

  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
