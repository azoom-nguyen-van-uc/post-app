import Vue from 'vue'
import Vuex from 'vuex'

import { make } from 'vuex-pathify'

Vue.use(Vuex)

function state() {
  return {
    loggedIn: false,
    username: null,
    email: null,
  }
}

const mutations = {
  ...make.mutations(state),

  SET_LOGGED_IN(state, loggedIn) {
    state.loggedIn = loggedIn
  },
  SET_USERNAME(state, username) {
    state.username = username
  },
  SET_EMAIL(state, email) {
    state.email = email
  },
}

const actions = {
  ...make.actions(state),
  setUserLogin({ commit }, { loggedIn, username, email }) {
    commit('SET_LOGGED_IN', loggedIn)
    commit('SET_USERNAME', username)
    commit('SET_EMAIL', email)
  },
  setUserLogout({ commit }) {
    commit('SET_LOGGED_IN', false)
    commit('SET_USERNAME', null)
    commit('SET_EMAIL', null)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
