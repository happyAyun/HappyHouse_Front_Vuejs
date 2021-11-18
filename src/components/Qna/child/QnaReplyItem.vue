<template>
  <div>
    <div class="comment-list-item">
      <div class="comment-list-item-name">
        <!-- <div>{{ obj.userid }}</div> -->
        <div>{{ changeDateFormat }}</div>
      </div>
      <div class="comment-list-item-context">{{ Obj.content }}</div>
      <div class="comment-list-item-button">
        <b-button variant="info" @click="modifyReply">수정</b-button>
        <b-button variant="info" @click="deleteReply">삭제</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteReply } from "@/api/qnaReply.js";
import moment from "moment";
export default {
  name: "QnaReplyItem",
  props: {
    Obj: {},
  },
  created() {},
  computed: {
    changeDateFormat() {
      return moment(new Date(this.Obj.regtime)).format("YYYY.MM.DD hh:mm:ss");
    },
  },
  methods: {
    deleteReply() {
      deleteReply(
        this.Obj.id,
        ({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
}

.comment-list-item-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}

.comment-list-item-context {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50em;
  border: 0.5px solid black;
}

.comment-list-item-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}

.btn {
  margin-bottom: 1em;
}

.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
</style>
