import {} from "@/api/notice.js";

const noticeStore = {
  namespaced: true,
  state: {
    pg: 1,
    spp: 5,
    start: 1,
    key: "",
    value: "",
  },
  getters: {
  
  },
  mutations: {
    SET_IS_PG: (state, page) => {
      state.pg = page;
    },
    
  },
  actions: {
     modifyUser({ commit }, user) {
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
    
  },
};

export default noticeStore;
