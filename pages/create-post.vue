<!-- pages/create-post.js -->
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
        @click="createPost"
      >Create Post</button>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    }
  },
  methods: {
    async createPost() {
      const {title, content} = this.post
      if (!title || !content) return
      const user = this.$supabase.auth.user()
      const { data } = await this.$supabase
        .from('posts')
        .insert([
            { title, content, user_id: user.id, user_email: user.email }
        ])
        .single()
      this.$router.push(`/posts/${data.id}`)
    }
  }
}
</script>
