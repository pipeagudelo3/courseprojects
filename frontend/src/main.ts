import './assets/css/input.css';
import { createPinia } from 'pinia';
import { createApp } from 'vue';


import App from './App.vue';
import router from './router';
import PiniaConfig from './PiniaConfig.js';

const app = createApp(App);

app.use(createPinia());
app.use(PiniaConfig.init());
app.use(router);

app.mount('#app');
