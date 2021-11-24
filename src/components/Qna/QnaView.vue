<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <h1 style="margin-bottom:50px">Q&A</h1>
      <b-row class="mb-1"> </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            bg-variant="dark"
            text-variant="white"
            :header-html="
              `<h1>${article.articleno}.
          ${article.subject}</h1>`
            "
          >
          </b-card>
          <b-card-body class="text-left">
            <div>
              <h5 style="display:inline-block">
                작성자 : {{ article.userid }}
              </h5>

              <h5 style="display:inline-block; float: right;">
                작성 일자 : {{ article.regtime }}
              </h5>
            </div>
          </b-card-body>
          <div>
            <b-jumbotron v-html="message"> </b-jumbotron>
          </div>
        </b-col>
      </b-row>
      <div style="margin-bottom:50px">
        <qna-reply :articleno="article.articleno" />
      </div>
    </b-container>
    <b-col class="text-left">
      <b-button variant="warning" @click="listArticle">목록</b-button>
    </b-col>
    <b-col class="text-right">
      <b-button pill variant="info" @click="moveModifyArticle">수정</b-button>
      <b-button pill variant="outline-danger" @click="deleteArticle"
        >삭제</b-button
      >
    </b-col>
  </div>
</template>

<script>
import { getArticle, deleteArticle } from "@/api/qna";
import QnaReply from "./child/QnaReply.vue";
// import { mapState } from "vuex";

// const memberStore = "memberStore";

export default {
  components: { QnaReply },
  data() {
    return {
      article: {},
      //  userid: this.userInfo.userid,
    };
  },
  computed: {
    // ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "QnaList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "QnaUpdate",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "QnaList" });
        });
      }
    },
  },
};
</script>

<style></style>
