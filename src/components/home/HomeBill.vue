<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title"> {{ 'CurrencyBill' | i18n }} </span>

        <p
          class="currency-line"
          v-for="currency in currencies"
          :key="currency"
        >
          <span> {{ getCurrencyBill(currency) | currency(currency) }} </span>
        </p>

        <p class="currency-line">
          <span> {{ getBaseCurrencyBill() | currency('EUR') }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rates: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      currencies: ['RUB', 'USD']
    }
  },
  computed: {
    base () {
      return this.$store.getters['user/user'].bill / this.rates.EUR_RUB.val
    }
  },
  methods: {
    getCurrencyBill (currency) {
      return Math.floor(this.base * this.rates[`EUR_${currency}`].val)
    },
    getBaseCurrencyBill () {
      return Math.floor(this.base)
    }
  }
}
</script>
