<template>
  <div class="navbar ">
    <vs-card>
      <template #text>
        <div style="display:flex; margin:-15px;">
          <vs-button shadow color="#000" href="/">Home</vs-button>
          <vs-button shadow color="black" href="#features" @click="toMap"
            >Map</vs-button
          >
          <vs-button shadow color="black" href="#features" @click="toNotice"
            >Notice</vs-button
          >
          <vs-button shadow color="black" href="#features" @click="toQna"
            >Q&A</vs-button
          >
          <!-- <vs-button shadow color="black">How it works</vs-button> -->
          <vs-button shadow color="black" @click="toPage">Mypage</vs-button>

          <!-- <vs-button shadow color="black"> -->

          <v-dialog v-model="dialog" width="800" class="login-dialog">
            <template v-slot:activator="{ on, attrs }">
              <vs-button
                color="#fff"
                dark
                v-bind="attrs"
                v-on="on"
                v-if="isLogin === false"
              >
                <span class="color-000"> Login/SignUp</span>
              </vs-button>
              <vs-button
                color="#fff"
                dark
                v-if="isLogin === true"
                @click="logoutUser"
              >
                <span class="color-000"> Logout</span>
              </vs-button>
            </template>

            <div class="flex">
              <div class="body-main item">
                <div>
                  <h3 class="login-text">Sign Up</h3>
                  <v-btn
                    block
                    large
                    color="green"
                    class="login-btn"
                    @click="movePage"
                  >
                    <span class="color-fff" color="#">join</span>
                  </v-btn>
                  <center><p>OR</p></center>
                  <div>
                    <img
                      src="@/assets/img/kakao_login.png"
                      alt="카카오 로그인"
                      @click="kakaoLogin"
                    />
                  </div>
                </div>
              </div>
              <div class="body-main item">
                <div>
                  <h3 class="login-text">Login</h3>
                  <v-text-field
                    label="ID"
                    id="userid"
                    v-model="user.userid"
                    required
                    placeholder="아이디 입력...."
                    @keyup.enter="confirm"
                    outlined
                  >
                  </v-text-field>
                  <v-text-field
                    label="Password"
                    type="password"
                    id="userpwd"
                    v-model="user.userpwd"
                    required
                    placeholder="비밀번호 입력...."
                    @keyup.enter="confirm"
                    outlined
                  >
                  </v-text-field>
                  <v-btn
                    block
                    large
                    color="green"
                    class="login-btn"
                    @click="confirm"
                  >
                    <span class="color-fff">Login</span>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-dialog>

          <!-- </vs-button>           -->
        </div>
      </template>
    </vs-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      user: {
        userid: null,
        userpwd: null,
      },
      dialog: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, [
      "userConfirm",
      "getUserInfo",
      "logout",
      //"kakaoOauth",
    ]),
    toMap() {
      this.$router.push({ name: "Map" });
    },
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.userid = "";
        this.userpwd = "";
        alert("로그인 성공!");
        location.reload();
        //this.$router.push({ name: "Home" });
      } else {
        alert("로그인 실패");
      }
    },
    kakaoLogin() {
      window.location.replace(
        "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=ad49192b4c4d8d6e220c38d63d62206b&redirect_uri=http://localhost:8080/kakao/auth"
      );
      // location.reload();
      // await this.kakaoOauth();
      // let token = sessionStorage.getItem("access-token");
      // if (this.isLogin) {
      //   await this.getUserInfo(token);
      //   this.userid = "";
      //   this.userpwd = "";
      //   alert("로그인 성공!");
      //   location.reload();
      // } else {
      //   alert("로그인 실패");
      // }
    },
    movePage() {
      this.$router.push({ name: "MemberJoin" });
    },
    toPage: function() {
      this.$router.push({ name: "MyPage" });
    },
    toQna: function() {
      this.$router.push({ name: "Qna" });
    },
    toNotice: function() {
      this.$router.push({ name: "Notice" });
    },
    async logoutUser() {
      await this.logout();
      location.reload();
      //this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 20px 20px;
  transform: translateY(-50%);
  height: max-content;
  position: fixed;
  right: 40px;
  top: 50px;
}

.flex {
  display: flex;
  flex-direction: row;
  /* margin: 150px 200px; */
  border-radius: 10px;
  flex: 50%;
}
.body-main {
  background-color: hsl(0, 0%, 100%);
  width: 50%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  flex: 50%;
  padding: 40px;
}
.body-image {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: hsl(0, 0%, 100%);
  flex: 50%;
  width: 50%;
}
img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  flex: 50%;
}
.login-dialog {
  filter: blur(10px);
}

.login-text {
  margin: 25px 0px;
}
.login-btn {
  margin-bottom: 20px;
}
.color-fff {
  color: #fff;
}
.tnc {
  font-size: 10px;
}
.color-000 {
  color: #000;
}
</style>
