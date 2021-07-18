import firebase from 'firebase'
import store from '@/store'

export default {
  namespaced: true,
  state () {
    return {
      records: []
    }
  },
  getters: {
    records: state => state.records
  },
  mutations: {
    setRecords (state, records) {
      state.records = records
    },
    addRecord (state, record) {
      state.records.push(record)
    }
  },
  actions: {
    async loadRecords ({ commit, dispatch }) {
      try {
        const uid = store.getters['user/uid']

        const response = (await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .once('value')
        ).val() || {}

        const records = Object.keys(response).map(id => ({ ...response[id], id }))

        commit('setRecords', records)
      } catch (e) {
        dispatch('setError', e, { root: true })
      }
    },
    async loadRecordById ({ dispatch }, id) {
      try {
        const uid = store.getters['user/uid']

        const record = (await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .child(id)
          .once('value')
        ).val() || {}

        return { id, ...record }
      } catch (e) {
        dispatch('setError', e, { root: true })
      }
    },
    async createRecord ({ commit, dispatch }, record) {
      try {
        const uid = store.getters['user/uid']

        const response = await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record)

        commit('addRecord', { id: response.key, ...record })

        dispatch('setMessage', 'Запись успешно создана', { root: true })
      } catch (e) {
        dispatch('setError', e, { root: true })
        throw e
      }
    }
  }
}
