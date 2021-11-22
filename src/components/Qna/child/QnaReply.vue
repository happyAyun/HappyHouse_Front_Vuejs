<template>
  <div>
    <div class="oneline"></div>
    <div :key="item.id" v-for="item in replies">
      <QnaReplyItem :Obj="item"></QnaReplyItem>
    </div>
    <div v-if="replies.length == 0">
      <qna-reply-write :articleno="articleno" />
    </div>
  </div>
</template>

<script>
import { listReply } from "@/api/qnaReply.js";
import QnaReplyWrite from "./QnaReplyWrite.vue";
import QnaReplyItem from "./QnaReplyItem.vue";

export default {
  name: "QnaReply",
  props: {
    articleno: Number,
  },
  components: { QnaReplyWrite, QnaReplyItem },
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      replies: [],
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  created() {
    listReply(
      this.$route.params.articleno,
      ({ data }) => {
        this.replies = data;
        console.log(this.replies);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style>
.oneline {
  border-top: 2px gray solid;
  margin-bottom: 30px;
}
</style>
