import axios from 'axios';

export const axiosJsonplaceholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});
