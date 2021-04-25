import axios, { Method } from "axios";

const url = process.env.NEXT_PUBLIC_ORIGIN_URL;

export async function handleRequest(path: string, method: Method = "GET", data?: unknown) {
  return axios({
    url: `${url}/api${path}`,
    data,
    method,
  });
}
