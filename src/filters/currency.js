import store from '@/store'
import { defaultLocale } from '@/locales'

export default function currencyFilter (value, currency = 'RUB') {
  const locale = store.getters['user/user'].locale || defaultLocale
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value)
}
