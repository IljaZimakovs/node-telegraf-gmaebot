import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.USER_MANAGEMENT_API_URL,
  timeout: 5000,
});
