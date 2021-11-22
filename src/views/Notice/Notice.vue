<template>
  <div>
    <div class="logo">
      HappyHouse
    </div>
    <PritiNavbar />
    <b-container class="bv-example-row mt-3 text-center">
      <div class="top">
        <router-view></router-view>
      </div>
    </b-container>
  </div>
</template>

<script>
import PritiNavbar from "@/components/PritiNavbar.vue";

export default {
  name: "Notice",
  components: {
    PritiNavbar,
  },
};
</script>

<style>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
}
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
