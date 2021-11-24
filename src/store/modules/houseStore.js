import {
  sidoList,
  gugunList,
  dongList,
  houseList,
  pastList,
  subwayList,
  busList,
  bikeList,
  radius,
  defaultSubway,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    pastList: [],
    subways: [],
    buses: [],
    bikes: [],
    dSubways: [],
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    SET_HOUSE_LIST: (state, houses) => {
      state.houses = houses;
    },
    SET_PAST_LIST: (state, pastList) => {
      state.pastList = pastList;
    },
    SET_SUBWAY_LIST: (state, subways) => {
      state.subways = subways;
    },
    SET_BUS_LIST: (state, buses) => {
      state.buses = buses;
    },
    SET_BIKE_LIST: (state, bikes) => {
      state.bikes = bikes;
    },
    SET_DSUB_LIST: (state, dSubways) => {
      state.dSubways = dSubways;
    },

    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, dongCode) => {
      const params = {
        dong: dongCode,
      };
      houseList(
        params,
        ({ data }) => {
          // console.log(data);
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getPastList: ({ commit }, aptCode) => {
      const params = {
        aptCode: aptCode,
      };
      pastList(
        params,
        ({ data }) => {
          commit("SET_PAST_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getSubwayList({ commit }, latlng) {
      subwayList(
        latlng,
        ({ data }) => {
          commit("SET_SUBWAY_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("store에서 호출 끝!");
    },
    getBusList({ commit }, latlng) {
      busList(
        latlng,
        ({ data }) => {
          commit("SET_BUS_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getBikeList({ commit }, latlng) {
      bikeList(
        latlng,
        ({ data }) => {
          commit("SET_BIKE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getRadius({ commit }, latlng) {
      radius(
        latlng,
        ({ data }) => {
          commit("SET_HOUSE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDefaultSubway: ({ commit }) => {
      defaultSubway(
        ({ data }) => {
          commit("SET_DSUB_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
