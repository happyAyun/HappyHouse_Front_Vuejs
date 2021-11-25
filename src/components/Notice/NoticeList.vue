<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show variant="success"><h1>공지사항</h1></b-alert>
        </b-col>
      </b-row>

      <vue-good-table
        :columns="columns"
        :rows="rows"
        styleClass="vgt-table striped"
        @on-row-click="viewArticle"
        :search-options="{
          enabled: true,
          placeholder: '검색어를 입력하세요',
        }"
        :pagination-options="{
          enabled: true,
          mode: 'pages',
          perPage: 5,
        }"
      />
      <div class="under">
        <b-row class="mb-1">
          <b-col class="text-right">
            <b-button pill variant="outline-success" @click="moveWrite()"
              >글쓰기</b-button
            >
          </b-col>
        </b-row>
      </div>
    </b-container>
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
        },
        {
          label: "작성일자",
          field: "regtime",
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
    listArticle(
      (response) => {
        this.rows = response.data;
        console.log(response.data);
        console.log(this.rows);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "NoticeWrite" });
    },
    viewArticle(row) {
      console.log(row);
      this.$router.push({
        name: "NoticeView",
        params: { articleno: row.row.articleno },
      });
    },
  },
};
</script>

<style>
.under {
  margin-top: 30px;
}
</style>
