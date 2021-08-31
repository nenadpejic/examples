import axios from "axios";

export const baseURL = "https://jsonplaceholder.typicode.com"

export const axiosJsonplaceholder = axios.create({
  baseURL,
})
