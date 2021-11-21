<template>
  <div>
    <div id="all">
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

      <div class="btn-group">
        <button type="button" class="btn btn-primary" id="inspectorSearch">
          선별 진료소
        </button>
        <button type="button" class="btn btn-primary" id="bikeSearch">
          따릉이 보관소
        </button>
        <button type="button" class="btn btn-primary" id="shopSearch">
          카페
        </button>
      </div>
      <div class="map_wrap">
        <div
          id="map"
          style="width:98%;height:700px; position: relative; overflow:hidden; margin-left:15px;"
        ></div>
        <div id="menu_wrap" class="bg_white">
          <ul id="placesList"></ul>
        </div>
        <div id="selectedApt_wrap" class="bg_white">
          <ul id="sAptList"></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const houseStore = "houseStore";
export default {
  name: "Map",
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
      inspectorFlag: false,
      cafeFlag: false,
      bikeFlag: false,
      geocode: null,
      cy: null,
      cx: null,
      overlay: null,
      overlays: [],

      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses", "pastList"]),
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
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
      "getPastList",
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
      // this.geocoder = new kakao.maps.services.Geocoder(); //geocoder 설정
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
      this.map.setBounds(bounds);
      let posi = this.map.getCenter();
      this.cy = posi.getLat();
      this.cx = posi.getLng();
      this.showMarkers();
    },
    /*
    makePastAptList : 맵 우측에 현재 선택한 아파트의 과거부터의 거래기록 보여주기
    */
    makePastAptList() {
      let listEl = document.getElementById("sAptList");
      let fragment = document.createDocumentFragment();
      this.removeAllChildNods(listEl);
      let house = this.pastList;
      for (let index = 0; index < house.length; index++) {
        let itemEl = this.getPastListItem(house[index]);
        fragment.appendChild(itemEl);
      }
      listEl.appendChild(fragment);
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
      let el = document.createElement("li");
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
        let makeDetailDiv = self.makeDetailDiv();
        infowindow.close();
        let position = new kakao.maps.LatLng(place.lat, place.lng);
        let content = `
          <div class="overlay_info">
            <div class = "overlay_name" onclick="${makeDetailDiv}"><strong>${place.aptName}</strong></div>
            <div class="desc">
              <img src="${imgPath}" alt="">
              <span class="address">${place.dongName}  ${place.jibun}<br/>
                ${price}<br/>
                ${place.area}m² (${place.acreage}평)<br/>
                ${place.floor}층<br/>
                ${place.buildYear}년 건축
              </span>
            </div>
          </div>
          <input type="hidden" name="overlayIndex" value="${self.overlays.length}">
          `;
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
      });
    },
    makeDetailDiv() {
      console.log("테스트");
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
.overlay_info .overlay_name strong {
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
  height: 700px;
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
  right: 40px;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.8);
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
  min-height: 65px;
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
#sAptList li {
  list-style: none;
}
#sAptList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#sAptList .item span {
  display: block;
  margin-top: 4px;
}
#sAptList .item h6,
#sAptList .item .info_list {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#sAptList .item .info_list {
  padding: 0;
  margin: 5px 0;
  font-size: 14px;
}
</style>
