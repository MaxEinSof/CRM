<template>
  <div>
    <div class="page-title">
      <h3> {{ 'Profile' | i18n }} </h3>
    </div>

    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <app-input
        v-model.trim="name"
        id="name"
        :label="'UserName' | i18n"
        :has-empty-value="hasEmptyName"
      >
        <template #empty-value-message> {{ 'EnterName' | i18n }} </template>
      </app-input>

      <app-select
        v-model="locale"
        :options="locales"
        :label="'InterfaceLanguage' | i18n"
        ref="selectComponent"
      />

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Save' | i18n }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { locales } from '@/locales'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Profile')
    }
  },
  data () {
    return {
      name: '',
      locale: '',
      select: null
    }
  },
  validations: {
    name: { required }
  },
  mounted () {
    this.name = this.user.name
    this.locale = this.user.locale

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.selectComponent.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  beforeDestroy () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    hasEmptyName () {
      return this.$v.name.$dirty && !this.$v.name.required
    },
    locales () {
      return Object.keys(locales).map(locale => {
        return {
          code: locale,
          name: locales[locale].name
        }
      })
    }
  },
  methods: {
    async onSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('user/updateUser', {
          name: this.name,
          locale: this.locale
        })
      } catch (e) {}
    }
  }
}
</script>
