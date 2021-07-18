<template>
  <div>
    <div class="page-title">
      <h3> {{ 'RecordHistory' | i18n }} </h3>
    </div>

    <div
      class="history-chart"
      v-if="records.length"
    >
      <h4 class="center"> {{ 'ExpensesByCategory' | i18n }} </h4>
      <canvas ref="canvas"></canvas>
    </div>

    <app-loader v-if="isLoading"/>

    <section v-else-if="records.length">
      <history-table :records="selectedItems"/>

      <app-pagination
        v-if="pageCount > 1"
        v-model="activePage"
        :page-count="pageCount"
        :click-handler="setPage"
        :prev-text="'Backward' | i18n"
        :next-text="'Forward' | i18n"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>

    <p
      class="center"
      v-else
    >
      {{ 'NoRecordsYet' | i18n }}.
      <router-link to="/record"> {{ 'AddNewRecord' | i18n }} </router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HistoryTable from '@/components/history/HistoryTable'
import paginationMixin from '@/mixins/pagination'
import { Pie } from 'vue-chartjs'
import i18nFilter from '@/filters/i18n'

export default {
  extends: Pie,
  mixins: [paginationMixin],
  metaInfo () {
    return {
      title: this.$getTitle('History')
    }
  },
  data () {
    return {
      isLoading: true
    }
  },
  async mounted () {
    await this.$store.dispatch('records/loadRecords')

    if (this.records.length) {
      await this.$store.dispatch('categories/loadCategories')
      this.setupChart()
      this.setupPagination()
    }

    this.isLoading = false
  },
  computed: {
    ...mapGetters('categories', ['categories']),
    ...mapGetters('records', ['records'])
  },
  methods: {
    setupChart () {
      const categoryNames = this.categories.map(category => category.name)

      const totalExpenses = this.categories.map(category => {
        return this.records.reduce((total, record) => {
          if (record.categoryId === category.id && record.type === 'outcome') {
            total += +record.amount
          }
          return total
        }, 0)
      })

      function getColors (opacity) {
        return [
          `rgba(255, 99, 132, ${opacity})`,
          `rgba(54, 162, 235, ${opacity})`,
          `rgba(255, 206, 86, ${opacity})`,
          `rgba(75, 192, 192, ${opacity})`,
          `rgba(153, 102, 255, ${opacity})`,
          `rgba(255, 159, 64, ${opacity})`
        ]
      }

      this.renderChart({
        labels: categoryNames,
        datasets: [{
          label: i18nFilter('ExpensesByCategory'),
          data: totalExpenses,
          backgroundColor: getColors(0.2),
          borderColor: getColors(1),
          borderWidth: 1
        }]
      })
    },
    setupPagination () {
      const complementedRecords = this.records.map(record => {
        return {
          ...record,
          categoryName: this.categories.find(category => category.id === record.categoryId).name,
          typeText: record.type === 'income' ? i18nFilter('Income') : i18nFilter('Outcome'),
          typeClass: record.type === 'income' ? 'green' : 'red'
        }
      })

      this.initPagination(complementedRecords, 5)
    }
  },
  components: { HistoryTable }
}
</script>
