import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import user from '@/store/modules/user'
import categories from '@/store/modules/categories'
import records from '@/store/modules/records'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: null,
    error: null
  },
  getters: {
    message: state => state.message,
    error: state => state.error
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = null
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('clearMessage')
      setTimeout(() => commit('setMessage', message), 0)
    },
    setError ({ commit }, error) {
      commit('clearError')
      setTimeout(() => commit('setError', error), 0)
    },
    async getCurrency () {
      const key = process.env.VUE_APP_CURRENCY_CONVERTER_API_KEY
      const response = await fetch(`https://free.currconv.com/api/v7/convert?q=EUR_USD,EUR_RUB&apiKey=${key}`)
      return await response.json()
    }
  },
  modules: { auth, user, categories, records }
})
