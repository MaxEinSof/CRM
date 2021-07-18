<template>
  <div id="app">
    <component :is="`${layout}-layout`">
      <router-view/>
    </component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  computed: {
    layout () {
      return this.$route.meta.layout || 'auth'
    },
    routeQueryMessage () {
      return this.$route.query.message
    },
    ...mapGetters(['message', 'error'])
  },
  watch: {
    routeQueryMessage (value) {
      this.$showMessage(value)
    },
    message (value) {
      this.$showMessage(value)
    },
    error (value) {
      this.$showError(value)
    }
  },
  components: { AuthLayout, MainLayout }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
