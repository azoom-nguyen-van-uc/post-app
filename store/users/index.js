import { make } from 'vuex-pathify'

const state = {
  loggedIn: false,
  username: null,
  email: null,
}

const mutations = {
  ...make.mutations(state),
}

const actions = {
  setUserLogin({ commit }, { loggedIn, username, email }) {
    localStorage.setItem(
      'userLogin',
      JSON.stringify({ loggedIn, username, email })
    )
    commit('SET_LOGGED_IN', loggedIn)
    commit('SET_USERNAME', username)
    commit('SET_EMAIL', email)
  },
  setUserLogout({ commit }) {
    localStorage.removeItem('userLogin')
    commit('SET_LOGGED_IN', false)
    commit('SET_USERNAME', null)
    commit('SET_EMAIL', null)
  },
  loadStatusLogin({ commit }) {
    let userLogin = localStorage.getItem('userLogin')
    if (userLogin !== null) {
      userLogin = JSON.parse(userLogin)
      commit('SET_LOGGED_IN', userLogin.loggedIn)
      commit('SET_USERNAME', userLogin.username)
      commit('SET_EMAIL', userLogin.email)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
