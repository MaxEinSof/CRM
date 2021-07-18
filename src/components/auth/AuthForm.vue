<template>
  <form
    class="card auth-card"
    @submit.prevent="onSubmit"
  >
    <div class="card-content">
      <span class="card-title"> {{ 'HomeBookkeeping' | i18n }} </span>

      <app-input
        v-model.trim="email"
        id="email"
        :label="'Email' | i18n"
        :has-empty-value="hasEmptyEmail"
        :has-invalid-value="hasInvalidEmail"
      >
        <template #empty-value-message> {{ 'EnterEmail' | i18n }} </template>
        <template #invalid-value-message> {{ 'EnterCorrectEmail' | i18n }} </template>
      </app-input>

      <app-input
        v-model.trim="password"
        type="password"
        id="password"
        :label="'Password' | i18n"
        :has-empty-value="hasEmptyPassword"
        :has-invalid-value="hasInvalidPasswordLength"
      >
        <template #empty-value-message> {{ 'EnterPassword' | i18n }} </template>
        <template #invalid-value-message>
          {{ 'Auth_InvalidPasswordValue_Start' | i18n }} {{ passwordMinLength }}
          {{ 'Auth_InvalidPasswordValue_Middle' | i18n }} {{ password.length }}
          {{ 'Auth_InvalidPasswordValue_End' | i18n }}.
        </template>
      </app-input>

      <slot name="additional-inputs"/>
    </div>

    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          <slot name="submit-title"> {{ 'Send' | i18n }} </slot>
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        <slot name="bottom-action"/>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    additionalInputValues: {
      type: Object,
      required: false
    },
    isAdditionalInputValuesInvalid: {
      type: Function,
      required: false,
      default: () => new Promise(resolve => resolve(false))
    },
    submitCallback: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(6),
      required
    }
  },
  computed: {
    hasEmptyEmail () {
      return this.$v.email.$dirty && !this.$v.email.required
    },
    hasInvalidEmail () {
      return this.$v.email.$dirty && !this.$v.email.email
    },
    hasEmptyPassword () {
      return this.$v.password.$dirty && !this.$v.password.required
    },
    hasInvalidPasswordLength () {
      return this.$v.password.$dirty && !this.$v.password.minLength
    },
    passwordMinLength () {
      return this.$v.password.$params.minLength.min
    }
  },
  methods: {
    async onSubmit () {
      const isInvalid = await this.isAdditionalInputValuesInvalid()

      if (this.$v.$invalid || isInvalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      if (this.additionalInputValues) {
        Object.keys(this.additionalInputValues).forEach(key => {
          formData[key] = this.additionalInputValues[key]
        })
      }

      try {
        await this.submitCallback(formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
