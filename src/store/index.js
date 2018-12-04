import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    entrepot: null,
    article: null,
    vl: null,
    ean: null,
    dun: null,
    date: null,
    geoloc: null
  },
  getters : {
    ENTREPOT : state => {
      return state.entrepot;
    },
    ARTICLE : state => {
      return state.article;
    },
    VL: state => {
      return state.vl;
    },
    EAN : state => {
      return state.ean;
    },
    DUN : state => {
      return state.dun;
    },
    DATE : state => {
      return state.date;
    },
    GEOLOC : state => {
      return state.geoloc
    }
  },
  mutations: {
    SET_ENTREPOT : (state, payload) => {
      state.entrepot = payload
    },
    SET_ARTICLE : (state, payload) => {
      state.article = payload
    },
    SET_VL: (state, payload) => {
      state.vl = payload
    },
    SET_EAN : (state, payload) => {
      state.ean = payload
    },
    SET_DUN : (state, payload) => {
      state.dun = payload
    },
    SET_DATE: (state, payload) => {
      state.date = payload
    },
    SET_GEOLOC: (state, payload) => {
      state.geoloc = payload
    }
  },
  actions : {}  
})