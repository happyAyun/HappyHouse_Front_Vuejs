import axios from "axios";
import { API_BASE_URL, APT_SHOP_URL, API_KAKAO_URL } from "@/config";

function apiInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(instance);
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

function kakaoInstance() {
  const instance = axios.create({
    baseURL: API_KAKAO_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(instance);
  return instance;
}

export { apiInstance, shopInstance, kakaoInstance };
