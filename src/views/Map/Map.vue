<template>
  <div>
    <div class="logo">
      HappyHouse
    </div>
    <PritiNavbar />
    <!-- <img
      src="https://user-images.githubusercontent.com/63468607/143296874-52cd9c53-441c-4d4b-b3d6-517f10e796e8.png"
      alt=""
    /> -->
    <div id="all" class="top">
      <!-- <div class="btn-group">
        <button type="button" class="btn btn-primary" id="inspectorSearch">
          선별 진료소
        </button>
        <button type="button" class="btn btn-primary" id="bikeSearch">
          따릉이 보관소
        </button>
        <button type="button" class="btn btn-primary" id="shopSearch">
          카페
        </button>
      </div> -->
      <b-row class="mt-4 mb-4 text-center">
        <b-col class="sm-3">
          <b-form-select
            v-model="sidoCode"
            :options="sidos"
            @change="gugunList"
          ></b-form-select>
        </b-col>
        <b-col class="sm-3">
          <b-form-select
            v-model="gugunCode"
            :options="guguns"
            @change="dongList"
          ></b-form-select>
        </b-col>
        <b-col class="sm-3">
          <b-form-select
            v-model="dongCode"
            :options="dongs"
            @change="searchApt"
          ></b-form-select>
        </b-col>
      </b-row>
      <div id="result"></div>
      <div class="map_wrap">
        <div id="imagebox_wrap">
          <!-- <img
            src="https://user-images.githubusercontent.com/63468607/143327829-7371b76c-3c7f-4cc2-918c-dd2548eabfbb.png"
            alt=""
            id="imgBus"
            @click="this.busToggle"
          /> -->
          <img
            src="https://user-images.githubusercontent.com/63468607/143382324-0120b078-eceb-40b2-8273-220e74240d79.png"
            alt=""
            id="imgBike"
            @click="this.bikeToggle"
          />
          <img
            src="https://user-images.githubusercontent.com/63468607/143381909-726252d8-4b25-48e5-aaeb-6f548a3be397.png"
            alt=""
            id="imgCafe"
            @click="this.cafeToggle"
          />
          <img
            src="https://user-images.githubusercontent.com/63468607/143374108-de810eac-4235-4252-b2a9-b5e000c1dc25.png"
            alt=""
            id="imgBurger"
            @click="this.burgerToggle"
          />
        </div>
        <div
          id="map"
          style="width:98%;height:900px; position: relative; overflow:hidden; margin-left:15px;"
        ></div>
        <div id="image-toggle">
          <img src="" alt="" />
        </div>
        <div id="selectedApt_wrap" class="bg_white" style="display:none">
          <div id="img_section"></div>
          <button class="accordion " @click="this.togleApt">
            <p id="aptDetail_title"></p>
            <ul id="aptDetail" style="display:none"></ul>
          </button>
          <button class="accordion">
            <div>거래기록</div>
            <div id="deallist-table">
              <v2-table :data="pastList" height="300" :lazy-load="true">
                <v2-table-column
                  label="거래금액(만원)"
                  prop="recentPrice"
                  width="100"
                ></v2-table-column>
                <v2-table-column
                  label="년"
                  prop="dealYear"
                  width="30"
                ></v2-table-column>
                <v2-table-column
                  label="월"
                  prop="dealMonth"
                  width="30"
                ></v2-table-column>
                <v2-table-column
                  label="일"
                  prop="dealDay"
                  width="30"
                ></v2-table-column>
                <v2-table-column
                  label="층"
                  prop="floor"
                  width="30"
                ></v2-table-column>
                <v2-table-column
                  label="면적(m²)"
                  prop="area"
                  width="50"
                ></v2-table-column>
              </v2-table>
            </div>
          </button>
          <div style="text-align:center">교통 분석</div>
          <transport-chart
            :subLen="subLen"
            :busLen="busLen"
            :bikeLen="bikeLen"
          ></transport-chart>
          <b-tabs fill style="text-align:center" class="arcodion-info">
            <b-tab title="지하철" active>
              <v2-table :data="subways" height="150" :lazy-load="true">
                <v2-table-column
                  label="노선"
                  prop="train"
                  width="150"
                ></v2-table-column>
                <v2-table-column
                  label="역 명"
                  prop="station"
                  width="150"
                ></v2-table-column>
              </v2-table>
            </b-tab>
            <b-tab title="버스">
              <v2-table :data="buses" height="150" :lazy-load="true">
                <v2-table-column
                  label="정류소번호"
                  prop="ars"
                  width="90"
                ></v2-table-column>
                <v2-table-column
                  label="역 명"
                  prop="station"
                  width="180"
                ></v2-table-column>
              </v2-table>
            </b-tab>
            <b-tab title="따릉이">
              <v2-table :data="bikes" height="150" :lazy-load="true">
                <v2-table-column
                  label="위치"
                  prop="place"
                  width="150"
                ></v2-table-column>
                <v2-table-column
                  label="타입"
                  prop="btype"
                  width="150"
                ></v2-table-column>
              </v2-table>
            </b-tab>
          </b-tabs>
          <b-tabs fill style="text-align:center" class="arcodion-info">
            <b-tab title="초등학교" active id="elementarySchool">
              <v2-table :data="elementarySchool" height="300" :lazy-load="true">
                <v2-table-column
                  label="이름"
                  prop="school"
                  width="150"
                ></v2-table-column>
                <v2-table-column
                  label="거리(m)"
                  prop="distance"
                  width="150"
                ></v2-table-column>
              </v2-table>
            </b-tab>
            <b-tab title="중학교" id="middleSchool"
              ><v2-table :data="middleSchool" height="300" :lazy-load="true">
                <v2-table-column
                  label="이름"
                  prop="school"
                  width="150"
                ></v2-table-column>
                <v2-table-column
                  label="거리(m)"
                  prop="distance"
                  width="150"
                ></v2-table-column> </v2-table
            ></b-tab>
            <b-tab title="고등학교" id="highSchool"
              ><v2-table :data="highSchool" height="300" :lazy-load="true">
                <v2-table-column
                  label="이름"
                  prop="school"
                  width="150"
                ></v2-table-column>
                <v2-table-column
                  label="거리(m)"
                  prop="distance"
                  width="150"
                ></v2-table-column> </v2-table
            ></b-tab>
            <b-tab title="특수학교" id="otherSchool"
              ><v2-table :data="otherSchool" height="300" :lazy-load="true">
                <v2-table-column
                  label="이름"
                  prop="school"
                  width="150"
                ></v2-table-column>
                <v2-table-column
                  label="거리(m)"
                  prop="distance"
                  width="150"
                ></v2-table-column> </v2-table
            ></b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PritiNavbar from "@/components/PritiNavbar.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import TransportChart from "@/components/Map/TransportChart.vue";

