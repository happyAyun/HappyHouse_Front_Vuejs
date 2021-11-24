// import { crawling } from "@/api/news.js";

// const newsStore = {
//   namespaced: true,
//   state: {
//     news: [],
//   },
//   getters: {},
//   mutations: {},
//   actions: {
//     async startCraw() {
//       console.log("옴");
//       await crawling(
//         (response) => {
//           console.log(response);
//           let msg = "크롤링시 문제 발생";
//           if (response.data === "success") {
//             msg = "크롤링이 완료되었습니다.";
//           }
//           alert(msg);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     },
//   },
// };

// export default newsStore;
