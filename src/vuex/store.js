import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutation';
import actions from './action';

Vue.use(Vuex);

export function createStore(){
  return new Vuex.Store({
    state: {
      num: 1,
      data: null,
      lists: [],
      footerStatus: 0,   
      acticleDeatil: null    
    },
    actions: actions,
    mutations: mutations,
  })
}