const houseStore = "houseStore";
export default {
  name: "Map",
  components: {
    PritiNavbar,
    TransportChart,
  },

  data() {
    return {
      map: null,
      marker: null,
      markers: [],
      infowindow: null,
      infowindows: [],
      cafeMarkers: [],
      bikeMarkers: [],
      busMarkers: [],
      burgerMarkers: [],

      subwayMarkers: [],
      elementarySchool: [],
      middleSchool: [],
      highSchool: [],
      otherSchool: [],
      dealList: [],
      subwayInfowindow: null,
      inspectorFlag: false,
      cafeFlag: false,
      bikeFlag: false,
      pastFlag: false,
      aptFlag: false,
      sHouse: null,
      geocoder: null,
      cy: null,
      cx: null,
      overlay: null,
      overlays: [],
      transScore: 0,
      subLen: 0,
      busLen: 0,
      bikeLen: 0,
      boundFlag: false,
      subwayLevelFlag: false,
      limit: 5,

      busImgToggle: false,
      bikeImgToggle: false,
      burgerImgToggle: false,
      cafeImgToggle: false,

      chartData: {
        labels: ["지하철", "버스", "따릉이"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [this.subLen, this.busLen, this.bikeLen],
          },
        ],
      },

      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, [
      "sidos",
      "guguns",
      "dongs",
      "houses",
      "pastList",
      "subways",
      "buses",
      "bikes",
      "cafes",
      "burgers",
      "dSubways",
      "schools",
    ]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.getSido();
  },
  mounted() {
    window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
  },
  watch: {
    houses: function() {
      this.makeAptMarker();
    },
    subways: function() {
      this.displaySubway();
    },
    buses: function() {
      this.displayBus();
    },
    bikes: function() {
      this.displayBike();
    },
    cafes: function() {
      this.makeCafeMarkers();
    },
    burgers: function() {
      this.makeBurgerMarkers();
    },
    dongCode: function() {
      this.boundFlag = true;
    },
    dSubways: function() {
      this.displayTotalSubway();
    },
    subLen: function() {
      console.log("subLen 바뀜!!");
    },
    schools: function() {
      this.divideSchool();
    },
    bikeFlag: function() {
      this.togleBike();
    },
    busImgToggle: function() {
      if (this.busImgToggle) {
        this.getBusList();
      } else {
        for (let i = 0; i < this.busMarkers.length; i++) {
          this.busMarkers[i].setMap(null);
        }
        this.busMarkers = [];
      }
    },
    bikeImgToggle: function() {
      if (this.bikeImgToggle) {
        this.getBikeList();
      } else {
        for (let i = 0; i < this.bikeMarkers.length; i++) {
          this.bikeMarkers[i].setMap(null);
        }
        this.bikeMarkers = [];
      }
    },
    burgerImgToggle: function() {
      if (this.burgerImgToggle) {
        this.getBurger();
      } else {
        for (let i = 0; i < this.burgerMarkers.length; i++) {
          this.burgerMarkers[i].setMap(null);
        }
        this.burgerMarkers = [];
      }
    },
    cafeImgToggle: function() {
      if (this.cafeImgToggle) {
        this.getCafe();
      } else {
        for (let i = 0; i < this.cafeMarkers.length; i++) {
          this.cafeMarkers[i].setMap(null);
        }
        this.cafeMarkers = [];
      }
    },
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
      "getPastList",
      "getSubwayList",
      "getBusList",
      "getBikeList",
      "getRadius",
      "getDefaultSubway",
      "getSchool",
      "getCafe",
      "getBurger",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),

    /*
    gugunList : 시,도 선택 시 axios 로 구군 리스트 받아옴
    */
    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    /*
    dongList : 구,군 선택 시 axios 로 동 리스트 받아옴
    */
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    /*
    searchApt : 동 선택 시 해당 동에 해당되는 아파트 목록 axios 로 가져옴
    */
    searchApt() {
      if (this.dongCode) {
        this.getHouseList(this.dongCode);
      }
    },

    /*
    initMap : 카카오 맵  사용을 위해 mounted 시 호출하여 카카오맵 생성
    */

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012743, 127.039585),
        level: 6,
      };
      this.map = new kakao.maps.Map(container, options); //맵 만들기
      kakao.maps.event.addListener(this.map, "dragend", () => {
        //드래그시 발생시킬 이벤트 등록
        // 지도 중심좌표를 얻어옵니다
        let pos = this.map.getCenter();
        let latlng = {
          lat: pos.getLat(),
          lng: pos.getLng(),
        };
        this.getRadius(latlng); //드래그가 끝나면 중심좌표를 기준으로 아파트를 얻어옵니다.
        if (this.bikeImgToggle) this.getBikeList(latlng);
        if (this.busImgToggle) this.getBusList(latlng);
        if (this.burgerImgToggle) this.getBurger(latlng);
        if (this.cafeImgToggle) this.getCafe(latlng);
      });
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        //맵의 줌을 확대,축소 시 발생시킬 이벤트 등록
        let level = this.map.getLevel();
        if (level >= 9 && this.subwayLevelFlag == false) {
          for (let i = 0; i < this.subwayMarkers.length; i++) {
            this.subwayMarkers[i].setMap(null);
          }
          this.subwayLevelFlag = true;
        } else if (level < 9 && this.subwayLevelFlag == true) {
          for (let i = 0; i < this.subwayMarkers.length; i++) {
            this.subwayMarkers[i].setMap(this.map);
          }
          this.subwayLevelFlag = false;
        }
      });
      this.geocoder = new kakao.maps.services.Geocoder(); //geocoder 설정
      this.getDefaultSubway(); //맵 전체에 지하철 정보를 얻어옵니다.
    },

    /*
    addScript : 카카오맵 Script 추가를 위한 메소드
    */

    addScript() {
      const script = document.createElement("script");
      const APPKEY = process.env.VUE_APP_KAKAO_API_KEY;
      /* global kakao */

      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?libraries=services&autoload=false&appkey=" +
        APPKEY;
      document.head.appendChild(script);
    },
    /*
    makeAptMarker : 기존에 사용했던 마커와 인포윈도우 삭제 후
    searchApt 에서 받아온 아파트 갯수만큼 마커와 인포윈도우, 목록 리스트 생성 후 이벤트 리스너 부착(마우스 오버,아웃,클릭)
    */
    makeAptMarker() {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
        this.infowindows[i].setMap(null);
      }
      this.markers = [];
      this.infowindows = [];
      //기존 마커와 인포윈도우 삭제

      let fragment = document.createDocumentFragment();
      let bounds = new kakao.maps.LatLngBounds();
      let house = this.houses;
      let path =
        "https://user-images.githubusercontent.com/63468607/143381202-5a6d054c-211d-4f35-9689-9c7eeda7182b.png";
      for (let index = 0; index < house.length; index++) {
        let tmpLat = house[index].lat;
        let tmpLng = house[index].lng;
        let tmpName = house[index].aptName;
        let tmpPrice = this.priceToString(house[index].recentPrice);
        let coords = new kakao.maps.LatLng(tmpLat, tmpLng);
        bounds.extend(coords);

        let icon = new kakao.maps.MarkerImage(
          path,
          new kakao.maps.Size(30, 30),
          { offset: new kakao.maps.Point(15, 30) }
        );
        this.marker = new kakao.maps.Marker({
          position: coords,
          image: icon,
          clickable: true,
        });

        this.infowindow = new kakao.maps.InfoWindow({
          content:
            '<div class="infoFont" style="width:300px;text-align:center;padding:6px 0;">' +
            tmpName +
            "<br/><span>" +
            tmpPrice +
            "</span></div>",
        });

        let itemEl = this.getListItem(house[index], index);
        fragment.appendChild(itemEl);

        kakao.maps.event.addListener(
          this.marker,
          "mouseover",
          this.makeOverListener(this.map, this.marker, this.infowindow)
        );
        kakao.maps.event.addListener(
          this.marker,
          "mouseout",
          this.makeOutListener(this.infowindow)
        );
        kakao.maps.event.addListener(this.map, "click", () => {
          const len = this.overlays.length;
          for (let i = 0; i < len; i++) this.overlays[i].setMap(null);
          this.overlays = [];
          document.getElementById("selectedApt_wrap").style.display = "none";
        });
        let event = this.makeDetailOverlayAndList(
          house[index],
          this.overlay,
          this.map,
          tmpPrice,
          this.infowindow,
          this
        );

        kakao.maps.event.addListener(this.marker, "click", event);

        itemEl.onmouseover = this.makeOverListener(
          this.map,
          this.marker,
          this.infowindow
        );

        itemEl.onmouseout = this.makeOutListener(this.infowindow);
        itemEl.onclick = this.markers.push(this.marker);
        this.infowindows.push(this.infowindow);
      }
      if (this.boundFlag) {
        this.map.setBounds(bounds);
        this.boundFlag = false;
      }

      this.showMarkers();
    },
    /*
    makePastAptList : 맵 우측에 현재 선택한 아파트의 과거부터의 거래기록 보여주기
    */
    makeAptDetail() {
      let dest = document.getElementById("aptDetail");
      if (dest.hasChildNodes()) this.removeAllChildNods(dest);
      let jibun = document.createElement("li");
      jibun.innerText = this.sHouse.dongName + " " + this.sHouse.jibun;
      let buildYear = document.createElement("li");
      buildYear.innerText = this.sHouse.buildYear + "년 건축";
      let area = document.createElement("li");
      area.innerText = this.sHouse.area + "m² (" + this.sHouse.acreage + "평)";
      dest.append(jibun);
      dest.append(buildYear);
      dest.append(area);
    },

    /*
    showMarkers : 마커 보이기
    */
    showMarkers() {
      this.setMarkers(this.map);
    },
    /*
    removeAllChildNods : 자식 노드들 전부 제거
    */
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
    getPastAptList(aptCode) {
      this.getPastList(aptCode);
    },
    /*
    priceToString : 기존 공공데이터나 DB에서 얻어온 데이터는 10,000 형식으로 넘어오기 때문에
    10,000 을 1억원 / 21,200 을 2억 1200만원 과 같은 형식 으로 변갱해서 리턴
    */
    priceToString(price) {
      let aptPriceNum = price.split(",");
      let numbers = "";
      for (let j in aptPriceNum) {
        numbers += aptPriceNum[j];
      }
      let s = "";
      if (parseInt(numbers / 10000) > 0) {
        s += parseInt(numbers / 10000) + "억 ";
      }
      if (numbers % 10000 == 0) s += "원";
      else s += (numbers % 10000) + "만원";
      return s;
    },
    /*
    makeOverListener : 마우스 오버 시 인포윈도우 열기
    */
    makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    },
    /*
    getListItem : makeAptMarker 에서 아파트 목록을 만들 기 위해 Dom-Element 로 생성 후 리턴
    */
    getListItem(places) {
      let el = document.createElement("li"),
        itemStr = '		<div class="info_list">' + "<h5>" + places.aptName + "</h5>";
      itemStr +=
        "   <span>" + this.priceToString(places.recentPrice) + "</span>";
      itemStr +=
        '   <span class="jibun gray">' +
        places.dongName +
        " " +
        places.jibun +
        "</span>";
      itemStr += "</div>";
      el.innerHTML = itemStr;
      el.className = "item";
      return el;
    },
    getPastListItem(places) {
      let el = document.createElement("td");
      let itemStr = `
      <div class="info_list">
        <h6>거래금액 : ${this.priceToString(places.recentPrice)}</h6>
        <div>거래일 : ${places.dealYear}년 ${places.dealMonth}월 ${
        places.dealDay
      }일</div>
        <div>층 수 : ${places.floor}층</div>
        <div>실주거공간 : ${places.area}m² (${places.acreage}평)</div>
      </div>
      `;
      el.innerHTML = itemStr;
      el.className = "item";
      return el;
    },

    /*
    setMarkers : 마커들을 맵에 출력
    */
    setMarkers(map) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    /*
    makeOutListener : 인포윈도우 마우스 아웃 시 인포윈도우 끄기
    */
    makeOutListener(infowindow) {
      return function() {
        infowindow.close();
      };
    },
    /*
    closeOverlay : 열린 디테일 오버레이들 닫기
    */
    closeOverlay() {
      const len = this.overlays.length;
      for (let i = 0; i < len; i++) this.overlays[i].setMap(null);
      this.overlays = [];
    },

    /*
    makeDetailOverlayAndList : 인포윈도우 클릭 시 기존 인포윈도우 닫고, 상세 정보 오버레이 출력
    */
    makeDetailOverlayAndList(place, overlay, map, price, infowindow, self) {
      kakao.maps.event.addListener(this.marker, "click", function() {
        let imgPath = require("@/assets/img/apart.jpg");
        // let makeDetailDiv = self.makeDetailDiv(place);
        let latlng = {
          lat: place.lat,
          lng: place.lng,
        };
        self.getSubwayList(latlng);
        self.getBusList(latlng);
        self.getBikeList(latlng);
        self.getSchool(latlng);
        if (self.burgerImgToggle) self.getBurger(latlng);
        if (self.cafeImgToggle) self.getCafe(latlng);
        infowindow.close();
        let position = new kakao.maps.LatLng(place.lat, place.lng);
        self.map.panTo(position);
        let content = document.createElement("div");
        content.classList.add("overlay_info");

        let makeDetail = document.createElement("div");
        makeDetail.classList.add("overlay_name");
        let strong = document.createElement("strong");
        strong.innerHTML = place.aptName;
        strong.classList.add("overlay_strong");
        makeDetail.appendChild(strong);

        makeDetail.innerHTML = place.aptName;
        // makeDetail.onclick = function() {
        //   self.makeDetailDiv(place);
        // };
        content.appendChild(makeDetail);
        let div = document.createElement("div");
        div.classList.add("desc");
        let img = document.createElement("img");
        img.src = imgPath;
        let span = document.createElement("span");
        span.classList.add("address");
        span.innerHTML = place.dongName + " " + place.jibun;
        span.appendChild(document.createElement("br"));
        span.append(price);
        span.appendChild(document.createElement("br"));
        span.append(place.area + "m² (" + place.acreage + "평)");
        span.appendChild(document.createElement("br"));
        span.append(place.floor + "층");
        span.appendChild(document.createElement("br"));
        span.append(place.buildYear + "년 건축");
        span.appendChild(document.createElement("br"));
        let img1 = document.createElement("img");
        img1.src = imgPath;
        div.append(img1);
        div.append(span);
        content.appendChild(div);

        overlay = new kakao.maps.CustomOverlay({
          position: position,
          clickable: true,
          content: content,
          xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
          yAnchor: 1.125, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
          zIndex: 100,
        });
        self.overlays.push(overlay);
        overlay.setContent(content);
        overlay.setMap(map);
        self.getPastAptList(place.aptCode);
        document.getElementById("selectedApt_wrap").style.display = "block";
        self.sHouse = place;
        self.makeAptDetail();
        self.sHouse.recentPrice = price;
        let title = document.getElementById("aptDetail_title");
        title.innerText = self.sHouse.aptName;

        let detailImg = document.getElementById("img_section");
        if (detailImg.hasChildNodes()) self.removeAllChildNods(detailImg);
        detailImg.append(img);
      });
    },
    makeDetailDiv(place) {
      let el = document.getElementById("detail");
      let imgEl = document.getElementById("detail-img-section");
      let contentEl = document.createElement("li");
      contentEl.classList.add("detail-content-li");
      contentEl.append(place.aptName);
      contentEl.appendChild(document.createElement("br"));
      contentEl.append(place.dongName + " " + place.jibun);
      contentEl.appendChild(document.createElement("br"));
      contentEl.append(place.buildYear + "년 건축");

      let img = document.createElement("img");
      img.src = require("@/assets/img/apart.jpg");
      imgEl.appendChild(img);
      let latlng = {
        lat: place.lat,
        lng: place.lng,
      };

      this.getSubwayList(latlng);
      this.getBusList(latlng);
      this.getBikeList(latlng);
      let dest = document.getElementById("detail-apt-section");
      dest.appendChild(contentEl);
      el.style.display = "block";
    },
    displaySubway() {
      this.transScore += 15 * this.subways.length;
      this.subLen = this.subways.length;
      this.chartData.datasets[0].data[0] = 15 * this.subLen;
    },
    displayBus() {
      this.transScore += 3 * this.buses.length;
      this.busLen = this.buses.length;
      this.chartData.datasets[0].data[1] = 3 * this.busLen;
    },
    displayBike() {
      for (let i = 0; i < this.bikeMarkers.length; i++)
        this.bikeMarkers[i].setMap(null);
      this.bikeMarkers = [];
      this.transScore += this.bikes.length;
      this.bikeLen = this.bikes.length;
      this.chartData.datasets[0].data[2] = this.bikeLen;
      if (this.bikeImgToggle) {
        for (let bike of this.bikes) {
          let img =
            "https://user-images.githubusercontent.com/63468607/143379825-406d6a8c-6942-4c53-9f74-b74cff41c432.png";
          let icon = new kakao.maps.MarkerImage(
            img,
            new kakao.maps.Size(32, 32),
            { offset: new kakao.maps.Point(16, 32) }
          );
          let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(bike.lat, bike.lng),
            image: icon,
          });
          marker.setMap(this.map);
          //TODO 지하철역 반경 검색 추가해야됨
          //TODO 지하철역 마우스오버 추가해야됨

          this.bikeMarkers.push(marker);
        }
      }
    },
    displayTotalSubway() {
      let index = new Map([
        [
          "1호선",
          "https://user-images.githubusercontent.com/63468607/142995043-c1f43c24-27b8-423d-8b08-1535fcb5fdc3.png",
        ],
        [
          "2호선",
          "https://user-images.githubusercontent.com/63468607/142995256-1bd1f6df-46bc-4aee-96b5-d55fd3c1d0d2.png",
        ],
        [
          "3호선",
          "https://user-images.githubusercontent.com/63468607/142995294-b8506834-aa4f-4c5d-aad1-2cfe31caad84.png",
        ],
        [
          "4호선",
          "https://user-images.githubusercontent.com/63468607/142995338-b5baa327-65fc-4516-bb89-9b2162d8053b.png",
        ],
        [
          "5호선",
          "https://user-images.githubusercontent.com/63468607/142995376-ad4a2b79-4623-4839-aab4-d23b9530476a.png",
        ],
        [
          "6호선",
          "https://user-images.githubusercontent.com/63468607/142995386-b157643b-1bc4-4a75-ab52-e6f5b7a1e9c4.png",
        ],
        [
          "7호선",
          "https://user-images.githubusercontent.com/63468607/142995388-76e5f81b-837e-482e-877c-08075517c12e.png",
        ],
        [
          "8호선",
          "https://user-images.githubusercontent.com/63468607/142995389-d2cca480-75cd-41b4-96a1-9144dfeaf962.png",
        ],
        [
          "9호선",
          "https://user-images.githubusercontent.com/63468607/142995391-6ed7292f-417b-4e34-adfd-2cfffb864cc4.png",
        ],
        [
          "수인분당",
          "https://user-images.githubusercontent.com/63468607/142995404-54a636e7-1eb2-4100-b46c-e7c716841843.png",
        ],
        [
          "신분당선",
          "https://user-images.githubusercontent.com/63468607/142995407-a2317cbd-dd72-47b8-b66d-768c5fa1899e.png",
        ],
        [
          "경의중앙",
          "https://user-images.githubusercontent.com/63468607/142995395-f20f3247-9573-4b9a-8339-0562a260403d.png",
        ],
        [
          "공항철도",
          "https://user-images.githubusercontent.com/63468607/142995403-ec119ee0-dac3-4975-b213-b955e8666609.png",
        ],
        [
          "경춘",
          "https://user-images.githubusercontent.com/63468607/142995399-b7c0f577-6027-4321-ba7f-6619af29d0fc.png",
        ],
        [
          "경강",
          "https://user-images.githubusercontent.com/63468607/142995394-0ee4e9d5-6535-4dee-ab40-4dba87f4cba9.png",
        ],
        [
          "우이신설",
          "https://user-images.githubusercontent.com/63468607/142995408-9e036abe-73ed-499f-b718-f76a4af7441d.png",
        ],
      ]);
      for (let i = 0; i < this.dSubways.length; i++) {
        let subway = this.dSubways[i];
        let path = index.get(subway.train);

        let icon = new kakao.maps.MarkerImage(
          path,
          new kakao.maps.Size(20, 20),
          { offset: new kakao.maps.Point(10, 20) }
        );
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(subway.lat, subway.lng),
          image: icon,
        });
        marker.setMap(this.map);
        //TODO 지하철역 반경 검색 추가해야됨
        //TODO 지하철역 마우스오버 추가해야됨

        this.subwayMarkers.push(marker);
      }
    },
    searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },
    searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      this.geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        callback
      );
    },
    toglePast() {
      if (!this.pastFlag) {
        // document.getElementById("sAptList").style.display = "block";
        this.pastFlag = !this.pastFlag;
      } else {
        // document.getElementById("sAptList").style.display = "none";
        this.pastFlag = !this.pastFlag;
      }
    },
    togleApt() {
      if (!this.aptFlag) {
        document.getElementById("aptDetail").style.display = "block";
        this.aptFlag = !this.aptFlag;
      } else {
        document.getElementById("aptDetail").style.display = "none";
        this.aptFlag = !this.aptFlag;
      }
    },
    divideSchool() {
      this.elementarySchool = [];
      this.middleSchool = [];
      this.highSchool = [];
      this.otherSchool = [];
      for (let school of this.schools) {
        // console.log(school);
        if (school.school.includes("초등")) this.elementarySchool.push(school);
        else if (school.school.includes("중학")) this.middleSchool.push(school);
        else if (school.school.includes("고등")) this.highSchool.push(school);
        else this.otherSchool.push(school);
      }
      // console.log(this.elementarySchool);
      // console.log(this.middleSchool);
      // console.log(this.highSchool);
      // console.log(this.otherSchool);
      // this.displaySchool();
    },
    displaySchool() {
      let elementary = document.getElementById("elementarySchool");
      let middle = document.getElementById("middleSchool");
      let high = document.getElementById("highSchool");
      let other = document.getElementById("otherSchool");
      let array = [elementary, middle, high, other];
      for (let arr of array)
        if (arr.hasChildNodes()) this.removeAllChildNods(arr);

      for (let i = 0; i < 5; i++) {
        let ele = document.createElement("div");
        let mid = document.createElement("div");
        let hig = document.createElement("div");
        let oth = document.createElement("div");
        if (i < this.elementarySchool.length)
          ele.innerText = `${this.elementarySchool[i].school} ${this.elementarySchool[i].distance}m`;
        if (i < this.middleSchool.length)
          mid.innerText = `${this.middleSchool[i].school} ${this.middleSchool[i].distance}m`;
        if (i < this.highSchool.length)
          hig.innerText = `${this.highSchool[i].school} ${this.highSchool[i].distance}m`;
        if (i < this.otherSchool.length)
          oth.innerText = `${this.otherSchool[i].school} ${this.otherSchool[i].distance}m`;

        elementary.append(ele);
        middle.append(mid);
        high.append(hig);
        other.append(oth);
      }
    },
    togleBike() {
      if (!this.bikeFlag) {
        this.bikeFlag = !this.bikeFlag;
        for (let i = 0; i < this.bikeMarkers.length; i++) {
          this.bikeMarkers[i].setMap(this.map);
        }
      } else {
        this.bikeFlag = !this.bikeFlag;
        for (let i = 0; i < this.bikeMarkers.length; i++) {
          this.bikeMarkers[i].setMap(null);
        }
      }
    },
    busToggle() {
      if (!this.busImgToggle) {
        this.busImgToggle = true;
        document.getElementById("imgBus").src =
          "https://user-images.githubusercontent.com/63468607/143327854-66e776ab-cc09-4cef-90db-ed5830c899cc.png";
      } else {
        this.busImgToggle = false;
        document.getElementById("imgBus").src =
          "https://user-images.githubusercontent.com/63468607/143327829-7371b76c-3c7f-4cc2-918c-dd2548eabfbb.png";
      }
    },
    bikeToggle() {
      if (!this.bikeImgToggle) {
        this.bikeImgToggle = true;
        document.getElementById("imgBike").src =
          "https://user-images.githubusercontent.com/63468607/143382328-516a8d98-be08-4fcf-a3e2-ae413ef52b25.png";
      } else {
        this.bikeImgToggle = false;
        document.getElementById("imgBike").src =
          "https://user-images.githubusercontent.com/63468607/143382324-0120b078-eceb-40b2-8273-220e74240d79.png";
      }
    },
    cafeToggle() {
      if (!this.cafeImgToggle) {
        this.cafeImgToggle = true;
        document.getElementById("imgCafe").src =
          "https://user-images.githubusercontent.com/63468607/143381913-561d5cf2-809f-4673-9946-d82d5dd650e9.png";
      } else {
        this.cafeImgToggle = false;
        document.getElementById("imgCafe").src =
          "https://user-images.githubusercontent.com/63468607/143381909-726252d8-4b25-48e5-aaeb-6f548a3be397.png";
      }
    },
    burgerToggle() {
      if (!this.burgerImgToggle) {
        this.burgerImgToggle = true;
        document.getElementById("imgBurger").src =
          "https://user-images.githubusercontent.com/63468607/143374110-c6c98185-7df7-4356-98ee-3264b88256c7.png";
      } else {
        this.burgerImgToggle = false;
        document.getElementById("imgBurger").src =
          "https://user-images.githubusercontent.com/63468607/143374108-de810eac-4235-4252-b2a9-b5e000c1dc25.png";
      }
    },
    makeCafeMarkers() {
      if (!this.cafeImgToggle) return;
      let index = new Map([
        [
          "이디야",
          "https://user-images.githubusercontent.com/63468607/143341376-064a44c3-1268-496e-95da-bb142058e13c.png",
        ],
        [
          "커피빈",
          "https://user-images.githubusercontent.com/63468607/143348112-3aeb142b-0d81-4860-80fd-036d8a50cd5a.png",
        ],
        [
          "투썸",
          "https://user-images.githubusercontent.com/63468607/143346446-daf51849-3cd1-481d-8d1f-40638c3d2ea4.png",
        ],
        [
          "할리스",
          "https://user-images.githubusercontent.com/63468607/143349850-3dfde6c0-d6da-466d-86ef-88778c3da2e7.jpg",
        ],
        [
          "스타벅스",
          "https://user-images.githubusercontent.com/63468607/143368100-c534a6f5-a0a7-4984-9410-bf5265e4d67e.png",
        ],
        [
          "빽다방",
          "https://user-images.githubusercontent.com/63468607/143368955-23506eab-ee31-4a87-8a29-9f714b061571.png",
        ],
      ]);
      let name = ["이디야", "커피빈", "투썸", "할리스", "스타벅스", "빽다방"];
      let len = this.cafes.length;
      for (let i = 0; i < len; i++) {
        let cafe = this.cafes[i];
        let shop;
        for (let n of name) {
          if (this.cafes[i].shopName.includes(n)) {
            shop = n;
            break;
          }
        }
        console.log(shop);
        let path = index.get(shop);
        let icon = new kakao.maps.MarkerImage(
          path,
          new kakao.maps.Size(32, 32)
        );
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(cafe.lat, cafe.lng),
          image: icon,
        });
        marker.setMap(this.map);
        this.cafeMarkers.push(marker);
      }
    },
    makeBurgerMarkers() {
      if (!this.burgerImgToggle) return;
      let index = new Map([
        [
          "맥도날드",
          "https://user-images.githubusercontent.com/63468607/143369816-2de4af97-7c54-4fef-8fbb-a2e4209dbd06.png",
        ],
        [
          "롯데리아",
          "https://user-images.githubusercontent.com/63468607/143370636-36bda1be-59ad-4aab-9066-baa620843229.png",
        ],
        [
          "버거킹",
          "https://user-images.githubusercontent.com/63468607/143370170-9654416b-af85-4d20-8436-e2fae6e31cf5.png",
        ],
        [
          "맘스터치",
          "https://user-images.githubusercontent.com/63468607/143370779-0b023d2b-ae5d-4536-acb6-89c4ba48ae91.png",
        ],
      ]);
      let name = ["맥도날드", "롯데리아", "버거킹", "맘스터치"];
      let len = this.burgers.length;
      for (let i = 0; i < len; i++) {
        let burger = this.burgers[i];
        let shop;
        for (let n of name) {
          if (this.burgers[i].shopName.includes(n)) {
            shop = n;
            break;
          }
        }
        console.log(shop);
        let path = index.get(shop);
        let icon = new kakao.maps.MarkerImage(
          path,
          new kakao.maps.Size(32, 32)
        );
        let marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(burger.lat, burger.lng),
          image: icon,
        });
        marker.setMap(this.map);
        this.burgerMarkers.push(marker);
      }
    },
  },
};
</script>

