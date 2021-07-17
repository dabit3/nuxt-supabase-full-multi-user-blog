<template>
  <main>
    <div>
      <h1 class="text-5xl mt-4 font-semibold tracking-wide">{{ post.title }}</h1>
      <p class="text-sm font-light my-4">by {{ post.user_email }}</p>
      <div class="mt-8 prose" >
        <div v-html="compiledMarkdown"></div>
      </div>
    </div>
  </main>
</template>

<script>
import marked from 'marked'

export default {
  computed: {
    compiledMarkdown: function () {
      return marked(this.post.content, { sanitize: true })
    }
  },
  async asyncData({ route, $supabase }) {
    const { data: post } = await $supabase
      .from('posts')
      .select()
      .filter('id', 'eq', route.params.id)
      .single()
    return {
      post
    }
  }
}
</script>
