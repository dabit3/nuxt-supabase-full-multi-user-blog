<template>
  <main>
    <div id="editor">
      <h1 class="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
      <input
        name="title"
        placeholder="Title"
        v-model="post.title"
        class="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
      />
      <client-only>
        <vue-simplemde v-model="post.content"></vue-simplemde>
      </client-only>
      <button
        type="button"
        class="mb-4 w-full bg-blue-500 text-white font-semibold px-8 py-4"
        @click="editPost"
      >Edit Post</button>
    </div>
  </main>
</template>

<script>
export default {
  async created() {
    const id = this.$route.query.id
    const { data: post } = await this.$supabase
      .from('posts')
      .select()
      .filter('id', 'eq', id)
      .single()
    if (!post) this.$router.push('/')
    this.post = post
  },
  data() {
    return {
      post: {}
    }
  },
  methods: {
    async editPost() {
      const { title, content } = this.post
      if (!title || !content) return
      await this.$supabase
        .from('posts')
        .update([
            { title, content }
        ])
        .match({ id: this.post.id })
      this.$router.push('/my-posts')
    }
  }
}
</script>