<style>
.overlay_info {
  border-radius: 6px;
  margin-bottom: 12px;
  float: left;
  position: relative;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  background-color: #fff;
}
.overlay_info:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.overlay_info .overlay_name {
  display: block;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
  text-decoration: none;
  color: #fff;
  padding: 12px 36px 12px 14px;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
}
.overlay_info .overlay_name .overlay_strong {
  background: url(https://user-images.githubusercontent.com/63468607/142641433-44592666-50e4-4b91-9cbc-57a3bbbceaa5.png)
    no-repeat;
  padding-left: 27px;
}
.overlay_info .desc {
  padding: 13px;
  position: relative;
  min-width: 230px;
  height: 118px;
}
.overlay_info .content_wrap {
  padding: 12px;
  position: relative;
  min-width: 190px;
  height: 56px;
}
.overlay_info img {
  vertical-align: top;
  width: 72px;
  height: 72px;
}
.overlay_info .address {
  font-size: 12px;
  color: #333;
  position: absolute;
  left: 100px;
  right: 14px;
  top: 12px;
  white-space: normal;
  text-align: center;
}
.overlay_info .content {
  font-size: 12px;
  color: #333;
  position: absolute;
  left: 14px;
  right: 14px;
  top: 0;
  white-space: normal;
}
.overlay_info:after {
  content: "";
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png)
    no-repeat 0 bottom;
}

