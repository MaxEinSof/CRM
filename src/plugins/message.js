import i18nFilter from '@/filters/i18n'

const MESSAGES = {
  login: i18nFilter('LogInSystem'),
  logout: i18nFilter('LoggedOut'),
  'auth/user-not-found': i18nFilter('UserNotFound'),
  'auth/wrong-password': i18nFilter('WrongPassword'),
  'auth/email-already-in-use': i18nFilter('EmailAlreadyInUse')
}

export default {
  install (app) {
    app.prototype.$showMessage = value => {
      if (value) {
        M.toast({ html: MESSAGES[value] || value })
      }
    }

    app.prototype.$showError = firebaseError => {
      if (firebaseError) {
        M.toast({ html: `[${i18nFilter('Error')}]: ${MESSAGES[firebaseError.code] || i18nFilter('UnknownError')}` })
      }
    }
  }
}
