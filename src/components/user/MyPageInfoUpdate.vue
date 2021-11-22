<template>
  <b-jumbotron>
    <b-container class="mt-4">
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">아이디</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">이름</b-col
        ><b-form-input
          class="my-2 inputform"
          v-model="user.username"
          placeholder="수정할 이름"
          ref="username"
        ></b-form-input>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">이메일</b-col
        ><b-form-input
          class="my-2 inputform"
          v-model="user.email"
          placeholder="수정할 이메일"
          ref="email"
        ></b-form-input>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">가입일</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.joindate }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
    <hr class="my-4" />

    <b-button variant="primary" class="mr-1" @click="updateUser"
      >정보수정</b-button
    >
    <b-button type="reset" variant="danger" @click="moveMypage">취소</b-button>
  </b-jumbotron>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      user: {
        userid: "",
        username: "",
        email: "",
        joindate: "",
      },
    };
  },
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.user.username = this.userInfo.username;
    this.user.email = this.userInfo.email;
    this.user.userid = this.userInfo.userid;
    this.user.joindate = this.userInfo.joindate;
    // console.log(this.user.username);
    // this.user = this.userInfo;
    //console.log(this.user);
  },
  methods: {
    ...mapActions(memberStore, ["modifyUser"]),

    async updateUser(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.user.username &&
        ((msg = "이름 입력해주세요"),
        (err = false),
        this.$refs.username.focus());
      !this.user.email &&
        ((msg = "이메일 입력해주세요"),
        (err = false),
        this.$refs.email.focus());
      console.log(this.user);
      if (!err) alert(msg);
      else {
        await this.modifyUser(this.user);
        this.$router.push({ name: "MyPage" });
      }
    },
    moveMypage() {
      console.log(this.user);
      console.log(this.userInfo);
      //console.log(this.origin);
      this.$router.push({
        name: "MyPageMain",
      });
    },
  },
};
</script>

<style>
.inputform {
  width: 300px;
}
</style>
