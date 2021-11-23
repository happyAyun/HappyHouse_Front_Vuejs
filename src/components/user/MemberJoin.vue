<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디:" label-for="userid">
              <p id="userid_msg">{{ isUserId }}</p>
              <b-form-input
                id="userid"
                v-model="user.userid"
                required
                placeholder="아이디 입력...."
                @keyup="this.checkId"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <p id="userid_msg">{{ isOKPass }}</p>
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.userpwd"
                required
                placeholder="비밀번호 입력...."
                @keyup="isPass"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호 확인:" label-for="userpwd2">
              <b-form-input
                type="password"
                id="userpwd2"
                v-model="user.userpwd2"
                required
                placeholder="비밀번호 확인 입력...."
                @keyup="isPass"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="username">
              <b-form-input
                type="username"
                id="username"
                v-model="user.username"
                required
                placeholder="이름 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이메일:" label-for="email">
              <b-form-input
                type="email"
                id="email"
                v-model="user.email"
                required
                placeholder="이메일 입력...."
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="enterJoin"
              >회원가입</b-button
            >
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="movePage"
              >초기화</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
const memberStore = "memberStore";

export default {
  name: "MemberJoin",
  data() {
    return {
      user: {
        userid: "",
        username: "",
        userpwd: "",
        userpwd2: "",
        email: "",
      },
      checked: false,
      isOKPass: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["isUserId", "isOK", "isLogin"]),
  },
  methods: {
    ...mapActions(memberStore, ["idChecking", "joinUser", "kakaoLogin"]),
    async getToken() {
      await this.kakaoLogin(this.code);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        console.log("성공!!!");
        this.getUserInfo(token);
        alert("로그인 성공!");
        this.$router.push({ name: "Home" });
      } else {
        alert("로그인 실패");
      }
    },
    checkId() {
      console.log("유효성검사");
      console.log(this.user.userid);
      this.idChecking(this.user.userid);
      // this.checked = "hi";
    },
    isPass() {
      console.log("비번검사");
      // console.log(this.userpwd + " " + this.userpwd2);
      if (this.user.userpwd === this.user.userpwd2) {
        this.checked = true;
        this.isOKPass = "비밀번호가 서로 일치합니다.";
      } else {
        this.checked = false;
        this.isOKPass = "비밀번호가 서로 일치하지 않습니다.";
      }
    },
    async enterJoin() {
      console.log(this.checked);
      console.log(this.isOK);
      if (!this.isOK || !this.checked) {
        alert("유효성이 올바르지 않습니다.");
        return;
      } else {
        await this.joinUser(this.user);
        this.$router.replace({ name: "SignIn" });
      }
    },
  },
};
</script>

<style></style>
