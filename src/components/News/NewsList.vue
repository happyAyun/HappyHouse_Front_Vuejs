<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show variant="warning"><h1>News</h1></b-alert>
        </b-col>
      </b-row>
      <div>
        <b-table striped hover :items="items"></b-table>
      </div>
      <!-- <vue-good-table
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
      /> -->
    </b-container>
  </div>
</template>

<script>
import { crawling } from "@/api/news";
//import { mapState, mapActions } from "vuex";
// import "vue-good-table/dist/vue-good-table.css";
// import { VueGoodTable } from "vue-good-table";

//const newsStore = "newsStore";

export default {
  name: "NewsList",
  // components: {
  //   VueGoodTable,
  // },
  data() {
    return {
      items: [],
      fields: ["title"],
      // columns: [
      //   {
      //     label: "제목",
      //     field: "title",
      //   },
      // ],
      // rows: [],
    };
  },
  computed: {
    //...mapState(newsStore, ["news"]),
  },
  created() {
    // this.start();
    crawling(
      (response) => {
        console.log(response.data.titles);
        // this.items = response.data.titles;
        let titles = response.data.titles;
        console.log(response.data.titles.length);
        let leng = response.data.titles.length;
        let list = [];
        for (let i = 0; i < leng; i++) {
          console.log(titles[i]);
          // let item = "{ title: " + titles[i] + "}";
          // console.log(item);
          // list.push(item);
          let item = {
            title: titles[i],
          };
          console.log(typeof item);
          list.push(item);
        }
        console.log(list);
        this.items = list;
        // this.rows = response.data.titles;
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );
  },
  methods: {
    // ...mapActions(newsStore, ["startCraw"]),
    // start() {
    //   this.startCraw(
    //     console.log("시작"),
    //     (response) => {
    //       console.log(response);
    //       this.rows = response.data;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    viewArticle(row) {
      window.location.replace(row.row.url);
    },
  },
};
</script>

<style></style>
