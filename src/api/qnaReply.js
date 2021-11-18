import { apiInstance } from "./index.js";

const api = apiInstance();

function listReply(param, success, fail) {
  api
    .get(`/reply`, { params: param })
    .then(success)
    .catch(fail);
}

function writeReply(article, success, fail) {
  api
    .post(`/reply`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function getReply(articleno, success, fail) {
  api
    .get(`/reply/${articleno}`)
    .then(success)
    .catch(fail);
}

function modifyReply(article, success, fail) {
  api
    .put(`/reply`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteReply(articleno, success, fail) {
  api
    .delete(`/reply/${articleno}`)
    .then(success)
    .catch(fail);
}
export { listReply, writeReply, getReply, modifyReply, deleteReply };
