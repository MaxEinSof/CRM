import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import messagePlugin from '@/plugins/message'
import titlePlugin from '@/plugins/title'
import dateFilter from '@/filters/date'
import currencyFilter from '@/filters/currency'
import i18nFilter from '@/filters/i18n'
import tooltipDirective from '@/directives/tooltip'
import AppLoader from '@/components/ui/AppLoader'
import AppInput from '@/components/ui/AppInput'
import AppSelect from '@/components/ui/AppSelect'
import AppRadio from '@/components/ui/AppRadio'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(VueMeta)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('i18n', i18nFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('app-loader', AppLoader)
Vue.component('app-input', AppInput)
Vue.component('app-select', AppSelect)
Vue.component('app-radio', AppRadio)
Vue.component('app-pagination', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyCEjR1ap2GTh5ZNPzo8mFKH43nHCLZ7SEs',
  authDomain: 'vue-crm-77dd8.firebaseapp.com',
  projectId: 'vue-crm-77dd8',
  storageBucket: 'vue-crm-77dd8.appspot.com',
  messagingSenderId: '693063203394',
  appId: '1:693063203394:web:7275d32d6d06b97f158bdb'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
