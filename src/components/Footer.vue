<template>
  <div class="footer">
    <div class="foot-col">
      <h1>해피하우스</h1>
      <p class="font-weight-100">
        당신에게 알맞은 집을 바로 찾아드립니다.
      </p>
    </div>
    <div class="foot-col">
      <!-- <h3>Links</h3>
      <ul class="no-dot l-padding-0 font-weight-200">
        <li>
          Home
        </li>
        <li>
          About
        </li>
        <li>
          List property
        </li>
        <li>
          Help
        </li>
        <li>
          Contact
        </li>
      </ul> -->
    </div>
    <div class="foot-col social-medialinks">
      <!-- <ul class="no-dot l-padding-0 font-weight-200">
        <li>
          <button @click="geocode">
            Test
          </button>
        </li>
        <li><v-icon color="pink">mdi-instagram</v-icon> Instagram</li>
        <li><v-icon color="purple">mdi-facebook</v-icon> Facebook</li>
        <li><v-icon color="blue">mdi-linkedin</v-icon> LinkedIN</li>
        <li><v-icon color="light-blue">mdi-twitter</v-icon> Twitter</li>
        <li><v-icon color="red">mdi-youtube</v-icon> Youtube</li>
        <li>
          Terms
        </li>
        <li>
          Privacy
        </li>
        <li>
          Sitemap
        </li>
      </ul> -->
    </div>
    <div class="foot-col contact-form">
      <h3>관리자 정보</h3>
      <a class="a-button" href="#">0110</a>
      <br />
      <a class="a-button" href="#">1254</a>
      <br />
      <a class="a-button" href="#">abhishek@gmail.com</a>
      <br />
      <p class="font-weight-100">
        홈페이지에 의견이 있으시다면 언제든지 연락주세요.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    geocode() {
      console.log("keelu ");
    },
  },
};
</script>

<style>
.footer {
  padding: 4em 30px 5em;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  /* place-items: center; */
  background-color: #000000;
  width: 100%;
  height: max-content;
  color: #fafafa;
}

.no-dot {
  list-style-type: none;
}
.l-padding-0 {
  padding-left: 0px;
  box-sizing: border-box;
}
.font-weight-100 {
  font-weight: 100;
}
.font-weight-200 {
  font-weight: 200;
}
.text-color-grey {
  font-weight: bold;
  color: rgb(84, 82, 82);
}
.a-button {
  background: #222;
  border-radius: 3px;
  display: inline-block;
  font-size: 0.8em;
  font-weight: 500;
  margin: 0 0 8px;
  min-width: 230px;
  padding: 7px 10px;
  text-decoration: none;
  box-sizing: border-box;
}
.foot-col {
  padding: 12px;
}
</style>
