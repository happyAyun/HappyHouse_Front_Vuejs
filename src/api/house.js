import { apiInstance, shopInstance } from "./index.js";

const api = apiInstance();
const shop = shopInstance();

function sidoList(success, fail) {
  api
    .get(`/map/sido`)
    .then(success)
    .catch(fail);
}

function gugunList(params, success, fail) {
  api
    .get(`/map/gugun`, { params: params })
    .then(success)
    .catch(fail);
}

function dongList(params, success, fail) {
  api
    .get(`/map/dong`, { params: params })
    .then(success)
    .catch(fail);
}

function houseList(params, success, fail) {
  api
    .get(`/map/apt`, { params: params })
    .then(success)
    .catch(fail);
}

function shopList(params, success, fail) {
  shop
    .get(``, { params: params })
    .then(success)
    .catch(fail);
}

function pastList(params, success, fail) {
  api
    .get(`/map/past`, { params: params })
    .then(success)
    .catch(fail);
}

function subwayList(params, success, fail) {
  console.log("api 호출");
  api
    .get(`/map/subway`, { params: params })
    .then(success)
    .catch(fail);
}
function busList(params, success, fail) {
  api
    .get(`/map/bus`, { params: params })
    .then(success)
    .catch(fail);
}
function bikeList(params, success, fail) {
  api
    .get(`/map/bike`, { params: params })
    .then(success)
    .catch(fail);
}
export {
  sidoList,
  gugunList,
  shopList,
  dongList,
  houseList,
  pastList,
  subwayList,
  busList,
  bikeList,
};
