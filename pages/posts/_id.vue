<script>
import { get } from 'vuex-pathify'

export default {
  name: 'PostDetails',

  data() {
    return {
      posts: [],
      comments: [],
      users: [],
    }
  },

  head() {
    return {
      title: `Post - ${this.posts.title}`,
    }
  },

  computed: {
    listUser: get('post/users'),
  },

  created() {
    this.getPost()
  },

  methods: {
    async getPost() {
      const id = this.$route.params.id

      if (!id) {
        this.$router.push('/')
      }

      if (!isNaN(id)) {
        const [posts, comments] = await Promise.all([
          this.$ky.get(`posts/${id}`).json(),
          this.$ky.get(`posts/${id}/comments`).json(),
        ])
        this.posts = posts
        this.comments = comments
      } else {
        const postsDocuments = await this.$store.$fire.firestore
          .collection('post-management')
          .doc(id)
          .get()

        this.posts = postsDocuments.data()
      }

      this.users = this.listUser
      if (this.users.length === 0) {
        this.users = await this.$ky.get(`users`).json()
      }

      this.users = this.users.filter(
        (user) => user.id === this.posts.userId && user
      )[0]
    },
  },
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card>
          <v-card-title>{{ posts.title }}</v-card-title>
          <v-card-text>{{ posts.body }}</v-card-text>
          <v-card-subtitle> Author: {{ users.username }}</v-card-subtitle>
        </v-card>
        <v-list class="comment">
          <v-subheader>Comments</v-subheader>
          <v-divider></v-divider>
          <v-list-item
            v-for="(comment, index) in comments"
            :key="index"
            class="comment-item"
          >
            <v-list-item-title>{{ comment.email }}</v-list-item-title>
            <v-list-item-subtitle class="comment-body">{{
              comment.body
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.comment {
  > .comment-item {
    margin-top: 20px;
  }

  > .comment-body {
    white-space: normal;
  }
}
</style>
