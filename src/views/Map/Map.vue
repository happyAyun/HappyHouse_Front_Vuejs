<template>
  <div>
    <div class="logo">
      HappyHouse
    </div>
    <PritiNavbar />
    <div id="all" class="top">
      <b-row class="mt-4 mb-4 text-center">
        <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
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
      <div id="result"></div>
      <div class="map_wrap">
        <div
          id="map"
          style="width:98%;height:900px; position: relative; overflow:hidden; margin-left:15px;"
        ></div>
        <div id="menu_wrap" class="bg_white" style="display:none;">
          <ul id="placesList"></ul>
        </div>
        <div id="selectedApt_wrap" class="bg_white" style="display:none">
          <div id="img_section"></div>
          <button class="accordion " @click="this.togleApt">
            <p id="aptDetail_title"></p>
            <ul id="aptDetail" style="display:none"></ul>
          </button>
          <button class="accordion">
            <div>거래기록</div>
            <table>
              <colgroup>
                <col width="30%" />
                <col width="29%" />
                <col width="8%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>
                  <th class="table-col">거래금액</th>
                  <th class="table-col">거래일</th>
                  <th class="table-col">층 수</th>
                  <th class="table-col">실주거공간</th>
                </tr>
              </thead>
              <tbody id="sAptList"></tbody>
            </table>
          </button>
          <div style="text-align:center">근처 교통</div>
          <transport-chart
            :subLen="subLen"
            :busLen="busLen"
            :bikeLen="bikeLen"
          ></transport-chart>
          <div id="transportInfo" class="arcodion-info">
            <div id="transport-info-subway"></div>
            <div id="transport-info-bus"></div>
            <div id="transport-info-bike"></div>
          </div>
          <button class="accordion">
            근처 학교
            <ul>
              <li id="elementarySchool">
                초등학교
              </li>
              <li id="middleSchool">
                중학교
              </li>
              <li id="highSchool">
                고등학교
              </li>
              <li id="otherSchool">
                other
              </li>
            </ul>
          </button>
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
      cafeInfowindows: [],
      coronaMarkers: [],
      coronaInfowindows: [],
      bikeMarkers: [],
      bikeInfowindows: [],
      subwayMarkers: [],
      elementarySchool: [],
      middleSchool: [],
      highSchool: [],
      otherSchool: [],
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
      chartData: {
        labels: ["지하철", "버스", "따릉이"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [this.subLen, this.busLen, this.bikeLen],
          },
        ],
      },
      // chartOptions: {
      //   rsponsive: true,
      //   aspectRatio: 1.19,
      //   legend: {
      //     display: false, // 차트 내 범례 디스플레이 비활성화
      //   },
      //   scales: {
      //     xAxes: this.xAxes, // x축 세부 설정, 별도 getter로 분리
      //     yAxes: this.yAxes, // y축 세부 설정, 별도 getter로 분리
      //   },
      //   animation: {
      //     duration: 0, // 트랜지션 효과 비활성화
      //   },
      // },
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
      "dSubways",
      "schools",
    ]),
    centerPos: function() {
      if (this.map == null) return;
      let latlng = this.map.getCenter();
      // let el = document.getElementById("result");
      // el.innerText = [latlng.getLat(), latlng.getLng()];
      return [latlng.getLat(), latlng.getLng()];
    },

    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
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
    pastList: function() {
      this.makePastAptList();
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
        // 지도 중심좌표를 얻어옵니다
        let pos = this.map.getCenter();
        let latlng = {
          lat: pos.getLat(),
          lng: pos.getLng(),
        };
        this.getRadius(latlng);
      });
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
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
      //지하철
      this.geocoder = new kakao.maps.services.Geocoder(); //geocoder 설정
      this.getDefaultSubway();
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
      let listEl = document.getElementById("placesList");
      let fragment = document.createDocumentFragment();
      let bounds = new kakao.maps.LatLngBounds();
      let house = this.houses;
      this.removeAllChildNods(listEl);
      for (let index = 0; index < house.length; index++) {
        let tmpLat = house[index].lat;
        let tmpLng = house[index].lng;
        let tmpName = house[index].aptName;
        let tmpPrice = this.priceToString(house[index].recentPrice);
        // let tmpYear = house[index].buildYear;
        // let floor = house[index].floor;
        let coords = new kakao.maps.LatLng(tmpLat, tmpLng);
        bounds.extend(coords);
        this.marker = new kakao.maps.Marker({
          position: coords,
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
      listEl.appendChild(fragment);
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

    makePastAptList() {
      this.pastFlag = false;
      this.aptFlag = false;
      let pastList = document.createElement("div");
      pastList.classList.add("selected-apt-pastlist");

      let listEl = document.getElementById("sAptList");
      if (listEl.hasChildNodes()) this.removeAllChildNods(listEl);
      let house = this.pastList;
      for (let index = 0; index < house.length; index++) {
        let itemEl = document.createElement("tr");
        let price = document.createElement("td");
        price.classList.add("table-col");
        let area = document.createElement("td");
        area.classList.add("table-col");
        let floor = document.createElement("td");
        floor.classList.add("table-col");
        let day = document.createElement("td");
        day.classList.add("table-col");

        price.innerText = this.priceToString(house[index].recentPrice);
        day.innerText =
          house[index].dealYear +
          "-" +
          house[index].dealMonth +
          "-" +
          house[index].dealDay;

        floor.innerText = house[index].floor;
        area.innerText =
          house[index].area + "m² (" + house[index].acreage + "평)";
        itemEl.append(price, day, floor, area);
        itemEl.append(day);
        itemEl.append(floor);
        itemEl.append(area);
        listEl.append(itemEl);
        console.log(itemEl);
      }
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
        let imgPath = require("@/assets/img/waiting.jpg");
        // let makeDetailDiv = self.makeDetailDiv(place);
        let latlng = {
          lat: place.lat,
          lng: place.lng,
        };
        self.getSubwayList(latlng);
        self.getBusList(latlng);
        self.getBikeList(latlng);
        self.getSchool(latlng);
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
      img.src = require("@/assets/img/waiting.jpg");
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
      let el = document.getElementById("transport-info-subway");
      if (el.hasChildNodes()) this.removeAllChildNods(el);
      for (let subway of this.subways) {
        let data = document.createElement("div");
        data.innerText = `(${subway.train})${subway.station}`;
        el.append(data);
      }
    },
    displayBus() {
      this.transScore += 3 * this.buses.length;
      this.busLen = this.buses.length;
      this.chartData.datasets[0].data[1] = 3 * this.busLen;
      let el = document.getElementById("transport-info-bus");
      if (el.hasChildNodes()) this.removeAllChildNods(el);
      for (let i = 0; i < 10; i++) {
        if (this.busLen <= i) break;
        let data = document.createElement("div");
        data.innerText = `(${this.buses[i].ars})${this.buses[i].station}`;
        el.append(data);
      }
    },
    displayBike() {
      this.transScore += this.bikes.length;
      this.bikeLen = this.bikes.length;
      this.chartData.datasets[0].data[2] = this.bikeLen;
      let el = document.getElementById("transport-info-bike");
      if (el.hasChildNodes()) this.removeAllChildNods(el);
      for (let bike of this.bikes) {
        let data = document.createElement("div");
        data.innerText = `(따릉이)${bike.place}`;
        el.append(data);
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
      this.displaySchool();
    },
    displaySchool() {
      let elementary = document.getElementById("elementarySchool");
      let middle = document.getElementById("middleSchool");
      let high = document.getElementById("highSchool");
      let other = document.getElementById("otherSchool");
      let array = [elementary, middle, high, other];
      for (let arr of array) this.removeAllChildNods(arr);

      for (let i = 0; i < 5; i++) {
        let ele = document.createElement("div");
        let mid = document.createElement("div");
        let hig = document.createElement("div");
        let oth = document.createElement("div");
        ele.innerText = `${this.elementarySchool[i].school} ${this.elementarySchool[i].distance}m`;
        mid.innerText = `${this.middleSchool[i].school} ${this.middleSchool[i].distance}m`;
        hig.innerText = `${this.highSchool[i].school} ${this.highSchool[i].distance}m`;
        oth.innerText = `${this.otherSchool[i].school} ${this.otherSchool[i].distance}m`;

        elementary.append(ele);
        middle.append(mid);
        high.append(hig);
        other.append(oth);
      }
    },
  },
};

document.addEventListener("DOMContentLoaded", function() {});
// document.getElementById("shopSearch").addEventListener("click", function() {
//   if (!this.cafeFlag) {
//     this.cafeFlag = true;
//     for (let i = 0; i < this.cafeMarkers.length; i++) {
//       this.cafeMarkers[i].setMap(this.map);
//     }
//   } else {
//     this.cafeFlag = false;
//     for (let i = 0; i < this.cafeMarkers.length; i++) {
//       this.cafeMarkers[i].setMap(null);
//     }
//   }
//   if (this.cafeMarkers.length > 0) {
// } else {
//   let serviceKey =
//     "yQJmbxPKHfbveoouxPQICmXLoAexdytRO17wxg/wLWpCObZ80VVS/7bBYGPtH+K0tLxa5/23tWERGQOow9IV1Q==";
//   let indsMclsCd = "Q12"; // 우선 카페만
//   let numOfRows = 300;
//   let radius = 1000;
//   let dong = document.getElementById('dong').value;
//   axios.get(
//     "/map/hangjung",
//     { dong: dong },
//     function(data, status) {
//       axios({
//         url:
//           "http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius",
//         method: "GET",
//         data: {
//           serviceKey: serviceKey,
//           numOfRows: numOfRows,
//           radius: radius,
//           cx: cx,
//           cy: cy,
//           indsMclsCd: indsMclsCd,
//         },
//         dataType: "xml",
//         success: function(response) {
//           console.log(response);
//           makeShop(response);
//           // 함수 호출
//         },
//         error: function(xhr, status, msg) {
//           console.log("상태값 : " + status + " Http에러메시지 : " + msg);
//         },
//       });
//     },
//     "json"
//   );
//   }
// });

// document
//   .getElementById("inspectorSearch")
//   .addEventListener("click", function() {
//     if (!inspectorFlag) {
//       inspectorFlag = true;
//       for (var i = 0; i < coronaMarkers.length; i++) {
//         coronaMarkers[i].setMap(map);
//       }
//     } else {
//       inspectorFlag = false;
//       for (var i = 0; i < coronaMarkers.length; i++) {
//         coronaMarkers[i].setMap(null);
//       }
//     }
//   });

// document.getElementById("bikeSearch").addEventListener("click", function() {
//   if (!bikeFlag) {
//     bikeFlag = true;
//     for (var i = 0; i < bikeMarkers.length; i++) {
//       bikeMarkers[i].setMap(map);
//     }
//   } else {
//     bikeFlag = false;
//     for (var i = 0; i < bikeMarkers.length; i++) {
//       bikeMarkers[i].setMap(null);
//     }
//   }
// });
// });

// function makeInspector(jsonData) {
//   let hospitalImgSrc = "/assets/img/hospital.png";
//   let imgSize = new kakao.maps.Size(44, 50);
//   let imgOption = { offset: new kakao.maps.Point(22, 50) };
//   let hospitalImg = new kakao.maps.MarkerImage(
//     hospitalImgSrc,
//     imgSize,
//     imgOption
//   );

//   $.each(jsonData, function(index, vo) {
//     let tmpLat = vo.lat;
//     let tmpLng = vo.lng;
//     let tmpName = vo.gigwanName;
//     let tmpAddress = vo.gigwanAddress;
//     let coords = new kakao.maps.LatLng(tmpLat, tmpLng);
//     var marker = new kakao.maps.Marker({
//       position: coords,
//       image: hospitalImg,
//     });
//     var infowindow = new kakao.maps.InfoWindow({
//       content:
//         '<div class="infoFont" style="width:300px;text-align:center;padding:6px 0;">' +
//         tmpName +
//         "<br/><span>" +
//         tmpAddress +
//         "</span></div>",
//     });
//     kakao.maps.event.addListener(
//       marker,
//       "mouseover",
//       makeOverListener(map, marker, infowindow)
//     );
//     kakao.maps.event.addListener(
//       marker,
//       "mouseout",
//       makeOutListener(infowindow)
//     );

//     coronaMarkers.push(marker);
//     coronaInfowindows.push(infowindow);
//   }); // each
// }

// // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다

// // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
// function removeMarker() {
//   let len = markers.length;
//   if (markers.length < cafeMarkers.length) len = cafeMarkers.length;
//   for (var i = 0; i < len; i++) {
//     if (i < markers.length) {
//       infowindows[i].close();
//       markers[i].setMap(null);
//     }
//     if (i < cafeMarkers.length) {
//       cafeInfowindows[i].close();
//       cafeMarkers[i].setMap(null);
//     }
//   }
//   markers = [];
//   cafeMarkers = [];
//   shopFlag = false;
// }

// function removeInspector() {
//   let len = coronaMarkers.length;
//   for (var i = 0; i < len; i++) {
//     coronaInfowindows[i].close();
//     coronaMarkers[i].setMap(null);
//   }
//   coronaMarkers = [];
//   inspectorFlag = false;
// }

// function removeBike() {
//   let len = bikeMarkers.length;
//   for (var i = 0; i < len; i++) {
//     bikeInfowindows[i].close();
//     bikeMarkers[i].setMap(null);
//   }
//   bikeMarkers = [];
//   bikeFlag;
// }

// function makeBike(jsonData) {
//   let bikeImgSrc = "/assets/img/seoulbike.png";
//   let imgSize = new kakao.maps.Size(44, 50);
//   let imgOption = { offset: new kakao.maps.Point(22, 50) };
//   let bikeImg = new kakao.maps.MarkerImage(bikeImgSrc, imgSize, imgOption);

//   $.each(jsonData, function(index, vo) {
//     let tmpLat = vo.lat;
//     let tmpLng = vo.lng;
//     let tmpName = vo.place;
//     let tmpCount = vo.maxcount;
//     let tmpType = vo.btype;
//     let coords = new kakao.maps.LatLng(tmpLat, tmpLng);
//     var marker = new kakao.maps.Marker({
//       position: coords,
//       image: bikeImg,
//     });
//     var infowindow = new kakao.maps.InfoWindow({
//       content:
//         '<div class="infoFont" style="width:300px;text-align:center;padding:6px 0;">' +
//         tmpName +
//         "<br/><span> 거치대 수 : " +
//         tmpCount +
//         " 타입 : " +
//         tmpType +
//         "</span></div>",
//     });
//     kakao.maps.event.addListener(
//       marker,
//       "mouseover",
//       makeOverListener(map, marker, infowindow)
//     );
//     kakao.maps.event.addListener(
//       marker,
//       "mouseout",
//       makeOutListener(infowindow)
//     );

//     bikeMarkers.push(marker);
//     bikeInfowindows.push(infowindow);
//   }); // each
// }
// function makeDetailElement(data) {
//   let aptData = data.split(",");
//   removeDetail();
//   var str = `
// 	<div class = "apt-detail-child">
// 	<span class = "apt-detail-title">
// 	   아파트 상세 정보
// 	</span>
// 	<button onclick="removeDetail()">x</button>
// 	<ul>
// 	   <li>아파트 이름 : ${aptData[0]}</li>
// 	   <li>건축년도  : ${aptData[1]}</li>
// 	   <li>거래금액 : ${aptData[2]}</li>
// 		<li>층 수 : ${aptData[3]}층</li>
// 	</ul>
//  </div>
// 	`;
//   let aptDetail = document.getElementById("aptDetail");
//   aptDetail.appendChild(str);
//   aptDetail.style.display = "block";
// }
// function removeDetail() {
//   let aptDetail = document.getElementById("aptDetail");
//   let aptDetailChild = document.getElementsByClassName("apt-detail-child");
//   aptDetailChild.remove();
//   aptDetail.style.display = "none";
// }

// function
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

/* .top {
  margin-top: 0px;
} */
/* <div id="detail-img-section"></div>
          <div id="detail-apt-section"></div>
          <div id="detail-transport-section"></div>
          <div id="detail-img-section"></div>
          <div id="detail-img-section"></div> */
</style>
