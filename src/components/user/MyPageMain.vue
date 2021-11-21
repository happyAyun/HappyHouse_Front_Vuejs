<template>
  <b-jumbotron>
    <template #header>My Page</template>

    <template #lead> 내 정보 확인페이지입니다. </template>

    <hr class="my-4" />

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
        ><b-col cols="4" align-self="start">{{ userInfo.username }}</b-col>
        <b-col cols="2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="2" align-self="end">이메일</b-col
        ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
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

    <b-button variant="primary" class="mr-1" @click="moveUpdatePage"
      >정보수정</b-button
    >
    <b-button variant="danger" @click="joinOut">회원탈퇴</b-button>
    <b-button variant="danger" @click="logoutUser">로그아웃</b-button>
  </b-jumbotron>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: {},
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["deleteUser", "logout"]),

    moveUpdatePage() {
      this.$router.replace({
        name: "MyPageInfoUpdate",
      });
    },
    async joinOut() {
      if (confirm("정말로 삭제?")) {
        console.log(this.userInfo.userid);
        await this.deleteUser(this.userInfo.userid);
        this.$router.push({ name: "Home" });
      }
    },
    async logoutUser() {
      await this.logout();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>
