import { createApp } from './vue3.esm-browser.js';
import { App } from './App.js';
import { ToasterPlugin } from './ToasterPlugin.js';

const app = createApp(App)
  .use(ToasterPlugin)
  .provide('config', {
    API_URL: 'https://course-vue.javascript.ru/api',
  })
  .mount('#app');

window.app = app;
