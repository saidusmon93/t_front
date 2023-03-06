import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lessons: [],
    rooms: [],
    weekdays: [],
    times: [],
    fullscreenLoading: false,
  },
  mutations: {
    setLoading(state, loader) {
      state.fullscreenLoading = loader;
    },
    setLessons(state, lessons) {
      state.lessons = lessons;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },
    setWeekdays(state, weekdays) {
      state.weekdays = weekdays;
    },
    setTimes(state, times) {
      state.times = times;
    },
  },
  actions: {
    async fetchLessons({ commit }, search) {
      commit("setLoading", true);
      await axios
        .get("http://127.0.0.1:8000/api/search/" + search)
        .then((response) => {
          const data = response.data;
          console.log(data);
          if (data.hasOwnProperty("lessons")) {
            commit("setLessons", data.lessons);
          }
          if (data.hasOwnProperty("rooms")) {
            commit("setRooms", data.rooms);
          }
          if (data.hasOwnProperty("times")) {
            commit("setTimes", data.times);
          }
          if (data.hasOwnProperty("weekdays")) {
            commit("setWeekdays", data.weekdays);
          }
          commit("setLoading", false);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  getters: {
    loading: (state) => state.fullscreenLoading,
    lessons: (state) => state.lessons,
    weekdays: (state) => state.weekdays,
    times: (state) => state.times,
    room: (state) => state.rooms,
  },
  modules: {},
});
