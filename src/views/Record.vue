<template>
  <div>
    <app-loader v-if="isLoading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link
          class="breadcrumb"
          to="/history"
        >{{ 'History' | i18n }}</router-link>

        <a class="breadcrumb"> {{ record.typeText }} </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div :class="['card', record.typeClass]">
            <div class="card-content white-text">
              <p>{{ 'Amount' | i18n }}: {{ record.amount | currency }}</p>
              <p>{{ 'Category' | i18n }}: {{ record.categoryName }}</p>
              <p>{{ 'Description' | i18n }}:  {{ record.description }}</p>
              <small> {{ record.date | date('datetime') }} </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p
      class="center"
      v-else
    >{{ 'Record_NotFound_Start' | i18n }} id={{ $route.params.id }} {{ 'Record_NotFound_End' | i18n }}.</p>
  </div>
</template>

<script>
import i18nFilter from '@/filters/i18n'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Record')
    }
  },
  data () {
    return {
      isLoading: true,
      record: null
    }
  },
  async mounted () {
    const record = await this.$store.dispatch('records/loadRecordById', this.$route.params.id)

    if (record.categoryId) {
      const category = await this.$store.dispatch('categories/loadCategoryById', record.categoryId)

      this.record = {
        ...record,
        categoryName: category.name,
        typeText: record.type === 'income' ? i18nFilter('Income') : i18nFilter('Outcome'),
        typeClass: record.type === 'income' ? 'green' : 'red'
      }
    }

    this.isLoading = false
  }
}
</script>
