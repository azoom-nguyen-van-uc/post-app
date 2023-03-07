// use Vuex-pathify

import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import user from './modules/user'
import post from './modules/post'

const createStore = () => {
  console.log('Create store successfully')
  return new Vuex.Store({
    plugins: [pathify.plugin],

    modules: {
      user,
      post,
    },
    actions: {},
  })
}

export default createStore
