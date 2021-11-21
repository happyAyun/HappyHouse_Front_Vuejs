import jwt_decode from "jwt-decode";
import { login } from "@/api/member.js";
import {
  findById,
  updateUser,
  deleteUser,
  joinUser,
  idCheck,
} from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isUserId: "아이디는 6자리이상 10자리이하 입니다.",
    isOK: false,
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
    SET_USER_JOIN: (state, isUserId) => {
      state.isUserId = isUserId;
    },
    SET_ISOK: (state, isok) => {
      state.isOK = isok;
    },
    SET_USER_LOGOUT: (state, userInfo) => {
      state.isLogin = false;
      state.userInfo = userInfo;
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
            commit("SET_USER_INFO", user);
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
            msg = "탈퇴가 완료되었습니다.";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    joinUser({ commit }, user) {
      console.log(user);
      joinUser(
        user,
        (response) => {
          console.log(response);
          let msg = "회원가입 중 문제 발생";
          if (response.data === "success") {
            commit("SET_USER_JOIN", "아이디는 6자리이상 10자리이하 입니다.");
            commit("SET_ISOK", false);
            msg = "회원가입 성공";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    idChecking({ commit }, userid) {
      console.log(userid);
      if (userid == "" || userid.length < 6 || userid.length > 10) {
        commit("SET_USER_JOIN", "아이디는 6자리이상 10자리이하 입니다.");
      } else {
        idCheck(
          userid,
          (response) => {
            console.log(response);
            if (response.data === "success") {
              commit("SET_USER_JOIN", "사용가능한 아이디입니다.");
              commit("SET_ISOK", true);
            } else {
              commit("SET_USER_JOIN", "이미 해당 아이디가 존재합니다.");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    logout({ commit }) {
      console.log("로그아웃");
      sessionStorage.removeItem("access-token");
      commit("SET_USER_LOGOUT", null);
      alert("로그아웃 되었습니다.");
    },
  },
};

export default memberStore;
