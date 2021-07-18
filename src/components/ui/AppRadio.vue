<template>
  <p>
    <label>
      <input
        class="with-gap"
        type="radio"
        :checked="isChecked"
        :value="value"
        @change="$emit('change', $event.target.value)"
      />
      <span> {{ label }} </span>
    </label>
  </p>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  computed: {
    isChecked () {
      return this.modelValue === this.value
    }
  }
}
</script>
