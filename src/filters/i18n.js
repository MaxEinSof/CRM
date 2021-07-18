import store from '@/store'
import { locales, defaultLocale } from '@/locales'

export default function i18nFilter (key) {
  const locale = store.getters['user/user'].locale || defaultLocale
  return locales[locale].values[key] || `[Localize error]: key ${key} not found`
}
