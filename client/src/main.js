import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios'

axios.defaults.withCredentials = true

createApp(App).use(store).use(router).use( CKEditor ).mount('#app')
