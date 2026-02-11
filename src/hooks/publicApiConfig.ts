// Production API URL
export const API_BASE_URL = "https://checklist-api-8j62.onrender.com/api/";

import axios from "axios";

export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});