<template>
  <div>
    <b-container class="mt-4">
      <div class="logo">
        HappyHouse
      </div>
      <PritiNavbar />
      <b-container class="bv-example-row mt-3 text-center">
        <div class="top">
          <router-view />
        </div>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import PritiNavbar from "@/components/PritiNavbar.vue";
export default {
  name: "News",
  components: {
    PritiNavbar,
  },
};
</script>

<style></style>
