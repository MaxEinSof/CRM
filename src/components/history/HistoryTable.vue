<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th> {{ 'Amount' | i18n }} </th>
        <th> {{ 'Date' | i18n }} </th>
        <th> {{ 'Category' | i18n }} </th>
        <th> {{ 'Type' | i18n }} </th>
        <th> {{ 'Open' | i18n }} </th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="record in records"
        :key="record.id"
      >
        <td> {{ record.tableNumber }} </td>
        <td> {{ record.amount | currency }} </td>
        <td> {{ record.date | date('datetime') }} </td>
        <td> {{ record.categoryName }} </td>
        <td>
          <span :class="['white-text', 'badge', record.typeClass]"> {{ record.typeText }} </span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/record/${record.id}`)"
            v-tooltip="tooltipText"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import i18nFilter from '@/filters/i18n'

export default {
  props: {
    records: {
      type: Array,
      required: true
    }
  },
  computed: {
    tooltipText () {
      return i18nFilter('OpenRecord')
    }
  }
}
</script>
