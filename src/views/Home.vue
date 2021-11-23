<template>
  <div class="{'blur-content': showModal}">
    <div class="home-card-container">
      <div outlined class="home-card">
        <div class="content-container">
          <div class="col col1">
            <div class="logo">
              HappyHouse
            </div>
            <PritiNavbar />

            <div id="title" @click="goHome"><h1>HappyHouse</h1></div>
            <p>
              your student accommodation near top universities across the globe
            </p>
            <div class="btn">
              <b-col lg="4" class="pb-6"
                ><b-button size="lg" variant="warning" @click="goMap"
                  >Start~!</b-button
                ></b-col
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="add-property" id="features">
      <h1>Agents, Landlords or Property Managers</h1>
      <p>
        Post your listing and market to thousands of students on AmberStudent.
      </p>
      <v-btn color="secondary" large outlined>List propeerty</v-btn>
    </div>
    <Footer />
  </div>
</template>

<script>
import PritiNavbar from "../components/PritiNavbar.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      items: [],
      address: [],
    };
  },
  methods: {
    redirectSearch() {
      console.log(this.address);
      this.$router.push({
        name: "SearchPage",
        params: { address: this.address },
      });
      // this.$router.push(`/search?${this.address}`)
    },
    goHome() {
      this.$router.push({
        name: "Home",
      });
    },
    goMap() {
      this.$router.push({
        name: "Map",
      });
    },
  },
  name: "Home",

  components: {
    PritiNavbar,
    Footer,
  },
};
</script>
<style scoped>
.btn {
  margin-top: 50px;
}
.logo {
  text-shadow: #000000;
  font-size: 48px;
  font-weight: bold;
  transform: translateY(-50%);
  padding: 20px 20px;
  height: max-content;
  position: absolute;
  left: 40px;
  top: 30px;
}

.home-card {
  height: 96vh;
  background-color: #fafafa;
}

.content-container {
  display: grid;
  height: 100%;
  grid-template-rows: 80% 20%;
  background-image: url("../assets/home.jpg");
  background-size: 100% 100%;
}

.col1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-size: cover;
  color: white;
}

.search-bar {
  display: grid;
  grid-template-columns: 80% 20%;
  width: 40%;
  align-items: center;
  padding: 8px;
}

.col2 {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}

.col2-divs {
  padding: 10px;
}

.col2-reviews {
  display: grid;
  place-items: center;
}

.booking {
  display: grid;
  grid-template-columns: auto auto auto auto;
}

.column {
  margin: 10px;
  display: grid;
  place-items: center;
  text-align: center;
}

.feature-image {
  height: 200px;
}

.feature-container {
  width: 100%;
  min-width: 100%;
  padding: 20px 80px;
}

.add-property {
  text-align: center;
  padding: 80px;
  background-color: #fafafa;
}
</style>
