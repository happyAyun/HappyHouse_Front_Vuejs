<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h1>공지사항 작성</h1>
      </b-col>
    </b-row>
    <notice-write-form type="register" />
  </b-container>
</template>

<script>
import NoticeWriteForm from "./child/NoticeWriteForm.vue";

export default {
  name: "NoticeWrite",
  components: {
    NoticeWriteForm,
  },
};
</script>

<style></style>
