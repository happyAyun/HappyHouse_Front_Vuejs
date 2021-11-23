<template>
  <div>카카오 소셜 로그인</div>
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
    ...mapState(memberStore, ["isLogin"]),
  },
  created() {
    this.code = this.$route.query.code;
    console.log(this.code);
    this.getToken();
    this.$router.push({
      name: "Home",
    });
  },
  methods: {
    ...mapActions(memberStore, ["kakaoLogin"]),
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
  },
};
</script>

<style></style>
