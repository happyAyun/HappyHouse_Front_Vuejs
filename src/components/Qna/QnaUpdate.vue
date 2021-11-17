<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show><h3>글목록</h3></b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-right">
          <b-button variant="outline-primary" @click="moveWrite()"
            >글쓰기</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            striped
            hover
            :items="articles"
            :fields="fields"
            @row-clicked="viewArticle"
          >
            <template #cell(subject)="data">
              <router-link
                :to="{ name: 'QnaView', params: { no: data.item.articleno } }"
                >{{ data.item.subject }}</router-link
              >
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import http from "@/util/http-common";
// import BoardListRow from "@/components/board/BoardListRow";

export default {
  name: "QnaList",
  components: {
    // BoardListRow,
  },
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleno", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "writer", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    http.get(`/qna`).then(({ data }) => {
      this.articles = data;
    });
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    viewArticle(article) {
      this.$router.push({ name: "QnaView", params: { no: article.no } });
    },
  },
};
</script>

<style></style>
