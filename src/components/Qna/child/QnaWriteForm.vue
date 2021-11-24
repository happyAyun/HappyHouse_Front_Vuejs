<template>
  <div>
    <b-row class="mb-1">
      <b-col style="text-align: left">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-row class="my-1">
            <b-col sm="3"> </b-col>
          </b-row>
          <b-form-group
            id="subject-group"
            v-model="article.subject"
            label="제목:"
            label-for="subject"
            description="제목을 입력하세요."
          >
            <b-form-input
              id="subject"
              v-model="article.subject"
              type="text"
              required
              placeholder="제목 입력..."
              ref="subject"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="content-group" label="내용:" label-for="content">
            <b-form-textarea
              id="content"
              v-model="article.content"
              placeholder="내용 입력..."
              rows="10"
              max-rows="15"
              ref="content"
            ></b-form-textarea>
          </b-form-group>
          <b-button pill variant="outline-danger" @click="goList"
            >목록</b-button
          >
          <b-button
            type="submit"
            class="QnaRegistBtn"
            pill
            variant="info"
            v-if="this.type === 'register'"
            >글작성</b-button
          >
          <b-button
            type="submit"
            class="QnaRegistBtn"
            pill
            variant="info"
            v-else
            >글수정</b-button
          >
        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { writeArticle, getArticle, modifyArticle } from "@/api/qna";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "QnaWriteForm",
  data() {
    return {
      flagTitle: false,
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
      },
      isUserid: false, // ???????
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.flagTitle = this.article.subject.length > 0 ? "true" : "false";
    this.article.userid = this.userInfo.userid;

    if (this.type === "modify") {
      getArticle(
        this.$route.params.articleno,
        ({ data }) => {
          this.article = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    }
  },
  methods: {
    goList() {
      this.$router.push({ name: "QnaList" });
    },
    titleIsOK() {
      this.flagTitle = this.article.subject.length > 0 ? "true" : "false";
    },
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "QnaList" });
    },
    registArticle() {
      writeArticle(
        {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyArticle() {
      modifyArticle(
        {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "QnaList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "QnaList" });
    },
  },
};
</script>

<style>
.QnaRegistBtn {
  margin-left: 450px;
}
</style>
