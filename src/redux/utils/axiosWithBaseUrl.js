import axios from 'axios';
export const axiosWithBaseURL = () =>
  axios.create({
    baseURL: process.env.API_URL,
  });
