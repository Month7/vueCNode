import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  footer: 'index'
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
