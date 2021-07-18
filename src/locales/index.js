import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = {
  'ru-RU': {
    name: 'Русский',
    values: ru
  },
  'en-US': {
    name: 'English',
    values: en
  }
}

const defaultLocale = Object.keys(locales).find(locale => locale.includes(navigator.language)) || 'en-US'

export {
  locales,
  defaultLocale
}
