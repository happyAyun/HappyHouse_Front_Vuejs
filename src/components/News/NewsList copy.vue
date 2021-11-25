<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show variant="danger"
            ><h1>어제와 오늘의 기사 이슈</h1></b-alert
          >
        </b-col>
      </b-row>

      <vue-good-table
        :columns="columns"
        :rows="rows"
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
    </b-container>
  </div>
</template>

<script>
import { crawling } from "@/api/news";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "NewsList",
  components: {
    VueGoodTable,
  },

  data() {
    return {
      itemList: [],
      columns: [
        {
          label: "no",
          field: "no",
          type: "number",
        },
        {
          label: "기사제목",
          field: "title",
        },
      ],
      rows: [],
    };
  },
  computed: {},
  created() {
    crawling(
      (response) => {
        // console.log(response);
        // console.log(response.data.items.length);
        this.itemList = response.data.items;
        let leng = response.data.items.length;
        let list = [];
        for (let i = 0; i < leng; i++) {
          // console.log(itemList[i]);
          // let url = this.itemList[i].link;
          // console.log(url);
          let item = {
            "어제와 오늘의 기사 제목": this.itemList[i].title,
          };
          console.log(item);
          console.log(typeof item);
          list.push(item);
        }
        console.log(list);
        this.rows = list;
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );
  },
  methods: {
    viewArticle(row) {
      window.location.replace(this.itemList[row.no].link);
    },
  },
};
</script>

<style></style>
