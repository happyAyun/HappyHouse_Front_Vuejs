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
          style="width:98%;height:700px; position: relative; overflow:hidden;"
        ></div>
        <div id="menu_wrap" class="bg_white">
          <ul id="placesList"></ul>
        </div>
        <!-- <div id = "placesList" style="position: absolute;  z-index: 2; height:700px; width:18%; right:10px;">
         
      </div> -->
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

      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
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
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
    ]),

    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    searchApt() {
      if (this.dongCode) {
        this.getHouseList(this.dongCode);
      }
    },

    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5012743, 127.039585),
        level: 6,
      };
      this.map = new kakao.maps.Map(container, options); //맵 만들기
      // this.geocoder = new kakao.maps.services.Geocoder(); //geocoder 설정
    },
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

    makeAptMarker() {
      for (let i = 0; i < this.markers.length; i++)
        this.markers[i].setMap(null);
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
        let tmpYear = house[index].buildYear;
        let floor = house[index].floor;
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
        let info = new kakao.maps.InfoWindow({
          content: `${tmpName}, ${tmpYear}, ${tmpPrice}, ${floor}`,
        });
        console.log(info);
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
        itemEl.onmouseover = function() {
          this.infowindow.open(this.map, this.marker);
        };

        itemEl.onmouseout = function() {
          this.infowindow.close();
        };
        itemEl.onmouseout = function() {
          this.infowindow.close();
        };
        this.markers.push(this.marker);
        this.infowindows.push(this.infowindow);
      }

      listEl.appendChild(fragment);
      this.map.setBounds(bounds);
      let posi = this.map.getCenter();
      this.cy = posi.getLat();
      this.cx = posi.getLng();
      this.showMarkers();
    },
    showMarkers() {
      this.setMarkers(this.map);
    },
    removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    },
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
    makeOverListener(map, marker, infowindow) {
      return function() {
        infowindow.open(map, marker);
      };
    },
    getListItem(places, index) {
      let el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '		<div class="info">' +
          "<h5>" +
          places.aptName +
          "</h5>";
      itemStr +=
        '   <span class="info">' +
        this.priceToString(places.recentPrice) +
        "</span>";
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
    setMarkers(map) {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    makeOutListener(infowindow) {
      return function() {
        infowindow.close();
      };
    }, // 마커에서 마우스 떠날 시 infowindow 닫기
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

// function make(jsonData) {
//   let idx = 0;
//   let lat, lng;
//   /*
//    * TODO
//    * 여기서 리스트 초기화 들어가야됨
//    */
//   let listEl = document.getElementById("placesList");
//   let fragment = document.createDocumentFragment();
//   let bounds = new kakao.maps.LatLngBounds();
//   removeAllChildNods(listEl);
//   // var markers = [];
//   $.each(jsonData, function(index, vo) {
//     let tmpLat = vo.lat;
//     let tmpLng = vo.lng;
//     let tmpName = vo.aptName;
//     let tmpPrice = priceToString(vo.recentPrice);
//     let tmpYear = vo.buildYear;
//     let floor = vo.floor;

//     let coords = new kakao.maps.LatLng(tmpLat, tmpLng);
//     bounds.extend(coords);
//     var marker = new kakao.maps.Marker({
//       position: coords,
//       clickable: true,
//     });
//     var infowindow = new kakao.maps.InfoWindow({
//       content:
//         '<div class="infoFont" style="width:300px;text-align:center;padding:6px 0;">' +
//         tmpName +
//         "<br/><span>" +
//         tmpPrice +
//         "</span></div>",
//     });

//     var info = new kakao.maps.InfoWindow({
//       content: `${tmpName}, ${tmpYear}, ${tmpPrice}, ${floor}`,
//     });
//     console.log(info);
//     /*
//      * TODO
//      * 여기에 리스트 만들기 들어감
//      * #placesList 에 li 형식으로 넣기?
//      *
//      */

//     let itemEl = getListItem(vo, index);
//     fragment.appendChild(itemEl);

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
//     itemEl.onmouseover = function() {
//       infowindow.open(map, marker);
//     };

//     itemEl.onmouseout = function() {
//       infowindow.close();
//     };
//     //        kakao.maps.event.addListener(marker, 'click', function(){
//     //        	let i = info.getContent();
//     //        	makeDetailElement(i);
//     //        });

//     markers.push(marker);
//     infowindows.push(infowindow);

//     lat = tmpLat;
//     lng = tmpLng;
//   }); // each

//   listEl.appendChild(fragment);
//   map.setBounds(bounds);
//   let posi = map.getCenter();
//   cy = posi.getLat();
//   cx = posi.getLng();
//   showMarkers();
// }

// function priceToString(price) {
//   let aptPriceNum = price.trim().split(",");
//   let numbers = "";
//   for (var j in aptPriceNum) {
//     numbers += aptPriceNum[j];
//   }
//   let s = "";
//   if (parseInt(numbers / 10000) > 0) {
//     s += parseInt(numbers / 10000) + "억 ";
//   }
//   if (numbers % 10000 == 0) s += "원";
//   else s += (numbers % 10000) + "만원";
//   return s;
// }

// function makeOverListener(map, marker, infowindow) {
//   return function() {
//     infowindow.open(map, marker);
//   };
// } // 마커에 마우스 올릴 시 infowindow 출력

//

// function setMarkers(map) {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
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

<style></style>
