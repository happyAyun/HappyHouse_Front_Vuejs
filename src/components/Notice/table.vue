<template>
  <div>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button pill variant="outline-success" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <div>
      <vue-good-table :columns="columns" :rows="rows" />
    </div>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import { listArticle } from "@/api/notice";
export default {
  components: {
    VueGoodTable,
  },
  name: "my-component",
  data() {
    return {
      columns: [
        {
          label: "글번호",
          field: "articleno",
          type: "number",
        },
        {
          label: "제목",
          field: "subject",
        },
        {
          label: "작성자",
          field: "userid",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM do yy",
        },
        {
          label: "작성일자",
          field: "regtime",
          type: "date",
          dateInputFormat: "yyyy-MM-dd",
          dateOutputFormat: "MMM do yy",
        },
        {
          label: "조회수",
          field: "count",
          type: "number",
        },
      ],
      rows: [],
    };
  },
  computed: {},
  created() {
    // let param = {
    //   pg: 1,
    //   spp: 10,
    //   key: null,
    //   word: null,
    // };
    listArticle(
      // param,
      (response) => {
        this.rows = response.data;
        console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    // http.get(`/qna`).then(({ data }) => {
    //   this.articles = data;
    // });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "NoticeWrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "NoticeView",
        params: { articleno: article.articleno },
      });
    },
  },
};
</script>

<style></style>
