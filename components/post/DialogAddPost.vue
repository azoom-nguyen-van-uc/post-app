<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" class="btn-dialog" v-on="on">
        Add Post
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add post</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Title"
                :error-messages="validateTitle"
                outlined
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="content"
                label="Content"
                :error-messages="validateContent"
                outlined
                @input="$v.content.$touch()"
                @blur="$v.content.$touch()"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="author"
                :items="selectAuthor"
                item-value="id"
                item-text="username"
                :error-messages="validateAuthor"
                label="Author"
                outlined
                @blur="$v.author.$touch()"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="primary" text @click="addPost"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  name: 'DialogAddPost',

  mixins: [validationMixin],

  validations: {
    title: { required },
    content: { required },
    author: { required },
  },

  data: () => ({
    dialog: false,
    title: '',
    content: '',
    author: '',
    selectAuthor: [],
  }),

  computed: {
    validateTitle() {
      const errors = []
      if (!this.$v.title.$dirty) return errors

      !this.$v.title.required && errors.push('Title is required.')

      return errors
    },

    validateContent() {
      const errors = []
      if (!this.$v.content.$dirty) return errors

      !this.$v.content.required && errors.push('Content is required.')

      return errors
    },

    validateAuthor() {
      const errors = []
      if (!this.$v.author.$dirty) return errors

      !this.$v.author.required && errors.push('Author is required.')

      return errors
    },
  },

  created() {
    this.getAuthor()
  },

  methods: {
    async addPost() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }

      const posts = {
        title: this.title,
        body: this.content,
        userId: this.author,
      }

      const postFirebaseDocument = await this.$store.$fire.firestore
        .collection('post-management')
        .add(posts)

      if (postFirebaseDocument.id) {
        this.$toast.open({
          message: 'Add post success',
          type: 'success',
        })
        this.$emit('addPost')
      } else {
        this.$toast.open({
          message: 'Add post fail!',
          type: 'error',
        })
      }
      this.dialog = false
    },
    async getAuthor() {
      this.selectAuthor = await this.$ky.get('users').json()
    },
  },
}
</script>

<style scoped>
.btn-dialog {
  margin-top: 10px;
}
</style>
