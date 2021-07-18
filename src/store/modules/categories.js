import firebase from 'firebase/app'
import store from '@/store'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  getters: {
    categories: state => state.categories
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    },
    addCategory (state, category) {
      state.categories.push(category)
    },
    updateCategory (state, category) {
      const index = state.categories.findIndex(item => item.id === category.id)
      state.categories.splice(index, 1, category)
    }
  },
  actions: {
    async loadCategories ({ commit, dispatch }) {
      try {
        const uid = store.getters['user/uid']

        const response = (await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .once('value')
        ).val() || {}

        const categories = Object.keys(response).map(id => ({ ...response[id], id }))

        commit('setCategories', categories)
      } catch (e) {
        dispatch('setError', e, { root: true })
      }
    },
    async loadCategoryById ({ dispatch }, id) {
      try {
        const uid = store.getters['user/uid']

        const category = (await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .once('value')
        ).val() || {}

        return { id, ...category }
      } catch (e) {
        dispatch('setError', e, { root: true })
      }
    },
    async createCategory ({ commit, dispatch }, { name, limit }) {
      try {
        const uid = store.getters['user/uid']

        const response = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ name, limit })

        commit('addCategory', { id: response.key, name, limit })

        dispatch('setMessage', 'Категория успешно создана', { root: true })
      } catch (e) {
        dispatch('setError', e, { root: true })
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { id, name, limit }) {
      try {
        const uid = store.getters['user/uid']

        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ name, limit })

        commit('updateCategory', { id, name, limit })

        dispatch('setMessage', 'Категория успешно обновлена', { root: true })
      } catch (e) {
        dispatch('setError', e, { root: true })
      }
    }
  }
}
