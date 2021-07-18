<template>
  <div>
    <app-loader v-if="isLoading"/>

    <div
      class="app-main-layout"
      v-else
    >
      <the-navbar @toggle-sidebar="toggleSidebar"/>

      <the-sidebar
        v-model="isSidebarOpen"
        :key="locale"
      />

      <main :class="[
        'app-content',
        { full: !isSidebarOpen }
      ]">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/new-record"
          v-tooltip="tooltipText"
          :key="locale"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'
import i18nFilter from '@/filters/i18n'

export default {
  data () {
    return {
      isLoading: true,
      isSidebarOpen: true
    }
  },
  async mounted () {
    await this.$store.dispatch('user/getUser')
    this.isLoading = false
  },
  computed: {
    locale () {
      return this.$store.getters['user/user'].locale
    },
    tooltipText () {
      return i18nFilter('CreateNewRecord')
    }
  },
  methods: {
    toggleSidebar () {
      this.isSidebarOpen = !this.isSidebarOpen
    }
  },
  components: { TheNavbar, TheSidebar }
}
</script>
