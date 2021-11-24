<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h1>Q&A 작성</h1>
      </b-col>
    </b-row>
    <qna-write-form type="register" />
  </b-container>
</template>

<script>
import QnaWriteForm from "./child/QnaWriteForm.vue";

export default {
  name: "QnaWrite",
  components: {
    QnaWriteForm,
  },
};
</script>

<style></style>
