import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  token: window.sessionStorage.getItem('token'),
  username: ''
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store;