<template>
  <main>
    <div v-for="post in posts" :key="post.id">
      <div class="cursor-pointer border-b border-gray-300	mt-8 pb-4">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-gray-500 mt-2">Author: {{ post.user_email }}</p>
        <NuxtLink :to="`/edit-post?id=${post.id}`" class="text-sm mr-4 text-blue-500">Edit Post</NuxtLink>
        <NuxtLink :to="`/posts/${post.id}`" class="text-sm mr-4 text-blue-500">View Post</NuxtLink>
        <button
          class="text-sm mr-4 text-red-500"
          @click="deletePost(post.id)"
        >Delete Post</button>
      </div>
    </div>
    <h1 v-if="loaded && !posts.length" class="text-2xl">No posts...</h1>
  </main>
</template>

<script>
export default {
  async created() {
    this.fetchPosts()
  },
  data() {
    return {
      posts: [],
      loaded: false
    }
  },
  methods: {
    async fetchPosts() {
      const user = this.$supabase.auth.user()
      if (!user) return
      const { data: posts, error } = await this.$supabase
        .from('posts')
        .select('*')
        .filter('user_id', 'eq', user.id)
      this.posts = posts
      this.loaded = true
    },
    async deletePost(id) {
      await this.$supabase
        .from('posts')
        .delete()
        .match({ id })
      this.fetchPosts()
    }
  }
}
</script>
