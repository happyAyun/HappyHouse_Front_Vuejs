import { apiInstance } from "./index.js";

const api = apiInstance();

async function crawling(success, fail) {
  await api
    .get(`/web/craw`)
    .then(success)
    .catch(fail);
  // .finally(function(response) {
  //   console.log(response);
  // });
}

export { crawling };
