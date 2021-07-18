<template>
  <div>
    <div class="page-title">
      <h3> {{ 'Bill' | i18n }} </h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="isLoading"/>

    <div
      class="row"
      v-else
    >
      <home-bill :rates="currency.results"/>

      <home-currency :rates="currency.results"/>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/home/HomeBill'
import HomeCurrency from '@/components/home/HomeCurrency'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Bill')
    }
  },
  data () {
    return {
      isLoading: true,
      currency: null
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('getCurrency')
    this.isLoading = false
  },
  methods: {
    async refresh () {
      this.isLoading = true
      this.currency = await this.$store.dispatch('getCurrency')
      this.isLoading = false
    }
  },
  components: { HomeBill, HomeCurrency }
}
</script>
