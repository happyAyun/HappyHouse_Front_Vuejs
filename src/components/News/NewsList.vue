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
      <div>
        <b-table striped hover :items="items"></b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
import { crawling } from "@/api/news";
export default {
  name: "NewsList",

  data() {
    return {
      items: [],
    };
  },
  computed: {},
  created() {
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
            "어제와 오늘의 기사 이슈": titles[i],
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
    viewArticle(row) {
      window.location.replace(row.row.url);
    },
  },
};
</script>

<style></style>
