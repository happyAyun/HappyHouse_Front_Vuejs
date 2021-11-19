import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Notice from "../views/Notice/Notice.vue";
import Qna from "../views/Qna/Qna.vue";
import Map from "../views/Map/Map.vue";

import NoticeList from "@/components/Notice/NoticeList.vue";
import NoticeWrite from "@/components/Notice/NoticeWrite.vue";
import NoticeView from "@/components/Notice/NoticeView.vue";
import NoticeUpdate from "@/components/Notice/NoticeUpdate.vue";

import QnaList from "@/components/Qna/QnaList.vue";
import QnaWrite from "@/components/Qna/QnaWrite.vue";
import QnaView from "@/components/Qna/QnaView.vue";
import QnaUpdate from "@/components/Qna/QnaUpdate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
        component: NoticeWrite,
      },
      {
        path: "detail/:no",
        name: "NoticeView",
        component: NoticeView,
      },
      {
        path: "update/:no",
        name: "NoticeUpdate",
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
        component: QnaWrite,
      },
      {
        path: "detail/:no",
        name: "QnaView",
        component: QnaView,
      },
      {
        path: "update/:no",
        name: "QnaUpdate",
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
