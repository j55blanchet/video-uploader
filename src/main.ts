import { createApp, nextTick } from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import InterpretUrl from '@/services/UrlInterpreter';

import App from './App.vue';
import './registerServiceWorker';

// https://www.npmjs.com/package/@fortawesome/vue-fontawesome
library.add(faRecordVinyl);

require('@/assets/main.scss');

createApp(App)
  .component('FAIcon', FontAwesomeIcon)
  .mount('#app');

nextTick(InterpretUrl);
