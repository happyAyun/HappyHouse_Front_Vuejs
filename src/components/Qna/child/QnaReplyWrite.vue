<template>
  <div>
    <b-input-group :prepend="name" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        placeholder="답변을 달아주세요~!"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button variant="info" @click="createComment()">작성하기</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { writeReply } from "@/api/qnaReply.js";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "QnaReplyWrite",
  props: { articleno: Number },
  data() {
    return { name: null, context: null };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    createComment() {
      writeReply(
        {
          articleno: this.articleno,
          userid: this.userInfo.userid,
          content: this.context,
        },
        ({ data }) => {
          let msg = "답변 작성시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "답변이 등록되었습니다.";
          }
          alert(msg);
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style></style>
