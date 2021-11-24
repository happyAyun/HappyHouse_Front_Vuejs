<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show variant="success"><h1>공지사항</h1></b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-right">
          <b-button pill variant="outline-danger" @click="moveWrite()"
            >글쓰기</b-button
          >
        </b-col>
      </b-row>
      <div>
        <b-form-input
          style="width:200px"
          v-model="text"
          placeholder="Enter your name"
        ></b-form-input>
      </div>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="articles"
            :fields="fields"
            @row-clicked="viewArticle"
          >
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { listArticle } from "@/api/notice";

export default {
  name: "NoticeList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userid", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "count", label: "조회수", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 10,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    // http.get(`/qna`).then(({ data }) => {
    //   this.articles = data;
    // });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "NoticeWrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "NoticeView",
        params: { articleno: article.articleno },
      });
    },
  },
};
</script>

<style>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: center;
}
</style>
