import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function state() {
  return {
    listPost: [],
    users: [],
    posts: [],
    currentPage: 1,
    totalPages: 1,
  }
}

const mutations = {
  SET_LIST_POST(state, listPost) {
    state.listPost = listPost
  },
  SET_USERS(state, users) {
    state.users = users
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },
  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages
  },
}

const actions = {
  getPosts(
    { commit },
    {
      page = 1,
      perPage = 20,
      posts,
      postFirebase,
      users,
      titleFilter,
      authorFilter,
    }
  ) {
    posts = [...posts, ...postFirebase]

    commit('SET_LIST_POST', posts)
    commit('SET_USERS', users)

    if (titleFilter) {
      posts = Object.values(posts).filter((post) =>
        post.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    }

    if (authorFilter) {
      posts = Object.values(posts).filter(
        (post) => post.userId === authorFilter
      )
    }

    const totalPages = Math.ceil(posts.length / perPage)
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage

    posts =
      posts !== undefined &&
      Object.values(posts)
        .slice(startIndex, endIndex)
        .map((post) => {
          const user = users.find((user) => user.id === post.userId)
          return { ...post, name: user.name, username: user.username }
        })

    commit('SET_POSTS', posts)
    commit('SET_CURRENT_PAGE', page)
    commit('SET_TOTAL_PAGES', totalPages)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
