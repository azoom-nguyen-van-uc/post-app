<template>
  <h1 v-if="userloggedIn">Welcome, {{ username }}</h1>
  <h1 v-else>Welcome to post management application</h1>
</template>
<script lang="ts">
import { get } from 'vuex-pathify'

export default {
  name: 'HomePage',

  data() {
    return {}
  },

  head() {
    return {
      title: 'Post management application',
    }
  },

  computed: {
    username: get('user/username'),
    userloggedIn: get('user/loggedIn'),
  },
}
</script>
