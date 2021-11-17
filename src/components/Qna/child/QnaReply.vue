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
import http from "@/util/http-common";
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
    http.get(`/reply/${this.$route.params.no}`).then(({ data }) => {
      this.replies = data;
      console.log(this.replies);
    });
  },
};
</script>

<style></style>
