<template>
  <auth-form :submit-callback="submitCallback">
    <template #submit-title> {{ 'Login' | i18n }} </template>

    <template #bottom-action>
      {{ 'NoAccount' | i18n }}
      <router-link to="/register">{{ 'Register' | i18n }}!</router-link>
    </template>
  </auth-form>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm'

export default {
  metaInfo () {
    return {
      title: this.$getTitle('Login')
    }
  },
  methods: {
    async submitCallback (formData) {
      await this.$store.dispatch('auth/login', formData)
    }
  },
  components: { AuthForm }
}
</script>