@font-face {
  font-family: BMDOHYEON;
  src: url("../../assets/fonts/BMDOHYEON_ttf.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

.infoFont {
  font-family: BMDOHYEON;
  font-size: 18px;
}

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 15px;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  /* font-size: 12px; */
  border-radius: 10px;
}
#selectedApt_wrap {
  position: absolute;
  top: 0;
  right: 2%;
  bottom: 0;
  width: 16%;
  /* margin: 10px 0 30px 0px; */
  padding: 5px;
  overflow-y: auto;
  background: rgba(245, 245, 245, 0.89);
  z-index: 1;
  /* font-size: 12px; */
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  /* min-height: 65px; */
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info_list {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info_list {
  padding: 0;
  margin: 5px 0;
}
#placesList .info_list .gray {
  /* font-weight: bold; */
  text-shadow: 0 -1px black;
  color: rgba(117, 117, 117, 0.781);
}
#placesList .info_list .jibun {
  padding-left: 26px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png")
    no-repeat;
}

/* */
#detail {
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 0;
  width: 40%;
  height: 80%;
  transform: translate(-50%, -50%);
  margin: 10px 10px 0px 0px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
  /* font-size: 12px; */
  border-radius: 10px;
}

.border {
  border-block: 1px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888;
  width: 17px;
  height: 17px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
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

#img_section {
  border: rgb(224, 224, 224) solid 1px;
  width: 100%;
  height: 15%;
  border-radius: 5px;
}
#img_section img {
  width: 100%;
  height: 100%;
}

