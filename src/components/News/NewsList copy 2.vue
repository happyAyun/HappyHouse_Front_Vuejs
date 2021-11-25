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
        // console.log(response);
        // console.log(response.data.items.length);
        let itemList = response.data.items;
        let leng = response.data.items.length;
        let list = [];
        for (let i = 0; i < leng; i++) {
          // console.log(itemList[i]);
          let url = itemList[i].link;
          // console.log(url);
          let item = {
            "어제와 오늘의 기사 제목": `<a href="${url}">itemList[i].title</a>`,
          };
          console.log(item);
          console.log(typeof item);
          list.push(item);
        }
        console.log(list);
        this.items = list;
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
