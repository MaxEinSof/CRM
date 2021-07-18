<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title"> {{ 'ExchangeRates' | i18n }} </span>
        </div>
        <table>
          <thead>
            <tr>
              <th> {{ 'Currency' | i18n }} </th>
              <th> {{ 'Rate' | i18n }} </th>
              <th> {{ 'Date' | i18n }} </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="currency in currencies"
              :key="currency"
            >
              <td> {{ currency }} </td>
              <td> {{ getRate(currency) }} </td>
              <td> {{ new Date() | date('date') }} </td>
            </tr>

            <tr>
              <td> {{ baseCurrency.code }} </td>
              <td> {{ baseCurrency.rate }} </td>
              <td> {{ new Date() | date('date') }} </td>
            </tr>
          </tbody>
        </table>
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
      currencies: ['RUB', 'USD'],
      baseCurrency: {
        code: 'EUR',
        rate: 1.0.toFixed(5)
      }
    }
  },
  methods: {
    getRate (currency) {
      return this.rates[`EUR_${currency}`].val.toFixed(5)
    }
  }
}
</script>
