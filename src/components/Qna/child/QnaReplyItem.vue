<template>
  <div>
    <div class="reply">
      <table class="tb">
        <tr>
          <td class="tbd">작성일자</td>
          <td class="tbd">작성자</td>
          <td rowspan="2" class="tbreply">
            <h3>{{ Obj.content }}</h3>
          </td>
          <div
            v-if="
              this.userInfo.userid == Obj.userid ||
                'admin' == this.userInfo.userid
            "
          >
            <td rowspan="2" class="tbd">
              <h3>
                <b-button
                  style="float: right;"
                  size="sm"
                  variant="primary"
                  @click="deleteReply"
                  >삭제</b-button
                >
              </h3>
            </td>
          </div>
        </tr>
        <tr>
          <td>{{ changeDateFormat }}</td>
          <td>{{ Obj.userid }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { deleteReply } from "@/api/qnaReply.js";
import { mapState } from "vuex";
import moment from "moment";

const memberStore = "memberStore";

export default {
  name: "QnaReplyItem",
  props: {
    Obj: {},
  },
  created() {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
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
            location.reload();
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
.tb {
  text-align: center;
}
.tbd {
  width: 150px;
}
.tbreply {
  width: 700px;
  border: 0px solid grey;
}
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
.reply {
  padding-bottom: 50px;
  border-bottom: 2px solid gray;
}
</style>
