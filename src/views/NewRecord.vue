<template>
  <div>
    <div class="page-title">
      <h3> {{ 'NewRecord' | i18n }} </h3>
    </div>

    <app-loader v-if="isLoading"/>

    <form
      class="form"
      v-else-if="categories.length"
      @submit.prevent="onSubmit"
    >
      <app-select
        v-model="id"
        :options="categories"
        :label="'SelectCategory' | i18n"
        ref="selectComponent"
      />

      <app-radio
        v-model="type"
        :label="'Income' | i18n"
        value="income"
      />

      <app-radio
        v-model="type"
        :label="'Outcome' | i18n"
        value="outcome"
      />

      <app-input
        v-model.number="amount"
        type="number"
        id="amount"
        :label="'Amount' | i18n"
        :has-invalid-value="hasInvalidAmount"
      >
        <template #invalid-value-message> {{ 'MinimumValue' | i18n }}: {{ amountMinValue }} </template>
      </app-input>

      <app-input
        v-model.trim="description"
        id="description"
        :label="'Description' | i18n"
        :has-empty-value="hasEmptyDescription"
      >
        <template #empty-value-message> {{ 'EnterDescription' | i18n }} </template>
      </app-input>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | i18n }}
        <i class="material-icons right">send</i>
      </button>
    </form>

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
import { required, minValue } from 'vuelidate/lib/validators'
import i18nFilter from '@/filters/i18n'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('NewRecord')
    }
  },
  data () {
    return {
      isLoading: true,
      select: null,
      id: '',
      type: 'outcome',
      amount: 1,
      description: ''
    }
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  async mounted () {
    await this.$store.dispatch('categories/loadCategories')

    if (this.categories.length) {
      this.id = this.categories[0].id

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.selectComponent.$refs.select)
        M.updateTextFields()
      }, 0)
    }

    this.isLoading = false
  },
  beforeDestroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters('categories', ['categories']),
    ...mapGetters('user', ['user']),
    hasInvalidAmount () {
      return this.$v.amount.$dirty && !this.$v.amount.minValue
    },
    amountMinValue () {
      return this.$v.amount.$params.minValue.min
    },
    hasEmptyDescription () {
      return this.$v.description.$dirty && !this.$v.description.required
    },
    canCreateRecord () {
      if (this.type === 'outcome') {
        return this.user.bill >= this.amount
      }
      return true
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('records/createRecord', {
            categoryId: this.id,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          })

          const bill = this.type === 'outcome'
            ? this.user.bill - this.amount
            : this.user.bill + this.amount

          await this.$store.dispatch('user/updateUser', { bill })

          this.resetForm()
        } catch (e) {}
      } else {
        this.$store.dispatch('setMessage', `${i18nFilter('InsufficientFunds')} (${this.amount - this.user.bill})`)
      }
    },
    resetForm () {
      this.amount = 1
      this.description = ''
      this.$v.$reset()
    }
  }
}
</script>
