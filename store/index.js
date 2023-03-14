import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import userModule from './users/index'
import postModule from './posts/index'

const store = () =>
  new Vuex.Store({
    plugins: [pathify.plugin],

    modules: {
      user: userModule,
      post: postModule,
    },
  })

export default store
