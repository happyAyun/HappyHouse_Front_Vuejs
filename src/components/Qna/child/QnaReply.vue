<template>
  <div>
    <b-alert show>답글</b-alert>
    <div :key="item.id" v-for="item in replies">
      <QnaReplyItem :Obj="item"></QnaReplyItem>
    </div>
    <qna-reply-write :no="no" />
  </div>
</template>

<script>
import { listReply } from "@/api/qnaReply.js";
import QnaReplyWrite from "./QnaReplyWrite.vue";
import QnaReplyItem from "./QnaReplyItem.vue";

export default {
  name: "QnaReply",
  props: {
    no: Number,
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
      this.$route.params.no,
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

<style></style>
