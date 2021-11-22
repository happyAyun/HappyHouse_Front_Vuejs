<template>
  <b-container class="mt-4">
    <div class="logo">
      HappyHouse
    </div>
    <PritiNavbar />
    <b-container class="bv-example-row mt-3 text-center">
      <div class="top">
        <b-alert show variant="light">
          <h1>{{ userid }}님의 마이페이지</h1></b-alert
        >
        <router-view></router-view>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import PritiNavbar from "@/components/PritiNavbar.vue";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MyPage",
  components: {
    PritiNavbar,
  },
  data() {
    return {
      userid: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    this.userid = this.userInfo.userid;
  },
};
</script>

<style>
.logo {
  text-shadow: #000000;
  font-size: 48px;
  font-weight: bold;
  transform: translateY(-50%);
  padding: 20px 20px;
  height: max-content;
  position: absolute;
  left: 40px;
  top: 30px;
}
.top {
  margin-top: 100px;
}
</style>
