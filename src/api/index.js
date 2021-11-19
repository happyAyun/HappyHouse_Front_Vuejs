import axios from "axios";
import { API_BASE_URL, APT_SHOP_URL } from "@/config/index.js";

function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

function shopInstance() {
  const instance = axios.create({
    baseURL: APT_SHOP_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

export { apiInstance, shopInstance };
