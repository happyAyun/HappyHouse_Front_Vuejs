<template>
  <b-tr>
    <b-td>{{ no }}</b-td>
    <b-th class="text-left">
      <router-link :to="{ name: 'BoardView', params: { no: no } }">{{
        title
      }}</router-link>
    </b-th>
    <b-td>{{ writer }}</b-td>
    <b-td>{{ changeDateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListRow",
  props: {
    articleno: Number,
    writer: String,
    subject: String,
    regtime: String,
  },
  computed: {
    changeDateFormat() {
      return moment(new Date(this.regtime)).format("YY.MM.DD hh:mm:ss");
    },
  },
};
</script>

<style></style>
