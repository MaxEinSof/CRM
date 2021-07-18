<template>
  <ul :class="[
      'sidenav',
      'app-sidenav',
      { open: value }
    ]"
  >
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      v-slot="{ href, navigate, isExactActive }"
      custom
    >
      <li :class="{ active: isExactActive }">
        <a
          class="waves-effect waves-orange pointer"
          :href="href"
          @click="navigate"
        >
          {{ link.title }}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import i18nFilter from '@/filters/i18n'

export default {
  props: ['value'],
  data () {
    return {
      links: [
        {
          title: i18nFilter('Bill'),
          url: '/'
        },
        {
          title: i18nFilter('History'),
          url: '/history'
        },
        {
          title: i18nFilter('Planning'),
          url: '/planning'
        },
        {
          title: i18nFilter('NewRecord'),
          url: '/new-record'
        },
        {
          title: i18nFilter('Categories'),
          url: '/categories'
        }
      ]
    }
  }
}
</script>
