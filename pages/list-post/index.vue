<script>
import { get } from 'vuex-pathify'

import CardPost from '~/components/az/card-post'
import DialogAddPost from '~/components/az/dialog-post'

export default {
  name: 'HomePage',

  components: {
    'card-post': CardPost,
    'dialog-post': DialogAddPost,
  },

  data: function () {
    return {
      titleFilter: '',
      authorFilter: '',
      selectAuthor: [],
    }
  },

  head() {
    return {
      title: 'Post',
    }
  },

  computed: {
    listPost: get('post/listPost'),
    users: get('post/users'),
    posts: get('post/posts'),
    currentPage: get('post/currentPage'),
    totalPages: get('post/totalPages'),
  },

  created() {
    this.getAllPost()
  },

  methods: {
    async getAllPost(pageChange) {
      const titleFilter = this.titleFilter
      const authorFilter = this.authorFilter
      const perPage = 20

      let posts = this.listPost
      let users = this.users
      let postFirebase = []
      let page = !pageChange
        ? Number(this.$router.history.current.query.page)
        : pageChange

      if (this.listPost.length === 0 && this.users.length === 0) {
        const [postsDocument, usersDocument, postFirebaseDocument] =
          await Promise.all([
            this.$ky.get(`posts`).json(),
            this.$ky.get('users').json(),
            this.$store.$fire.firestore.collection('post-management').get(),
          ])
        const postFirebaseDoc = postFirebaseDocument.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        }))

        posts = postsDocument
        users = usersDocument
        postFirebase = postFirebaseDoc
      }

      page = isNaN(page) ? 1 : page
      this.selectAuthor = users
      this.selectAuthor.unshift({
        id: null,
        username: 'All',
      })

      this.$store.dispatch('post/getPosts', {
        page,
        perPage,
        posts,
        postFirebase,
        users,
        titleFilter,
        authorFilter,
      })
    },

    pageChanged(page) {
      this.getAllPost(page)
      this.$router.push({ param: 'list-posts', query: { page } })
    },

    addPost() {
      this.getAllPost()
    },
  },
}
</script>

<template>
  <div class="mt-10">
    <v-row>
      <v-col md="5">
        <v-text-field
          v-model="titleFilter"
          label="Title"
          outlined
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <v-select
          v-model="authorFilter"
          :items="selectAuthor"
          item-value="id"
          item-text="username"
          label="Author"
          outlined
        ></v-select>
      </v-col>
      <v-col md="2">
        <v-btn color="primary" class="btn-search" @click="getAllPost"
          >Search</v-btn
        >
      </v-col>
      <v-col md="2"> <dialog-post @addPost="addPost" /> </v-col>
    </v-row>
    <v-row v-if="posts">
      <v-col v-for="(post, index) in posts" :key="index" md="4" class="posts">
        <card-post
          :id="`${post.id}`"
          :title="post.title"
          :content="post.body"
          :author="post.username"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <nav class="pagination-list-post">
          <ul v-if="totalPages > 1" class="list-post">
            <li v-for="page in totalPages" :key="page" class="item">
              <a
                class="item-link"
                :class="{ active: page === currentPage }"
                @click.prevent="pageChanged(page)"
                >{{ page }}</a
              >
            </li>
          </ul>
        </nav>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.v-card {
  max-width: 500px !important;
}

.pagination-list-post {
  > .list-post {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;

    > .item {
      margin: 0 5px;

      > .item-link {
        color: #333;
        text-decoration: none;
        padding: 5px 10px;
        border-radius: 5px;
      }

      > .active {
        background-color: #333;
        color: #fff;
      }
    }
  }
}

.btn-search {
  margin-top: 10px;
}
</style>
