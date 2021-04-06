import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';

require('@/assets/main.scss');

createApp(App).mount('#app');
