<template>
  <b-container class="mt-4">
    <div class="logo">
      HappyHouse
    </div>
    <PritiNavbar />
    <div class="top">
      <b-container class="bv-example-row mt-3 text-center">
        <router-view></router-view>
      </b-container>
    </div>
  </b-container>
</template>

<script>
import PritiNavbar from "@/components/PritiNavbar.vue";
export default {
  name: "Member",
  components: {
    PritiNavbar,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
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
  margin-top: 150px;
}
</style>
