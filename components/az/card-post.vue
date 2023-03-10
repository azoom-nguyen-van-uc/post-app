<script>
export default {
  name: 'CardPost',

  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <div class="description-post">
        {{ content }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-row>
      <v-col md="8">
        <v-card-title class="author">{{ author }}</v-card-title>
      </v-col>

      <v-col md="4">
        <v-card-actions class="action">
          <v-btn color="deep-purple lighten-2" text :to="`/posts/${id}`">
            Xem thêm
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.description-post {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  padding-bottom: 0;
}

.action {
  margin-top: 5px;
}
</style>
