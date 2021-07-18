<template>
  <div class="input-field">
    <select
      :value="value"
      @change="$emit('change', $event.target.value)"
      ref="select"
    >
      <option
        v-for="option in options"
        :key="option.id || option.code"
        :value="option.id || option.code"
      >{{ option.name }}</option>

    </select>

    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator ([obj]) {
        return ('id' in obj || 'code' in obj) && 'name' in obj
      }
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>
