import { kakaoInstance } from "./index.js";

const kakaoApi = kakaoInstance();

async function kakaoLogin(params, success, fail) {
  console.log("api");
  kakaoApi
    .get(``, { params: params })
    .then(success)
    .catch(fail);
}

export { kakaoLogin };
