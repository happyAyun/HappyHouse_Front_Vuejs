import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import { findById, updateUser, deleteUser } from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function(state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_USER_ERASE: (state, userInfo) => {
      state.userInfo = userInfo;
      state.isLogin = false;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyUser({ commit }, user) {
      console.log(user);
      await updateUser(
        user,
        (response) => {
          console.log(response);
          let msg = "수정처리시 문제 발생";
          if (response.data === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteUser({ commit }, userid) {
      console.log(userid);
      sessionStorage.removeItem("access-token");
      deleteUser(
        userid,
        (response) => {
          console.log(response);
          let msg = "탈퇴처리시 문제 발생";
          if (response.data === "success") {
            commit("SET_USER_ERASE", null);
            msg = "퇄퇴가 완료되었습니다.";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
