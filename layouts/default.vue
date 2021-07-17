<!-- layouts/default.vue -->
<template>
  <div>
    <nav class="p-6 border-b border-gray-300">
      <NuxtLink to="/" class="mr-6">
        Home
      </NuxtLink>
      <NuxtLink to="/profile" class="mr-6">
        Profile
      </NuxtLink>
      <NuxtLink to="/create-post" class="mr-6" v-if="authenticated">
        Create post
      </NuxtLink>
      <NuxtLink to="/my-posts" class="mr-6" v-if="authenticated">
        My Posts
      </NuxtLink>
    </nav>
    <div class="py-8 px-16">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    authenticated: false,
    authListener: null
  }),
  async mounted() {
    /* When the app loads, check to see if the user is signed in */
    /* also create a listener for when someone signs in or out */
    const { data: authListener } = this.$supabase.auth.onAuthStateChange(
      () => this.checkUser()
    )
    this.authListener = authListener
    this.checkUser()
  },
  methods: {
    async checkUser() {
      const user = await this.$supabase.auth.user()
      if (user) {
        this.authenticated = true 
      } else {
        this.authenticated = false
      }
    }
  },
  beforeUnmount() {
    this.authListener?.unsubscribe()
  }
}
</script>