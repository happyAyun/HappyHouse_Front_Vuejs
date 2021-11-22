// import {
//   listReply,
//   writeReply,
//   getReply,
//   modifyReply,
//   deleteReply,
// } from "../../api/qnaReply";

// const replyStore = {
//   namespaced: true,
//   state: {
//     isReply: false,
//     reply: [],
//   },
//   getters: {},
//   mutations: {
//     SET_IS_REPLY: (state, isReply) => {
//       state.isReply = isReply;
//     },
//     SET_REPLY: (state, reply) => {
//       state.reply = reply;
//     },
//   },
//   actions: {
//     list({ commit }, articleno) {
//       listReply(
//         articleno,
//         ({ data }) => {
//           commit("SET_REPLY", data);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     },
//   },
// };

// export default replyStore;
