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

            <h1>HappyHouse</h1>
            <p>
              your student accommodation near top universities across the globe
            </p>
            <!-- <div class="search-bar">
              <v-text-field
                solo
                hide-details="auto"
                v-model="address"
                clearable
              ></v-text-field>
              <v-btn dark x-large color="red" @click="redirectSearch"
                ><v-icon>mdi-magnify</v-icon>search</v-btn
              >
            </div> -->
          </div>
          <div class="col col2">
            <div class="col2-divs col2-beds ">
              <v-icon x-large color="red">mdi-bed-queen</v-icon>
              <h5>1M+ Beds</h5>
              <p>Book your perfect place from our vast selection of listings</p>
            </div>
            <div class="col2-divs col2-universities">
              <v-icon x-large color="red">mdi-school</v-icon>
              <h5>800+ Universities</h5>
              <p>Find the best student homes near major universities</p>
            </div>
            <div class="col2-divs col2-cities">
              <v-icon x-large color="red">mdi-city</v-icon>
              <h5>250+ Cities</h5>
              <p>We have a strong presence in top cities all over the world</p>
            </div>
            <div class="col2-divs col2-reviews">
              <h3>
                Trustpilot
                <v-icon color="green">mdi-star-circle</v-icon>
                <v-icon color="green">mdi-star-circle</v-icon>
                <v-icon color="green">mdi-star-circle</v-icon>
                <v-icon color="green">mdi-star-circle</v-icon>
                <v-icon color="green">mdi-star-circle</v-icon>
              </h3>
              <p>
                Rated as "Excellent" • Rating 4.8/5 <br />
                • Based 800+ Reviews by students
              </p>
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
  },
  name: "Home",

  components: {
    PritiNavbar,
    Footer,
  },
};
</script>
<style scoped>
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

.home-card-container {
  background-color: white;

  padding: 0px 40px;
  height: 100%;
  width: 100%;
}

.home-card {
  height: 96vh;
  background-color: #fafafa;
}

.content-container {
  display: grid;
  height: 100%;
  grid-template-rows: 80% 20%;
}

.col1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/home.jpg");
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
