<template>
  <auth-form
    :additional-input-values="{ name }"
    :is-additional-input-values-invalid="isInputValuesInvalid"
    :submit-callback="submitCallback"
  >
    <template #additional-inputs>
      <app-input
        v-model.trim="name"
        id="name"
        :label="'UserName' | i18n"
        :has-empty-value="hasEmptyName"
      >
        <template #empty-value-message> {{ 'EnterName' | i18n }} </template>
      </app-input>

      <p>
        <label>
          <input
            type="checkbox"
            v-model="agrees"
          />
          <span> {{ 'Agrees' | i18n }} </span>
        </label>
      </p>
    </template>

    <template #submit-title> {{ 'Register' | i18n }} </template>

    <template #bottom-action>
      {{ 'AlreadyHaveAccount' | i18n }}?
      <router-link to="/login">{{ 'Login' | i18n }}!</router-link>
    </template>
  </auth-form>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm'
import { required } from 'vuelidate/lib/validators'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Register')
    }
  },
  data () {
    return {
      name: '',
      agrees: false
    }
  },
  validations: {
    name: { required },
    agrees: { checked: value => value }
  },
  computed: {
    hasEmptyName () {
      return this.$v.name.$dirty && !this.$v.name.required
    }
  },
  methods: {
    isInputValuesInvalid () {
      return new Promise(resolve => {
        if (this.$v.$invalid) {
          this.$v.$touch()
          resolve(true)
        }
        resolve(false)
      })
    },
    async submitCallback (formData) {
      await this.$store.dispatch('auth/register', formData)
    }
  },
  components: { AuthForm }
}
</script>
