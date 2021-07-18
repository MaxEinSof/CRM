<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4> {{ 'Create' | i18n }} </h4>
      </div>

      <form @submit.prevent="onSubmit">
        <app-input
          v-model.trim="name"
          id="create-name"
          :label="'Name' | i18n"
          :has-empty-value="hasEmptyName"
        >
          <template #empty-value-message> {{ 'EnterCategoryName' | i18n }} </template>
        </app-input>

        <app-input
          v-model.number="limit"
          type="number"
          id="create-limit"
          :label="'Limit' | i18n"
          :has-invalid-value="hasInvalidLimit"
        >
          <template #invalid-value-message>{{ 'MinimumValue' | i18n }}: {{ limitMinValue }} </template>
        </app-input>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Create' | i18n }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      limit: 100
    }
  },
  validations: {
    name: { required },
    limit: { minValue: minValue(100) }
  },
  mounted () {
    M.updateTextFields()
  },
  computed: {
    hasEmptyName () {
      return this.$v.name.$dirty && !this.$v.name.required
    },
    hasInvalidLimit () {
      return this.$v.limit.$dirty && !this.$v.limit.minValue
    },
    limitMinValue () {
      return this.$v.limit.$params.minValue.min
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('categories/createCategory', {
          name: this.name,
          limit: this.limit
        })

        this.resetForm()
      } catch (e) {}
    },
    resetForm () {
      this.name = ''
      this.limit = 100
      this.$v.$reset()
    }
  }
}
</script>
