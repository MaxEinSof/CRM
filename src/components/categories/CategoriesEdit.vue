<template>
  <div class="col s12 m6">
    <app-loader v-if="isLoading"/>

    <div v-else-if="categories.length">
      <div class="page-subtitle">
        <h4> {{ 'Edit' | i18n }} </h4>
      </div>

      <form @submit.prevent="onSubmit">
        <app-select
          v-model="id"
          :options="categories"
          :label="'SelectCategory' | i18n"
          ref="selectComponent"
        />

        <app-input
          v-model.trim="name"
          id="edit-name"
          :label="'Name' | i18n"
          :has-empty-value="hasEmptyName"
        >
          <template #empty-value-message> {{ 'EnterCategoryName' | i18n }} </template>
        </app-input>

        <app-input
          v-model.number="limit"
          type="number"
          id="edit-limit"
          :label="'Limit' | i18n"
          :has-invalid-value="hasInvalidLimit"
        >
          <template #invalid-value-message>{{ 'MinimumValue' | i18n }}: {{ limitMinValue }} </template>
        </app-input>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Refresh' | i18n }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>

    <p
      class="center"
      v-else
    > {{ 'NoCategoriesYet' | i18n }} </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      isLoading: true,
      isInitialLoad: true,
      select: null,
      id: '',
      name: '',
      limit: 100
    }
  },
  watch: {
    id (value) {
      ({
        name: this.name,
        limit: this.limit
      } = this.categories.find(category => category.id === value))
    },
    categories (value) {
      if (value.length) {
        setTimeout(() => {
          this.destroySelect()
          this.initSelect()
        }, 0)
      }
    }
  },
  validations: {
    name: { required },
    limit: { minValue: minValue(100) }
  },
  async mounted () {
    await this.$store.dispatch('categories/loadCategories')
    this.isLoading = false
  },
  beforeDestroy () {
    this.destroySelect()
  },
  computed: {
    ...mapGetters('categories', ['categories']),
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
    async initSelect () {
      if (this.isInitialLoad) {
        await this.setDefaultCategoryValues()
        this.select = M.FormSelect.init(this.$refs.selectComponent.$refs.select)
        M.updateTextFields()
        this.isInitialLoad = false
        return
      }

      this.select = M.FormSelect.init(this.$refs.selectComponent.$refs.select)
    },
    setDefaultCategoryValues () {
      ({
        id: this.id,
        name: this.name,
        limit: this.limit
      } = this.categories[0])
    },
    destroySelect () {
      if (this.select && this.select.destroy) {
        this.select.destroy()
      }
    },
    onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      this.$store.dispatch('categories/updateCategory', {
        id: this.id,
        name: this.name,
        limit: this.limit
      })
    }
  }
}
</script>
