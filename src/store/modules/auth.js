import firebase from 'firebase/app'
import store from '@/store'
import { defaultLocale } from '@/locales'

export default {
  namespaced: true,
  actions: {
    async register ({ dispatch }, { email, password, name }) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        const user = await firebase.auth().currentUser

        await firebase
          .database()
          .ref(`/users/${user.uid}/info`)
          .set({
            name,
            bill: 0,
            locale: defaultLocale
          })
      } catch (e) {
        dispatch('setError', e, { root: true })
        throw e
      }
    },
    async login ({ dispatch }, { email, password }) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
      } catch (e) {
        dispatch('setError', e, { root: true })
        throw e
      }
    },
    async logout () {
      await firebase.auth().signOut()
      store.commit('user/clearUser')
    }
  }
}
