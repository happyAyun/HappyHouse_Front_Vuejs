import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import Notice from "../views/Notice/Notice.vue";
import Qna from "../views/Qna/Qna.vue";
import Map from "../views/Map/Map.vue";
import Member from "../views/user/Member.vue";
import MyPage from "../views/user/MyPage.vue";

import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";

import NoticeList from "@/components/Notice/NoticeList.vue";
import NoticeWrite from "@/components/Notice/NoticeWrite.vue";
import NoticeView from "@/components/Notice/NoticeView.vue";
import NoticeUpdate from "@/components/Notice/NoticeUpdate.vue";

import QnaList from "@/components/Qna/QnaList.vue";
import QnaWrite from "@/components/Qna/QnaWrite.vue";
import QnaView from "@/components/Qna/QnaView.vue";
import QnaUpdate from "@/components/Qna/QnaUpdate.vue";

import MyPageMain from "@/components/user/MyPageMain.vue";
import MyPageInfoUpdate from "@/components/user/MyPageInfoUpdate.vue";
import store from "@/store/index.js";

Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    // router.push({ name: "SignIn" });
  } else {
    console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "Member",
    component: Member,
    children: [
      {
        path: "signin",
        name: "SignIn",
        component: MemberLogin,
      },
      {
        path: "signup",
        name: "MemberJoin",
        component: MemberJoin,
      },
    ],
  },
  {
    path: "/mypage",
    name: "MyPage",
    beforeEnter: onlyAuthUser,
    component: MyPage,
    redirect: "/mypage/main",
    children: [
      {
        path: "main",
        name: "MyPageMain",
        beforeEnter: onlyAuthUser,
        component: MyPageMain,
      },
      {
        path: "update",
        name: "MyPageInfoUpdate",
        beforeEnter: onlyAuthUser,
        component: MyPageInfoUpdate,
      },
    ],
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeList",
        component: NoticeList,
      },
      {
        path: "write",
        name: "NoticeWrite",
        beforeEnter: onlyAuthUser,
        component: NoticeWrite,
      },
      {
        path: "detail/:no",
        name: "NoticeView",
        beforeEnter: onlyAuthUser,
        component: NoticeView,
      },
      {
        path: "update/:no",
        name: "NoticeUpdate",
        beforeEnter: onlyAuthUser,
        component: NoticeUpdate,
      },
    ],
  },
  {
    path: "/qna",
    name: "Qna",
    component: Qna,
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "QnaList",
        component: QnaList,
      },
      {
        path: "write",
        name: "QnaWrite",
        beforeEnter: onlyAuthUser,
        component: QnaWrite,
      },
      {
        path: "detail/:articleno",
        name: "QnaView",
        beforeEnter: onlyAuthUser,
        component: QnaView,
      },
      {
        path: "update/:no",
        name: "QnaUpdate",
        beforeEnter: onlyAuthUser,
        component: QnaUpdate,
      },
    ],
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
