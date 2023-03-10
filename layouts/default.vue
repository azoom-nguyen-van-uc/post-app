<template>
  <v-app>
    <header>
      <v-app-bar>
        <v-toolbar-title class="app-name"> UN </v-toolbar-title>
        <v-toolbar-items>
          <v-btn text to="/"> Home </v-btn>
          <v-btn text to="/list-post"> Post </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>
        <v-btn v-if="!userloggedIn" text to="/auth/login">
          Login
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-menu v-if="userloggedIn" offset-y>
          <template #activator="{ on }">
            <v-btn text v-on="on">
              {{ username }}
              <v-icon>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-email</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>nguyen.van.uc@azoom.jp</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text to="/users/user-edit-profile">Edit profile</v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <v-btn text @click="logout">Logout</v-btn>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </header>
    <main>
      <v-container>
        <Nuxt />
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'DefaultLayout',

  data() {
    return {}
  },

  head() {
    return {
      title: 'Post application',
    }
  },

  computed: {
    userloggedIn: get('user/loggedIn'),
    username: get('user/username'),
  },

  methods: {
    logout() {
      this.$store.dispatch('user/setUserLogout')
      this.$router.push('/auth/login')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-name {
  margin-right: 20px;
}

.v-app-bar {
  background-color: #328ce7 !important;
}
</style>
