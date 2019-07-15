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
      footerStatus: null,   
      acticleDeatil: null,
      messages: null,
      userInfo: null,   
      createArticleData: {},  // 发布新文章的草稿的缓存 
    },
    actions: actions,
    mutations: mutations,
  })
}