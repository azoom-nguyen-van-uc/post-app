// User vuex

// export const state = () => ({
//   posts: [],
//   currentPage: 1,
//   totalPages: 1,
// })

// export const getters = {
//   posts: (state) => state.posts,
//   currentPage: (state) => state.currentPage,
//   totalPages: (state) => state.totalPages,
// }

// export const mutations = {
//   SET_POSTS(state, posts) {
//     state.posts = posts
//   },
//   SET_CURRENT_PAGE(state, page) {
//     state.currentPage = page
//   },
//   SET_TOTAL_PAGES(state, totalPages) {
//     state.totalPages = totalPages
//   },
// }

// export const actions = {
//   async getPosts(
//     { commit },
//     { page = 1, perPage = 20, posts, users, titleFilter, authorFilter }
//   ) {
//     const totalPage = posts !== undefined && posts.headers.get('x-total-count')
//     const totalPages = Math.ceil(totalPage / perPage)
//     posts = posts !== undefined && (await posts.json())
//     posts =
//       posts !== undefined &&
//       Object.values(posts).map((obj1) => {
//         const obj2 = users.find((obj2) => obj2.id === obj1.userId)
//         return { ...obj1, name: obj2.name, username: obj2.username }
//       })

//     // if (titleFilter) {
//     //   console.log(posts)
//     //   Object.values(posts).filter((post) => {
//     //     console.log(post)
//     //     return post.title.toLowerCase().includes(titleFilter.toLowerCase())
//     //   })
//     //   console.log(posts)
//     // }

//     // if (authorFilter) {
//     //   Object.values(posts).filter((post) => post.userId === authorFilter)
//     // }

//     commit('SET_POSTS', posts)
//     commit('SET_CURRENT_PAGE', page)
//     commit('SET_TOTAL_PAGES', totalPages)
//   },
// }
