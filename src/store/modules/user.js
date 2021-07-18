import firebase from 'firebase'

export default {
  namespaced: true,
  state () {
    return {
      user: {},
      uid: ''
    }
  },
  getters: {
    user: state => state.user,
    uid: state => state.uid
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUid (state, uid) {
      state.uid = uid
    },
    clearUser (state) {
      state.user = {}
      state.uid = ''
    }
  },
  actions: {
    async getUser ({ dispatch, commit }) {
      try {
        const uid = firebase.auth().currentUser.uid

        const user = (await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value')
        ).val()

        commit('setUser', user)
        commit('setUid', uid)
      } catch (e) {
        dispatch('setError', e, { root: true })
      }
    },
    async updateUser ({ dispatch, commit, getters }, toUpdate) {
      try {
        const updatedUser = { ...getters.user, ...toUpdate }

        await firebase
          .database()
          .ref(`/users/${getters.uid}/info`)
          .update(updatedUser)

        commit('setUser', updatedUser)
      } catch (e) {
        dispatch('setError', e, { root: true })
        throw e
      }
    }
  }
}
