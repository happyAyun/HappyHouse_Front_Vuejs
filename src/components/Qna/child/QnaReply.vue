<template>
  <div>
    <div class="oneline"></div>
    <div :key="item.id" v-for="item in replies">
      <QnaReplyItem :Obj="item"></QnaReplyItem>
    </div>
    <div v-if="replies.length == 0 && this.userInfo.userid == 'admin'">
      <qna-reply-write :articleno="articleno" />
    </div>
  </div>
</template>

<script>
import { listReply } from "@/api/qnaReply.js";
import QnaReplyWrite from "./QnaReplyWrite.vue";
import QnaReplyItem from "./QnaReplyItem.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "QnaReply",
  props: {
    articleno: Number,
  },
  components: { QnaReplyWrite, QnaReplyItem },
  data() {
    return {
      isNull: "",
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      replies: [],
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    isEmpty(value) {
      if (
        value == "" ||
        value == null ||
        value == undefined ||
        (value != null &&
          typeof value == "object" &&
          !Object.keys(value).length)
      ) {
        this.isNull = true;
      } else {
        this.isNull = false;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  created() {
    this.isEmpty(this.userInfo);

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
<style></style>
