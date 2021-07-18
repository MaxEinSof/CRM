<template>
  <div class="input-field">
    <input
      :class="{ invalid: hasEmptyValue || hasInvalidValue }"
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >

    <label :for="id"> {{ label }} </label>

    <small
      class="helper-text invalid"
      v-if="hasEmptyValue"
    >
      <slot name="empty-value-message"> {{ 'RequiredField' | i18n }} </slot>
    </small>

    <small
      class="helper-text invalid"
      v-else-if="hasInvalidValue"
    >
      <slot name="invalid-value-message"> {{ 'EnterValidValue' | i18n }} </slot>
    </small>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hasEmptyValue: {
      type: Boolean,
      required: false
    },
    hasInvalidValue: {
      type: Boolean,
      required: false
    }
  }
}
</script>
