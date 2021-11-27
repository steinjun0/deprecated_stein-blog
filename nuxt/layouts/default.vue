<template>
  <v-app>
    <v-main>
      <v-container
        style="max-width: 1440px; min-height: 100%; padding: 60px 40px"
      >
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      searchWord: '',
      searchRes: [],
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      outsideClick: false,
    }
  },
  computed: {
    router() {
      return this.$route.path
    },
  },
  watch: {},
}
</script>
