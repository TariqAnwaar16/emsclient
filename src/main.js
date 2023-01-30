import "bootstrap/dist/css/bootstrap.css"
import "primevue/resources/themes/saga-blue/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css" //icons
import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes"
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';


createApp(App).use(PrimeVue).use(router).component('Button', Button).use(createVuestic()).mount('#app')


import 'jquery/dist/jquery.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/css'