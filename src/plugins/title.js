import i18nFilter from '@/filters/i18n'

export default {
  install (app) {
    app.prototype.$getTitle = key => {
      const appTitle = process.env.VUE_APP_TITLE
      return `${i18nFilter(key)} | ${appTitle}`
    }
  }
}
