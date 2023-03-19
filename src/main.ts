import { createApp } from 'vue';
import VueAxios from 'vue-axios';
import VueApexCharts from 'vue3-apexcharts';
import PerfectScrollbar from 'vue3-perfect-scrollbar';

import config from '@/config';
import axios from '@/utils/axios';

import VueGoogleMaps from '@fawmi/vue-google-maps';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import { MODULE_PATH, ActionTypes } from '@/store/modules/auth';
import { getToken } from './helpers/auth';

async function preload(): Promise<void> {
  const token = getToken();

  if (token) {
    await store.dispatch(
      MODULE_PATH + ActionTypes.FETCH_USER_BY_TOKEN,
      getToken()
    );
  }
}

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(PerfectScrollbar)
  .use(VueApexCharts)
  .use(VueGoogleMaps, {
    load: {
      key: config.googleMapKey,
      libraries: 'visualization',
    },
  });

preload();

app.config.performance = true;
app.mount('#app');