.accordion {
  text-align: center;
  background-color: white;
  left: 10%;
  width: 100%;
  margin: 2% 0;
  /* min-height: 5%; */
  border-radius: 5px;
  border: rgb(224, 224, 224) solid 1px;
}

.accordion table {
  font-size: 7px;
  text-align: center;
}
.table-col {
  min-height: 50px;
  /* overflow: hidden; */
}
#record {
  transition: max-height 0.2s ease-out;
  font-size: 7px;
  text-align: center;
  text-align: center;
  background-color: white;
  left: 10%;
  width: 100%;
  margin: 2% 0;
  /* min-height: 5%; */
  border-radius: 5px;
  border: rgb(224, 224, 224) solid 1px;
}

#aptDetail li {
  list-style: none;
  font-size: 13px;
}

.arcodion-info {
  text-align: center;
  background-color: white;
  left: 10%;
  width: 100%;
  margin: 2% 0;
  /* min-height: 5%; */
  border-radius: 5px;
  border: rgb(224, 224, 224) solid 1px;
}
#imagebox_wrap {
  position: absolute;
  left: 5%;
  top: 5%;
  z-index: 3;
  background: rgba(255, 255, 255, 0.9);
  border: rgb(224, 224, 224) solid 1px;
  border-radius: 5px;
}
#imagebox_wrap img {
  border: black solid 1px;
  border-collapse: collapse;
  width: 48px;
  height: 48px;
}
</style>
