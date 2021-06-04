import axios from "axios";

export const axiosJP = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})
