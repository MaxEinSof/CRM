<template>
  <div>
    <div class="page-title">
      <h3> {{ 'Planning' | i18n }} </h3>
      <h4> {{ user.bill | currency }} </h4>
    </div>

    <app-loader v-if="isLoading"/>

    <section v-else-if="categories.length">
      <div
        v-for="category in complementedCategories"
        :key="category.id"
      >
        <p>
          <strong>{{ category.name }}:</strong>
          {{ category.totalAmountSpent | currency }} {{ 'OutOf' | i18n }} {{ category.limit | currency }}
        </p>
        <div
          class="progress"
          v-tooltip="category.tooltipValue"
        >
          <div
            :class="['determinate', category.progressColor]"
            :style="{ width: `${category.progressPercent}%` }"
          ></div>
        </div>
      </div>
    </section>

    <p
      class="center"
      v-else
    >
      {{ 'NoCategoriesYet' | i18n }}.
      <router-link to="/categories"> {{ 'AddNewCategory' | i18n }} </router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency'
import i18nFilter from '@/filters/i18n'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Planning')
    }
  },
  data () {
    return {
      isLoading: true,
      complementedCategories: []
    }
  },
  async mounted () {
    await this.$store.dispatch('categories/loadCategories')

    if (this.categories.length) {
      await this.$store.dispatch('records/loadRecords')
      this.complementCategories()
    }

    this.isLoading = false
  },
  computed: {
    ...mapGetters('categories', ['categories']),
    ...mapGetters('records', ['records']),
    ...mapGetters('user', ['user'])
  },
  methods: {
    complementCategories () {
      this.complementedCategories = this.categories.map(category => {
        const totalAmountSpent = this.records.reduce((total, record) => {
          if (record.categoryId === category.id && record.type === 'outcome') {
            total += +record.amount
          }
          return total
        }, 0)

        const percent = totalAmountSpent * 100 / category.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'

        const difference = category.limit - totalAmountSpent
        const tooltipValue = `${difference < 0 ? i18nFilter('ExcessBy') : i18nFilter('Remained')} ${currencyFilter(Math.abs(difference))}`

        return {
          ...category,
          totalAmountSpent,
          progressPercent,
          progressColor,
          tooltipValue
        }
      })
    }
  }
}
</script>
