import LoginPage from './LoginPage.js';
import { store } from './store.js';

export default {
  name: 'App',

  template: `
    <div id="app" class="wrapper page container">
    <login-page v-if="!isAuthenticated"/>
    <div v-else>{{ user }}</div>
    </div>`,

  components: {
    LoginPage,
  },

  // Можно делать inject, чтобы дальше использовать из this, а не импортировать (инверсия зависимостей через инъекцию зависимостей)
  // inject: {
  //   store: 'store',
  // },

  computed: {
    user() {
      return store.auth.getUser();
    },

    isAuthenticated() {
      return store.auth.isAuthenticated();
    },
  },
};
